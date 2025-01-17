function searchRestaurants() {
  const searchInput = document.querySelector('input[type="text"]').value.trim();

  if (!searchInput) {
    alert('검색어를 입력해 주세요.');
    return;
  }

  fetch(`/api/restaurants/search?search=${encodeURIComponent(searchInput)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.error('서버 오류:', data.message);
        alert(data.message);
        return;
      }

      if (!Array.isArray(data)) {
        console.error('응답 데이터가 배열이 아닙니다:', data);
        alert('검색 결과가 잘못되었습니다.');
        return;
      }

      if (data.length === 0) {
        alert('검색된 맛집이 없습니다.');
        return;
      }

      alert(`검색 결과: ${data.length}개의 맛집이 검색되었습니다.`);

      const imageArea = document.querySelector('.image-area');
      imageArea.innerHTML = ''; // 기존 내용 초기화

      data.forEach((restaurant) => {
        const restaurantItem = document.createElement('div');
        restaurantItem.classList.add('restaurant-item');

        const nameElement = document.createElement('h4');
        nameElement.textContent = restaurant.restaurantName;
        restaurantItem.appendChild(nameElement);

        const addressElement = document.createElement('p');
        addressElement.textContent = `주소: ${restaurant.address}`;
        restaurantItem.appendChild(addressElement);

        const phoneElement = document.createElement('p');
        phoneElement.textContent = `전화번호: ${restaurant.phoneNumber}`;
        restaurantItem.appendChild(phoneElement);

        imageArea.appendChild(restaurantItem);
      });

      console.log(data); // 디버그용
    })
    .catch((err) => {
      console.error('검색에 실패했습니다.', err);
      alert('검색에 실패했습니다.');
    });
}

// 맛집 랭킹 불러오기
function loadRanking() {
  fetch('/api/restaurants/ranking', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      const rankingList = document.querySelector('.ranking ol');
      rankingList.innerHTML = ''; // 기존 리스트 초기화
      data.data.forEach((restaurant, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = ` ${restaurant.restaurantName}`;
        rankingList.appendChild(listItem);
      });
    })
    .catch((err) => {
      console.error('맛집 랭킹을 불러오는데 실패했습니다.', err);
      alert('맛집 랭킹을 불러오는데 실패했습니다.');
    });
}

function loadImageArea() {
  const imageArea = document.querySelector('.image-area');

  // 로딩 중 텍스트 표시
  imageArea.innerHTML = '<p>로딩 중...</p>';

  // 서버에서 데이터를 가져오려고 시도
  fetch('/api/restaurants/highlight', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      // 서버에서 받은 데이터가 유효하면 해당 내용 표시
      if (data && data.imageUrl) {
        imageArea.innerHTML = `<p>${data.title}</p><img src="${data.imageUrl}" alt="맛집 이미지" style="max-width: 100%; border-radius: 8px;">`;
      } else {
        // 데이터가 없으면 기본 이미지 표시
        imageArea.innerHTML = `<img src="https://i.ibb.co/SsDjPV2/image.png" alt="기본 맛집 이미지" style="max-width: 100%; border-radius: 8px;">`;
      }
    })
    .catch((err) => {
      // 데이터 요청 실패 시 기본 이미지 표시
      imageArea.innerHTML = `<p>이미지를 불러오는데 실패했습니다.</p><img src="https://i.ibb.co/SsDjPV2/image.png" alt="기본 맛집 이미지" style="max-width: 100%; border-radius: 8px;">`;
      console.error(err);
    });
}

function updateNavBar() {
  const navLinks = document.querySelector('.nav-links');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userType = localStorage.getItem('userType'); // 손님 또는 사장님 확인

  // 네비게이션 바 업데이트
  navLinks.innerHTML = isLoggedIn
    ? `
      <a href="${userType === 'customer' ? 'my-page.html' : 'ownerMyPage.html'}" role="button">마이 페이지</a>
      <a href="#" role="button" onclick="logout()">로그아웃</a>
    `
    : `
      <a href="log-in.html" role="button">로그인</a>
      <a href="sign-up.html" role="button">회원가입</a>
    `;
}
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userType');
  updateNavBar(); // 로그아웃 후 네비게이션 바 다시 업데이트
}

function filterByRestaurantType(restaurantType) {
  // 전체 레스토랑 조회
  fetch('/api/restaurants/all', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.error('서버 오류:', data.message);
        alert(data.message);
        return;
      }

      if (!Array.isArray(data)) {
        console.error('응답 데이터가 배열이 아닙니다:', data);
        alert('검색 결과가 잘못되었습니다.');
        return;
      }

      // 타입에 맞는 레스토랑만 필터링
      const filteredRestaurants = data.filter(
        (restaurant) => restaurant.restaurantType === restaurantType,
      );

      if (filteredRestaurants.length === 0) {
        alert(`선택한 타입(${restaurantType})에 맞는 맛집이 없습니다.`);
        return;
      }

      alert(
        `${restaurantType} 맛집 ${filteredRestaurants.length}개가 검색되었습니다.`,
      );

      const imageArea = document.querySelector('.image-area');
      imageArea.innerHTML = ''; // 기존 내용 초기화

      filteredRestaurants.forEach((restaurant) => {
        const restaurantItem = document.createElement('div');
        restaurantItem.classList.add('restaurant-item');

        const nameElement = document.createElement('h4');
        nameElement.textContent = restaurant.restaurantName;
        restaurantItem.appendChild(nameElement);

        const addressElement = document.createElement('p');
        addressElement.textContent = `주소: ${restaurant.address}`;
        restaurantItem.appendChild(addressElement);

        const phoneElement = document.createElement('p');
        phoneElement.textContent = `전화번호: ${restaurant.phoneNumber}`;
        restaurantItem.appendChild(phoneElement);

        imageArea.appendChild(restaurantItem);
      });

      console.log(filteredRestaurants); // 디버그용
    })
    .catch((err) => {
      console.error('매장 조회에 실패했습니다.', err);
      alert('매장 조회에 실패했습니다.');
    });
}

// 네비게이션 클릭 시 레스토랑 타입에 맞는 필터 적용
function setupNavBar() {
  const navItems = document.querySelectorAll('nav ul li a');
  navItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault(); // 기본 링크 동작을 막음

      // 클릭된 항목에 맞는 restaurantType을 지정
      let restaurantType = '';
      const type = item.textContent.toLowerCase(); // 한식, 일식 등

      // 타입에 맞게 restaurantType을 매핑
      if (type === '한식') {
        restaurantType = 'korean';
      } else if (type === '일식') {
        restaurantType = 'japanese';
      } else if (type === '중식') {
        restaurantType = 'chinese';
      } else if (type === '양식') {
        restaurantType = 'western';
      } else if (type === '분식') {
        restaurantType = 'snack';
      } else if (type === '카페') {
        restaurantType = 'cafe';
      }

      filterByRestaurantType(restaurantType); // 클릭된 항목에 맞는 타입으로 레스토랑 필터링
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userType = localStorage.getItem('userType'); // 손님(customer) 또는 사장님(owner)

  // 로그인 상태에 따라 버튼 표시/숨기기
  if (isLoggedIn === 'true') {
    // 로그인 상태일 때
    document.getElementById('myPageButton').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'block';
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('signUpButton').style.display = 'none';
  } else {
    // 로그인되지 않은 상태일 때
    document.getElementById('loginButton').style.display = 'block';
    document.getElementById('signUpButton').style.display = 'block';
    document.getElementById('myPageButton').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
  }
});

// 마이페이지로 이동하는 함수
function goToMyPage() {
  const userType = localStorage.getItem('userType');
  if (userType === 'customer') {
    window.location.href = 'my-page.html'; // 손님 마이페이지
  } else if (userType === 'owner') {
    window.location.href = 'ownerMyPage.html'; // 사장님 마이페이지
  }
}

// 로그아웃 함수
function logOut() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userType');
  window.location.reload(); // 페이지 리로드하여 로그인 상태 초기화
}

window.onload = function () {
  updateNavBar(); // 네비게이션 초기화
  loadRanking();
  loadImageArea();
  setupNavBar(); // 네비게이션 클릭 이벤트 설정
};

// 이벤트 리스너 설정
function setupEventListeners() {
  const searchButton = document.querySelector('.search button');
  searchButton.addEventListener('click', searchRestaurants);
}
