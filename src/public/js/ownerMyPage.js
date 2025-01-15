function openRestaurantNameModal() {
  document.getElementById('restaurantNameModal').style.display = 'block';
}

function closeNameModal() {
  document.getElementById('restaurantNameModal').style.display = 'none';
  document.getElementById('newRestaurantName').value = '';
}

function openRestaurantAddressModal() {
  document.getElementById('restaurantAddressModal').style.display = 'block';
}

function closeAddressModal() {
  document.getElementById('restaurantAddressModal').style.display = 'none';
  document.getElementById('newRestaurantAddress').value = '';
}

function openRestaurantNumberModal() {
  document.getElementById('restaurantNumberModal').style.display = 'block';
}

function closeNumberModal() {
  document.getElementById('restaurantNumberModal').style.display = 'none';
  document.getElementById('newRestaurantNumber').value = '';
}
function openRestaurantTypeModal() {
  document.getElementById('restaurantTypeModal').style.display = 'block';
}

function closeTypeModal() {
  document.getElementById('restaurantTypeModal').style.display = 'none';
  const selectedRadio = document.querySelector(
    'input[name="restaurantType"]:checked',
  );
  if (selectedRadio) {
    selectedRadio.checked = false;
  }
}

function openDeleteRestaurant() {
  document.getElementById('deleteRestaurantModal').style.display = 'block';
}

function closeDelete() {
  document.getElementById('deleteRestaurantModal').style.display = 'none';
}

function openDeleteAccount() {
  document.getElementById('deleteAccountModal').style.display = 'block';
}

function closeDeleteAccount() {
  document.getElementById('deleteAccountModal').style.display = 'none';
  document.getElementById('newPassword').value = '';
}
// 업장명 변경
function saveName() {
  const newRestaurantName = document.getElementById('newRestaurantName').value;

  fetch('/api/owners/me/restaurants', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 쿠키 포함
    body: JSON.stringify({ restaurantName: newRestaurantName }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('업장명 수정에 실패하였습니다.');
      }
      document.getElementById('restaurantName').textContent = newRestaurantName;
      closeNameModal();
      alert('업장명이 변경되었습니다.');
      location.reload();
    })
    .catch((err) => alert(err.message));
}

// 업장주소 변경
function saveAddress() {
  const newAddress = document.getElementById('newRestaurantAddress').value;

  fetch('/api/owners/me/restaurants', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 쿠키 포함
    body: JSON.stringify({ address: newAddress }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('주소 변경에 실패했습니다.');
      }
      closeAddressModal();
      alert('주소가 변경되었습니다.');
      location.reload();
    })
    .catch((err) => alert(err.message));
}

// 업장 번호 변경
function saveNumber() {
  const newPhoneNumber = document.getElementById('newRestaurantNumber').value;

  fetch('/api/owners/me/restaurants', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 쿠키 포함
    body: JSON.stringify({ phoneNumber: newPhoneNumber }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('번호 변경에 실패했습니다.');
      }
      closeNumberModal();
      alert('번호가 변경되었습니다.');
      location.reload();
    })
    .catch((err) => alert(err.message));
}

function saveType() {
  const selectedRadio = document.querySelector(
    'input[name="restaurantType"]:checked',
  );

  if (!selectedRadio) {
    alert('변경할 업종을 선택하세요!');
    return;
  }
  const newType = selectedRadio.value;

  fetch('/api/owners/me/restaurants', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // 쿠키 포함
    body: JSON.stringify({ restaurantType: newType }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('업종 변경에 실패했습니다.');
      }
      closeTypeModal();
      alert('업종이 변경되었습니다.');
      location.reload();
    })
    .catch((err) => alert(err.message));
}

function saveDelete() {
  fetch('/api/owners/me/restaurants', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('업장 삭제에 실패했습니다.');
      }
      closeDelete();
      alert('업장이 삭제되었습니다.');
      location.reload();
    })
    .catch((err) => alert(err.message));
}

function saveDeleteAccount() {
  const newPassword = document.getElementById('newPassword').value;

  fetch('/api/auth', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ password: newPassword }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('회원탈퇴에 실패했습니다.');
      }
      closeDelete();
      alert('회원탈퇴가 되었습니다.');
      alert('진짜로 탈퇴하셨군요');
      alert('저는 마음이 아픕니다.');
      alert('다음에 다시 오실거죠?.');
      alert('돈 버셔야죠.');
      alert('언젠가 다시 만납시다.');
      location.reload();
    })
    .catch((err) => alert(err.message));
}

// 사용자 정보 조회
function getOwnerRestaurant() {
  fetch('/api/owners/me/restaurants', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((res) => {
      document.getElementById('restaurantName').textContent =
        res.data.restaurantName;
      document.getElementById('restaurantAddress').textContent =
        res.data.address;
      document.getElementById('restaurantNumber').textContent =
        res.data.phoneNumber;
      document.getElementById('restaurantType').textContent =
        res.data.restaurantType;
    })
    .catch((err) => alert('업장이 등록되지 않았습니다.', err));
}

// 페이지 로드시 사용자 정보와 게시글 모두 조회
window.onload = function () {
  getOwnerRestaurant();
};
