const logInSubmit = document.querySelector('.logInSubmit');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

// 선택된 사용자 유형을 저장할 변수
let selectedUserType = 'customer'; // 기본값

function selectUserType(element) {
  // 모든 사용자 옵션에서 'selected' 클래스를 제거
  const options = document.querySelectorAll('.user-option');
  options.forEach((option) => {
    option.classList.remove('selected');
  });

  // 선택된 요소에 'selected' 클래스를 추가
  element.classList.add('selected');
  selectedUserType = element.getAttribute('data-type'); // 선택된 유형 저장
}

// 페이지가 로드될 때 기본값 설정
document.addEventListener('DOMContentLoaded', () => {
  // 기본값으로 '손님' 옵션 선택
  const defaultOption = document.querySelector(
    '.user-option[data-type="customer"]',
  );
  if (defaultOption) {
    selectUserType(defaultOption); // 기본값 선택 함수 호출
  }
});

logInSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  fetch('/api/auth/log-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      memberType: selectedUserType, // 선택된 사용자 유형
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

      // 로그인 상태 저장
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', selectedUserType); // 사용자 유형 저장

      // 홈 페이지로 이동
      window.location.href = 'home.html';
    })
    .catch((err) => {
      console.log('에러', err.message);
    });
});

function handleLogin() {
  // 로그인 요청을 서버로 보냄
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // 로그인 성공 시 상태 저장
        localStorage.setItem('isLoggedIn', 'true');
        alert('로그인 성공!');
        window.location.href = 'home.html'; // 홈 화면으로 이동
      } else {
        alert('로그인 실패: ' + data.message);
      }
    })
    .catch((err) => {
      console.error('로그인 요청 실패:', err);
      alert('로그인 중 문제가 발생했습니다.');
    });
}
