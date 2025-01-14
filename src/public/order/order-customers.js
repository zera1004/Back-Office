document.addEventListener("DOMContentLoaded", () => {
  const orderId = "주문 ID"; // 실제 주문 ID를 동적으로 설정
  const baseUrl = `/users/me/orders/${orderId}`;

  // 주문 상태 확인 요청
  const fetchOrderStatus = async () => {
    try {
      const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch order status");

      const data = await response.json();
      updateOrderStatus(data.message);
    } catch (error) {
      console.error("Error fetching order status:", error.message);
    }
  };

  // 주문 상태 갱신
  const updateOrderStatus = (status) => {
    const orderDetails = document.getElementById("OrderDetails");
    orderDetails.textContent = status;
  };

  // 초기화
  fetchOrderStatus();

  // 버튼 이벤트
  document.querySelectorAll(".OrderProgress").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      alert(`Button '${event.target.textContent}' clicked!`);
    });
  });
});
