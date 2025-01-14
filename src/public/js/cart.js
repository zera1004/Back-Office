document.addEventListener('DOMContentLoaded', () => {
  const cartTableBody = document.getElementById('cartItems');
  const totalAmountElement = document.getElementById('totalAmount');
  const orderButton = document.getElementById('orderButton');

  const userId = 14; // 예시로 User ID를 설정 (현재 유저 ID)
  const cartId = 2;  // 예시로 Cart ID를 설정

  // 장바구니에 메뉴 추가
  async function addMenuToCart(menuId, restaurantId, count) {
    const response = await fetch(`/api/users/${userId}/carts/${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        menuId: menuId,
        restaurantId: restaurantId,
        count: count,
      }),
    });

    if (response.ok) {
      // 메뉴가 추가되면 장바구니 항목을 갱신
      getCartItems();
    } else {
      alert('메뉴 추가에 실패했습니다.');
    }
  }

  // 장바구니 항목 조회
  async function getCartItems() {
    const response = await fetch(`/api/users/${userId}/carts/${cartId}`);
    const cartItems = await response.json();

    // 테이블을 갱신
    cartTableBody.innerHTML = '';
    let totalAmount = 0;

    cartItems.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.menuName}</td>
        <td class="price">${item.price}</td>
        <td>${item.restaurantName}</td>
        <td><input type="number" value="${item.count}" min="1" class="count" style="width: 60px;" /></td>
        <td><button type="button" class="delete-btn" onclick="deleteCartItem(${item.cartDetailId})">삭제</button></td>
      `;
      cartTableBody.appendChild(row);

      // 총액 계산
      totalAmount += item.price * item.count;
    });

    totalAmountElement.textContent = `₩${totalAmount}`;
  }

  // 장바구니 항목 삭제
  async function deleteCartItem(cartDetailId) {
    const response = await fetch(`/api/users/${userId}/carts/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartDetailId: cartDetailId,
      }),
    });

    if (response.ok) {
      // 항목 삭제 후 장바구니 항목 갱신
      getCartItems();
    } else {
      alert('삭제에 실패했습니다.');
    }
  }

  // 장바구니 조회
  getCartItems();

  // 예시로 메뉴를 추가할 수 있는 함수 (임시로 버튼으로 테스트)
  const addMenuButton = document.createElement('button');
  addMenuButton.textContent = '짜장면 추가';
  addMenuButton.addEventListener('click', () => {
    addMenuToCart(2, 2, 2); // 메뉴 ID, 식당 ID, 수량
  });
  document.body.appendChild(addMenuButton);
});
