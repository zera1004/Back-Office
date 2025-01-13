const postSubmit = document.querySelector('.menuSubmit');
const menuName = document.querySelector('#menuName');
const price = document.querySelector('#price');
const content = document.querySelector('#content');
const media = document.querySelector('#media');

postSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  //폼 데이터 생성
  const formData = new FormData();
  formData.append('menuName', menuName.value);
  formData.append('price', price.value);
  formData.append('content', content.value);

  if (media.files.length > 0) {
    formData.append('media', media.files[0]);
  }

  fetch('/api/owners/me/menus', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }
      console.log(response);
      return response.json();
    })
    .then((result) => {
      alert('메뉴 등록 완료');
      console.log('요청성공', result);
      window.location.href = 'login.html';
    })
    .catch((err) => {
      console.log('에러 발생', err);
    });
});
