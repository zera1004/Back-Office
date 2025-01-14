const logInSubmit = document.querySelector('.logInSubmit');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
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
      memberType: 'customer',
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('로그인에 실패하였습니다');
      return response.json();
    })
    .then((result) => {
      console.log(result);
      window.location.href = 'reviewsByUser.html';
    })
    .catch((err) => {
      console.log('에러: ', err);
    });
});
