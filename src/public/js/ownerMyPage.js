function openRestaurantNameModal() {
  document.getElementById('restaurantNameModal').style.display = 'block';
}

function closeNameModal() {
  document.getElementById('restaurantNameModal').style.display = 'none';
  document.getElementById('newRestaurantName').value = '';
}

function openRestaurantAddressModal() {
  document.getElementById('restaurantAddressModal').style.display = 'block';
}

function closeAddressModal() {
  document.getElementById('restaurantAddressModal').style.display = 'none';
  document.getElementById('newRestaurantAddress').value = '';
}

function openRestaurantNumberModal() {
  document.getElementById('restaurantNumberModal').style.display = 'block';
}

function closeNumberModal() {
  document.getElementById('restaurantNumberModal').style.display = 'none';
  document.getElementById('newRestaurantNumber').value = '';
}
function openRestaurantTypeModal() {
  document.getElementById('restaurantTypeModal').style.display = 'block';
}

function closeTypeModal() {
  document.getElementById('restaurantTypeModal').style.display = 'none';
  document.getElementById('newRestaurantType').value = '';
}
// 닉네임 변경
function saveName() {
  const newRestaurantName = document.getElementById('newRestaurantName').value;

  fetch('/api/owners/me/restaurants', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 쿠키 포함
    body: JSON.stringify({ restaurantName: newRestaurantName }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('업장명 수정에 실패하였습니다.');
      }
      document.getElementById('restaurantName').textContent = newRestaurantName;
      closeNameModal();
      alert('업장명이 변경되었습니다.');
    })
    .catch((err) => alert(err.message));
}

// 비밀번호 변경
function savePassword() {
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    return alert('비밀번호가 일치하지 않습니다.');
  }

  fetch('/api/profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 쿠키 포함
    body: JSON.stringify({ password: newPassword }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('비밀번호 변경에 실패했습니다.');
      }
      closePasswordModal();
      alert('비밀번호가 변경되었습니다.');
    })
    .catch((err) => alert(err.message));
}
// 프로필 사진 변경
function saveMedia() {
  const formData = new FormData();
  formData.append('media', media.files[0]);

  fetch('/api/profile', {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('프로필 변경에 실패했습니다.');
      }
      closeMediaModal();
      alert('프로필 사진이 변경되었습니다.');
      location.reload(); //새로고침
    })
    .catch((err) => alert(err.message));
}

function getUserPosts() {
  fetch('/api/posts', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 쿠키를 포함하여 요청을 보냄
  })
    .then((response) => response.json())
    .then((posts) => {
      const postsContainer = document.getElementById('userPosts');

      // 게시글이 없는 경우
      if (posts.data.length === 0) {
        postsContainer.innerHTML = '<p>작성한 게시글이 없습니다.</p>';
        return;
      }
      // 게시글 HTML 만들기
      let postList = '';
      posts.data.forEach((post) => {
        postList += `
            <article class="post-card">
              <h5>${post.title}</h5>
              <p>${post.content}</p>
              <div class="post-info">
                <small>작성일: ${new Date(post.createdAt).toLocaleDateString()}</small>
                <small>❤️ ${post._count.Like}</small>
              </div>
            </article>
          `;
      });

      postsContainer.innerHTML = postList;
    })
    .catch((err) => alert('게시글을 불러오는데 실패했습니다.'));
}

// 사용자 정보 조회
function getOwnerRestaurant() {
  fetch('/api/owners/me/restaurants', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((res) => {
      document.getElementById('restaurantName').textContent =
        res.data.restaurantName;
      document.getElementById('restaurantAddress').textContent =
        res.data.address;
      document.getElementById('restaurantNumber').textContent =
        res.data.phoneNumber;
      document.getElementById('restaurantType').textContent =
        res.data.restaurantType;
    })
    .catch((err) => alert('업장이 등록되지 않았습니다.', err));
}

// 페이지 로드시 사용자 정보와 게시글 모두 조회
window.onload = function () {
  getOwnerRestaurant();
};
