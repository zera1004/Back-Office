const outline = document.querySelector('.outline');
const address = document.querySelector('#address');
const phoneNumber = document.querySelector('#phoneNumber');
const restaurantName = document.querySelector('#restaurantName');
const restaurantType = document.querySelector('#restaurantType');

outline.addEventListener('click', function (e) {
  e.preventDefault();

  fetch('api/owners/me/restaurants', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: address.value,
      phoneNumber: phoneNumber.value,
      restaurantName: restaurantName.value,
      restaurantType: restaurantType.value,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('업장 등록에 실패했습니다.');
      alert('업장 등록에 실패했습니다.');
      return response.json();
    })
    .then((result) => {
      console.log(result);
      alert('업장 등록에 성공하였습니다!');
      window.location.href = 'ownerMyPage.html';
    })
    .catch((err) => {
      console.log('에러: ', err);
    });
});
