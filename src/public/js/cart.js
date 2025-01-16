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

    const { data } = await response.json();
    console.log('js의 API 호출 후 데이터:', data);
    // >> responseBody.data => { cartTotalPrice, cartTotalItem: [ ... ] }

    // data.cartTotalPrice 배열
    const cartItems = data.cartTotalPrice;
    const totalPrice = data.totalPrice;
    totalPrice;
    // 레스토랑 ID 추출
    const restaurantIds = cartItems.map((item) => item.restaurantId);
    // 중복 제거
    const uniqueRestaurantIds = [...new Set(restaurantIds)];

    // 1) 서로 다른 레스토랑이 2개 이상이면 에러 처리 or 안내
    if (uniqueRestaurantIds.length > 1) {
      alert(
        '서로 다른 식당의 메뉴가 섞여 있어 주문이 불가능합니다.\n한 식당의 메뉴만 주문해주세요!',
      );
      return;
    }

    // 2) 만약 모두 같은 레스토랑이라면 → restaurantId 하나를 쓸 수 있음
    const restaurantId = uniqueRestaurantIds[0];
    // 구조 해제
    // responseBody.data => { cartTotalPrice, cartTotalItem: [ ... ] }
    // const { cartTotalPrice, totalPrice } = responseData.data;

    // data.cartTotalItem가 우리가 뿌려야 할 메뉴 배열
    // data.cartTotalPrice가 총 합계

    displayCartItems(cartItems, totalPrice, cartId, restaurantId);
  } catch (error) {
    console.error('메뉴를 가져오는 중 오류 발생:', error);
  }
}

function displayCartItems(cartItems, totalPrice, cartId, restaurantId) {
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

    tbody.appendChild(tr);
  });

  // 총액 표기 부분
  const totalElem = document.querySelector('.total strong');
  totalElem.textContent = `총액: ₩${totalPrice}`;
  // 주문하기 버튼 이벤트 연동
  const orderBtn = document.querySelector('.orderBtn');
  orderBtn.addEventListener('click', () => {
    // 필요 시 주문 상태(status)나 그 외 데이터를 매개변수에 넣어 호출
    console.log(cartId, restaurantId);
    createOrder(cartId, restaurantId);
  });
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

async function createOrder(cartId, restaurantId) {
  console.log(`들어온 음식점 id 확인`, restaurantId);
  const response = await fetch(`/api/users/me/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: 'PREPARING',
      cartId: parseInt(cartId, 10),
      restaurantId: restaurantId,
    }),
  });

  if (!response.ok) {
    throw new Error('아이템 삭제에 실패했습니다.');
  }

  console.log(`주문 완료.`);
}

window.onload = () => {
  const cartId = '1'; // 임시 값
  menuByCart(cartId);
};
