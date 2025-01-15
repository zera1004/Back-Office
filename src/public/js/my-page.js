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
      location.reload(); // 새로고침
    })
    .catch((err) => alert(err.message));
}

// 사용자 정보 조회
function getUserProfile() {
  fetch('/api/auth/profile', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((res) => {
      document.getElementById('name').textContent = res.data.name;
      document.getElementById('userName').textContent = res.data.name;
      document.getElementById('emailValue').textContent = res.data.email;
      document.getElementById('passwordValue').textContent = res.data.password;
      document.getElementById('phoneNumberValue').textContent =
        res.data.phoneNumber;
      document.getElementById('pointValue').textContent =
        res.data.point + ' point';
      document.getElementById('image').src = res.data.media || '';
    })
    .catch((err) => alert('프로필 정보를 불러오는데 실패했습니다.', err));
}

// 비밀번호 변경 모달 열기
function openPasswordModal() {
  document.getElementById('passwordModal').style.display = 'block';
}

// 비밀번호 변경 모달 닫기
function closePasswordModal() {
  document.getElementById('passwordModal').style.display = 'none';
}

// 전화번호 변경 모달 열기
function openPhoneNumberModal() {
  document.getElementById('phoneNumberModal').style.display = 'block';
}

// 전화번호 변경 모달 닫기
function closePhoneNumberModal() {
  document.getElementById('phoneNumberModal').style.display = 'none';
}

// 비밀번호 수정 저장
function savePassword() {
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword =
    document.getElementById('confirmNewPassword').value;
  if (newPassword !== confirmNewPassword) {
    alert('입력한 비밀번호 두개가 일치하지 않습니다.');
  } else {
    fetch('/api/auth/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        password: newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            alert(err.message);
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        alert(result);
        closePasswordModal();
        location.reload();
      })
      .catch((err) => {
        console.log('에러', err.message);
      });
  }
}

// 전화번호 수정 저장
function savePhoneNumber() {
  const newPhoneNumber = document.getElementById('newPhoneNumber').value;
  fetch('/api/auth/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      phoneNumber: newPhoneNumber,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          alert(err.message);
          throw new Error(err.message);
        });
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      alert(result);
      closePhoneNumberModal();
      location.reload();
    })
    .catch((err) => {
      console.log('에러', err.message);
    });
}

// 페이지 로드시 사용자 정보와 게시글 모두 조회
window.onload = function () {
  getUserProfile();
};
