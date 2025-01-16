document.addEventListener('DOMContentLoaded', () => {
  const userId = 'myUserId'; // 사용자 ID
  const baseUrl = `/api`; // API 엔드포인트
  const headers = {
    'Content-Type': 'application/json',
  };

  // 데이터를 가져와서 렌더링하는 함수
  const fetchAndRenderPayments = async () => {
    try {
      // 파라미스로 소유한 가게id 가져오기
      const restaurantResponse = await fetch(`api/owners/me/restaurants`, {
        method: 'GET',
        headers,
      });
      if (!restaurantResponse.ok)
        throw new Error('Failed to fetch restaurant data');
      const restaurantData = await restaurantResponse.json();
      const restaurantId = restaurantData.restaurantId;

      // 주문정보
      const response = await fetch(
        `${baseUrl}/myOrders/?restaurantId=${restaurantId}`,
        {
          method: 'GET',
          headers,
        },
      );

      if (!response.ok) throw new Error('Failed to fetch payment data');

      const payments = await response.json();

      // id="storname"인 요소를 선택
      const stornameElement = document.getElementById('restaurantName');
      // 주문현황 - 가게이름
      stornameElement.textContent = `주문현황 - ${payments.restaurant.restaurantName}`;

      // repitByPament 안에 데이터 렌더링
      const container = document.querySelector('.repitByPament');
      container.innerHTML = ''; // 기존 내용을 초기화

      payments.forEach((p) => {
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
        ">${p.payment.order.status}</p>
        <p id="paymentId" style="margin-left: auto;">${p.payment.paymentId}</p>

        </div>
        <div class="OrderDetails" style=" display: flex; gap: 10px; align-items: flex-start;">
          <span style="width: 100px;">주문내역 </span>
          <textarea readonly id="OrderDetails" class="info">
${p.payment.order.menu.join('\n')}
        </textarea>
        </div>
        <div class="CustomerInfo" style=" display: flex; gap: 10px; align-items: flex-start;">
          <span style="width: 100px;">고객 정보 </span>
          <textarea readonly id="CustomerInfo" class="info">
고객 이름 : ${p.payment.user.userName}
배송지 :  ${p.payment.user.userAddress}
        </textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; padding: 10px; height: 70px;">


        <!--onclick으로 넘어갈 때 p.payment.paymentId-->
          <button type="OrderProgress" class="OrderProgress" id="OrderProgress-ready" onclick
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
      });
    } catch (error) {
      console.error(error.message);
    }
    container.appendChild(form);
  };

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
         const { 페이먼트id } = req.params;
         const { status } = req.body;
         const result = await this.#services.orderStatusUpdate(id, status);
         return res.status(HTTP_STATUS.OK).json({
           message: MESSAGES.ORDER.CHECK.SUCCEED`${result}`,
         });
       } catch (error) {
         return res.json({ message: error.message });
       }
     };

// OrderProgress-ready / OrderProgress-deliveryComplete / OrderProgress-delete
 //처음상태
      // PREPARING
      // 준비완료 버튼 id="OrderProgress-ready"
      //  req.body에 DELIVERING
      // 배달완료 버튼 id="OrderProgress-deliveryComplete"
      // req.body에  DELIVERED
      // 취소 버튼 누르면 id = "OrderProgress-delete"
      //  req.body에 CANCELED
    // 버튼 클릭 이벤트에 fetch API 연결
    */

  // 주문 상태 변경 함수
  const changeStatus = async (status, paymentId) => {
    try {
      const response = await fetch(`/api/owners/me/orders/state/${paymentId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status }), // JSON 형식으로 body 전달
      });
      if (!response.ok) throw new Error('Failed to change order status');
      alert('상태가 성공적으로 변경되었습니다.');
      fetchAndRenderPayments(); // 변경 후 데이터 다시 로드
    } catch (error) {
      console.error(error.message);
    }
  };

  document
    .getElementById('OrderProgress-ready')
    .addEventListener('click', async () => {
      await changeStatus(DELIVERING, paymentId);
      fetchAndRenderPayments();
    });

  document
    .getElementById(' OrderProgress-deliveryComplete')
    .addEventListener('click', async () => {
      await changeStatus(DELIVERED, paymentId);
      fetchAndRenderPayments();
    });

  document
    .getElementById('OrderProgress-delete')
    .addEventListener('click', async () => {
      await changeStatus(CANCELED, paymentId);
      fetchAndRenderPayments();
    });

  // 초기 데이터 로드
  fetchAndRenderPayments();
});
