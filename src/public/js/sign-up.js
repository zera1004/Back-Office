const signUpSubmit = document.querySelector('.signUpSubmit');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const name = document.querySelector('#name');
const phoneNumber = document.querySelector('#phoneNumber');
const modal = document.getElementById('myModal');
const verificationCodeSubmit = document.querySelector(
  '.verificationCodeSubmit',
);
const verificationCode = document.querySelector('#verificationCode');

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

signUpSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  const apiUrl =
    selectedUserType === 'customer'
      ? '/api/auth/sign-up/customer'
      : '/api/auth/sign-up/owner';
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      name: name.value,
      phoneNumber: phoneNumber.value,
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
      modal.style.display = 'block';
      console.log(result);
    })
    .catch((err) => {
      console.log('에러', err.message);
    });
});

verificationCodeSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(email.value, verificationCode.value, selectedUserType)
  fetch('/api/auth/email-verify', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      verificationCode: verificationCode.value,
      memberType: selectedUserType,
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
      modal.style.display = 'block';
      alert('회원가입을 모두 마쳤습니다.')
      console.log(result);
      window.location.href = 'log-in.html';
    })
    .catch((err) => {
      console.log('에러', err.message);
    });
});
