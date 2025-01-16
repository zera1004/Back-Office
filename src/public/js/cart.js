// 카트의 메뉴 목록 불러오기
async function menuByCart(cartId) {
  try {
    // 실제 API 주소와 맞춰주세요
    const response = await fetch(`/api/users/me/carts/${cartId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }

    const responseData = await response.json();
    console.log('js의 API 호출 후 데이터:', responseData);
    // >> responseBody.data => { cartTotalPrice, cartTotalItem: [ ... ] }

    // 구조 해제
    // responseBody.data => { cartTotalPrice, cartTotalItem: [ ... ] }
    const { cartTotalPrice, totalPrice } = responseData.data;

    // data.cartTotalItem가 우리가 뿌려야 할 메뉴 배열
    // data.cartTotalPrice가 총 합계

    displayCartItems(cartTotalPrice, totalPrice, cartId);
  } catch (error) {
    console.error('메뉴를 가져오는 중 오류 발생:', error);
  }
}

function displayCartItems(cartItems, totalPrice, cartId, cartTotalPrice) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = ''; // 기존 내용 초기화

  cartItems.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="" alt="음식${index}" style="width:80px; height:auto;"></td>
      <td>${item.menuName}</td>
      <td>₩${item.price}</td>
      <td>${item.count}</td>
      <td><button type="button" class="deleteBtn">삭제</button></td>
    `;

    // 삭제 버튼 이벤트 연동
    const deleteBtn = tr.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => {
      // item.cartDetailId를 이용해 삭제 API 호출
      deleteCartItem(cartId, item.cartDetailId);
    });

    // // 주문하기 버튼 이벤트 연동
    // const orderBtn = tr.querySelector('.orderBtn');
    // orderBtn.addEventListener('click', () => {
    //   // item.cartDetailId를 이용해 삭제 API 호출
    //   createOrder(cartId, cartTotalPrice);
    // });

    tbody.appendChild(tr);
  });

  // 총액 표기 부분
  const totalElem = document.querySelector('.total strong');
  totalElem.textContent = `총액: ₩${totalPrice}`;
}

async function deleteCartItem(cartId, cartDetailId) {
  try {
    const response = await fetch(`/api/users/me/carts/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartDetailId: cartDetailId,
      }),
    });

    if (!response.ok) {
      throw new Error('아이템 삭제에 실패했습니다.');
    }

    console.log(`cartDetailId: ${cartDetailId} 아이템을 삭제했습니다.`);

    // 삭제 후 다시 카트 목록을 불러와 갱신
    await menuByCart(cartId);
  } catch (error) {
    console.error('아이템 삭제 중 오류 발생:', error);
  }
}

async function createOrder(cartTotalPrice, cartId) {
  const response = await fetch(`/api/users/me/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: PREPARING,
      cartId: cartId,
      restaurantId: cartTotalPrice.restaurantId,
    }),
  });
}

window.onload = () => {
  const cartId = '1'; // 임시 값
  menuByCart(cartId);
};
