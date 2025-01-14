const addressList = document.querySelector('#addressList');

// 주소 목록 불러오기
const fetchAddresses = async () => {
  try {
    const response = await fetch('api/users/me/addresses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('주소 목록을 불러오지 못했습니다.');
    }

    const addresses = await response.json();
    renderAddressList(addresses.data);
  } catch (error) {
    console.error('주소 목록 로드 오류:', error);
    addressList.innerHTML =
      '<p>주소 목록을 불러오는 중 오류가 발생했습니다.</p>';
  }
};

// 주소 목록 렌더링
const renderAddressList = (addresses) => {
  // console.log(addresses);
  addressList.innerHTML = '';
  if (addresses.length === 0) {
    addressList.innerHTML = '<p>등록된 주소가 없습니다.</p>';
    return;
  }

  addresses.forEach((address) => {
    // console.log(address);
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${address.addressName}</strong>: ${address.address}
      <a href="patchAddress.html?id=${address.addressId}" role="button">수정</a>
      <a href="deleteAddress.html?id=${address.addressId}" role="button" class="deleteButton">삭제</a>
    `;
    addressList.appendChild(listItem);
  });
};

// 페이지 로드 시 주소 목록 불러오기
fetchAddresses();
