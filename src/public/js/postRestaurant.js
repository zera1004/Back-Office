const outline = document.querySelector('.outline');
const address = document.querySelector('#address');
const phoneNumber = document.querySelector('#phoneNumber');
const restaurantName = document.querySelector('#restaurantName');

outline.addEventListener('click', function (e) {
  e.preventDefault();
  const restaurantType = document.querySelector(
    'input[name="restaurantType"]:checked',
  );
  console.log(restaurantType);

  if (!restaurantType) {
    alert('레스토랑 타입을 선택해주세요.');
    return;
  }

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
      if (!response.ok) {
        alert('업장 등록에 실패했습니다.');
        throw new Error('업장 등록에 실패했습니다.');
      }

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
