// src\public\order\0_order-customers copy.js  <-수정할 파일 명.

//주석처리한 부분을 class="repitByPament" 안에서 내 userId랑 일치하는 payment의 데이터 만큼 반복해줘

document.addEventListener('DOMContentLoaded', () => {
  const userId = 'myUserId'; // 사용자 ID
  const baseUrl = `/users/me/payment/`; // API 엔드포인트
  const headers = {
    'Content-Type': 'application/json',
  };

  // 데이터를 가져와서 렌더링하는 함수
  const fetchAndRenderPayments = async () => {
    try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers,
      });

      if (!response.ok) throw new Error('Failed to fetch payment data');

      const payments = await response.json();

      // userId와 일치하는 데이터를 필터링
      const filteredPayments = payments.filter(
        (payment) => payment.userId === userId,
      );

      // repitByPament 안에 데이터 렌더링
      const container = document.querySelector('.repitByPament');
      container.innerHTML = ''; // 기존 내용을 초기화

      filteredPayments.forEach((payment) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.style =
          'background-color: rgba(98, 226, 194, 0.349); padding: 10px;';

        form.innerHTML = `
        <form method="POST" style="background-color: rgba(98, 226, 194, 0.349); padding: 10px;">
            <div class="orderProgressStatus" style="display: flex; gap: 10px; align-items: flex-start;">
              <label for="email" style="width: 85px;">진행 상황</label>
              <p id="orderProgressStatus" style="
                margin-right: auto;
                border: 1px solid #ccc; 
                font-weight: bold;
                font-size: 20px;
                background-color: rgba(119, 238, 108, 0.438);
                border-radius:3px;         
                resize: none; 
                width: 200px;
                height: 40px; 
                text-align: center; 
                overflow-y: auto; 
                word-wrap: break-word;
                white-space: pre-wrap;
              ">${payment.status}</p>
            </div>
  
        <p id="pamentId">${payment.paymentId}</p>
            <div class="OrderDetails" style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="width: 100px;">주문내역</span>
              <textarea readonly id="OrderDetails" class="info">
${payment.orderDetails
  .map(
    (order) => `
${order.storeName} - ${order.itemName} ${order.quantity}개 ${order.status}
                `,
  )
  .join('\n')}
              </textarea>
            </div>
  
            <div class="CustomerInfo" style="display: flex; gap: 10px; align-items: flex-start;">
              <span style="width: 100px;">가게 정보</span>
              <textarea readonly id="CustomerInfo" class="info">
                ${payment.storeInfo
                  .map(
                    (store) => `
                  ${store.storeName} 주소: ${store.address} 평점: ${store.rating}
                `,
                  )
                  .join('\n')}
              </textarea>
            </div>
  
            <div style="display: flex; justify-content: flex-end; padding: 10px; height: 70px;">
              <button type="button" class="OrderProgress" id="OrderProgress-delete">주문취소</button>
            </div></form>
          `;

        container.appendChild(form);
      });
    } catch (error) {
      console.error('Error fetching and rendering payments:', error.message);
    }
  };

  // 취소 버튼 누르면 id = "OrderProgress-delete"

  // 버튼 이벤트 핸들러
  document.querySelectorAll('.OrderProgress').forEach((button) => {
    button.addEventListener('click', (event) => {
      const fetchAndRenderPayments = async () => {
        try {
          const response = await fetch(
            `/users/me/orders/${payment.paymentId} `,
            {
              method: 'delete',
              headers,
            },
          );
        } catch (error) {
          console.error('Error updating order state:', error.message);
        }
      };
      updateOrderState(newState);
    });
  });

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

  // 초기 데이터 로드
  fetchAndRenderPayments();
});
