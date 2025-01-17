function getRestaurantIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('restaurantId', 'paymentId');
}
function getpaymentIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('paymentId');
}

const restaurantId = getRestaurantIdFromUrl();
const paymentId = getpaymentIdFromUrl();

const reviewSubmit = document.querySelector('.reviewSubmit');
const star = document.querySelector('#rating');
const content = document.querySelector('#content');
const media = document.querySelector('#media');

reviewSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  //폼 데이터 생성
  const formData = new FormData();
  formData.append('star', star.value);
  formData.append('content', content.value);
  formData.append('paymentId', parseInt(paymentId));

  if (media.files.length > 0) {
    formData.append('media', media.files[0]);
  }

  fetch(`/api/users/me/restaurants/${restaurantId}/reviews`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      return response.json();
    })
    .then((result) => {
      alert('리뷰 등록 완료');
      console.log('요청성공', result);
      window.location.href = 'login.html';
    })
    .catch((err) => {
      console.log('에러 발생', err);
    });
});
