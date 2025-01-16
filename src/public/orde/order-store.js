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

      // id="storname"인 요소를 선택
      const stornameElement = document.getElementById('storname');
      // 요소의 텍스트를 업데이트
      stornameElement.textContent = `주문현황 - ${order.storeName}`;

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

        <div class="orderProgressStatus" style=" display: flex; gap: 10px; align-items: flex-start;">
          <label for="email" style="width: 85px;">진행 상황</label>
          <p id="orderProgressStatus" style="
        margin-right: auto;
          border: 1px solid #ccc; 
          font-weight: bold;
          font-size: 20px;
          background-color: rgba(119, 238, 108, 0.438);
          border-radius:3px;         
          resize: none; 
          width: 200px ;
          height: 40px; text-align: center; /* 텍스트 중앙 정렬 */
          overflow-y: auto; 
          word-wrap: break-word;
          white-space: pre-wrap;
        ">${payment.status}</p>
          <p id="pamentId">${payment.paymentId}</p>
        </div>
        <div class="OrderDetails" style=" display: flex; gap: 10px; align-items: flex-start;">
          <span style="width: 100px;">주문내역 </span>
          <textarea readonly id="OrderDetails" class="info">
${payment.orderDetails
  .map(
    (order) => `
            - ${order.itemName} ${order.quantity}개 
          `,
  )
  .join('\n')}
        </textarea>
        </div>
        <div class="CustomerInfo" style=" display: flex; gap: 10px; align-items: flex-start;">
          <span style="width: 100px;">고객 정보 </span>
          <textarea readonly id="CustomerInfo" class="info">
          ${payment.storeInfo
            .map(
              (user) => `
            ${user.userName} 주소: ${user.address} 
          `,
            )
            .join('\n')}
        </textarea>
        </div>



        <div style="display: flex; justify-content: flex-end; padding: 10px; height: 70px;">

          <button type="OrderProgress" class="OrderProgress" id="OrderProgress-ready"
            style="margin-right: 10px;">음식준비완료</button>
          <!-- 배달중으로 바꾸기,  주문준비중 버튼 보이기 -->
          <button type="OrderProgress" class="OrderProgress" id="OrderProgress-deliveryComplete"
            style="margin-right: 10px;">배달완료</button>
          <!-- 다른버튼 없애기 -->
          <button type="OrderProgress" class="OrderProgress" id="OrderProgress-delete">주문취소</button>
          <!-- 취소된 주문으로 상태 바꾸기? 데이터 삭제? -->
        </div>
        </div>
      </form>`;

        container.appendChild(form);
      });

      /**
   * // 주문상태 수정 - 가게
   router.patch(
     '/owners/me/orders/state/:paymentid',
     requireAccessToken,
     orderController.editStatus,
   );

   
     //주문상태 수정
     editStatus = async (req, res) => {
       try {
         const { id } = req.params;
         const { status } = req.body;
         const result = await this.#services.orderStatusUpdate(id, status);
         return res.status(HTTP_STATUS.OK).json({
           message: MESSAGES.ORDER.CHECK.SUCCEED`${result}`,
         });
       } catch (error) {
         return res.json({ message: error.message });
       }
     };


   */
      //처음상태
      // PREPARING
      // 준비완료 버튼 id="OrderProgress-ready"
      //  req.body에 DELIVERING
      // 배달완료 버튼 id="OrderProgress-deliveryComplete"
      // req.body에  DELIVERED
      // 취소 버튼 누르면 id = "OrderProgress-delete"
      //  req.body에 CANCELED

      // 버튼 핸들러 추가
      document.querySelectorAll('.OrderProgress').forEach((button) => {
        button.addEventListener('click', async (event) => {
          const paymentId = event.target.getAttribute('data-id');
          const status = event.target.getAttribute('data-status');

          try {
            const response = await fetch(`${baseUrl}${paymentId}`, {
              method: 'PATCH',
              headers,
              body: JSON.stringify({ status }),
            });

            if (!response.ok)
              throw new Error('Failed to update payment status');

            console.log(`Payment ${paymentId} updated to ${status}`);
            // 상태 업데이트 후 다시 데이터를 가져와 렌더링
            fetchAndRenderPayments();
          } catch (error) {
            console.error('Error updating payment status:', error.message);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching and rendering payments:', error.message);
    }
  };

  // 초기 데이터 로드
  fetchAndRenderPayments();
});
