document.addEventListener('DOMContentLoaded', () => {
  /**
   * id="orderProgressStatus"
   * id="OrderDetails"
   * id="CustomerInfo"
   */

  // order 읽어서 목록 만들기

  const pamentID = 0;
  // 해당하는 메뉴, 개수, 가게, 주문일시 가져오기

  const orderId = [];
  // pamentID가 일치하는 주문id  동적으로 설정

  const baseUrl = `/users/me/orders/${orderId}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  // 주문 상태 확인 요청
  const fetchOrderStatus = async () => {
    try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers,
      });

      if (!response.ok) throw new Error('Failed to fetch order status');

      const data = await response.json();
      updateOrderStatus(data.message);
    } catch (error) {
      console.error('Error fetching order status:', error.message);
    }
  };

  // 주문 상태 갱신
  const updateOrderStatus = (status) => {
    const orderDetails = document.getElementById('OrderDetails');
    orderDetails.textContent = `주문 상태: ${status}`;
  };

  // 주문 상태 업데이트 요청
  const updateOrderState = async (newState) => {
    try {
      const response = await fetch(`${baseUrl}/state`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: newState }),
      });

      if (!response.ok) throw new Error('Failed to update order state');

      const data = await response.json();
      alert(data.message);
      fetchOrderStatus(); // 상태 업데이트 후 상태 새로 고침
    } catch (error) {
      console.error('Error updating order state:', error.message);
    }
  };

  // 초기화: 주문 상태 로드
  fetchOrderStatus();

  // 버튼 이벤트 핸들러
  document.querySelectorAll('.OrderProgress').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const newState =
        event.target.id === 'OrderProgress-ready'
          ? 'ready'
          : 'deliveryComplete';

      updateOrderState(newState);
    });
  });
});
