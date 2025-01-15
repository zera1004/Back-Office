document.addEventListener('DOMContentLoaded', function () {
    const cartItems = [
      { id: 1, name: 'Item 1', price: 100000, quantity: 2 },
      { id: 2, name: 'Item 2', price: 200000, quantity: 1 },
      { id: 3, name: 'Item 3', price: 50000, quantity: 3 }
    ]; // 예시 데이터. 실제로는 API로 받아올 수 있습니다.
    
    const cartItemsList = document.querySelector('#cartItems');
    const totalPriceEl = document.querySelector('#totalPrice');
    const checkoutButton = document.querySelector('#checkoutButton');
    
    // 장바구니 항목 추가
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${item.name}</strong> - ${item.quantity} x ${item.price}원
        <span class="price">총 ${item.price * item.quantity}원</span>
      `;
      cartItemsList.appendChild(li);
    });
    
    // 총 가격 계산
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalPriceEl.textContent = totalPrice.toLocaleString();
    
    // 결제 버튼 클릭 시
    checkoutButton.addEventListener('click', function () {
      // 예시: 결제 처리 로직 (API 호출 등)
      alert('Proceeding to checkout...');
      // 실제로는 결제 처리 후 페이지 이동 등을 할 수 있습니다.
    });
  });
  