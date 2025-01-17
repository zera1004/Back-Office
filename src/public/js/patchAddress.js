const urlParams = new URLSearchParams(window.location.search);
const addressId = urlParams.get('id');
const patchForm = document.querySelector('#patchForm');
const addressNameInput = document.querySelector('#addressName');
const addressInput = document.querySelector('#address');

// 기존 주소 불러오기
const fetchAddress = async () => {
  try {
    const response = await fetch(`api/users/me/addresses/${addressId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) throw new Error('주소를 불러올 수 없습니다.');

    const address = await response.json();
    addressNameInput.value = address.data.addressName;
    addressInput.value = address.data.address;
  } catch (error) {
    console.error('주소 불러오기 오류:', error);
  }
};

// 주소 수정
patchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`api/users/me/addresses/${addressId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        addressName: addressNameInput.value,
        address: addressInput.value,
      }),
    });

    if (!response.ok) throw new Error('주소 수정에 실패했습니다.');

    alert('주소가 수정되었습니다.');
    window.location.href = 'getAddress.html';
  } catch (error) {
    console.error('주소 수정 오류:', error);
  }
});

// 초기 데이터 로드
fetchAddress();
