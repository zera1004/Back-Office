// 전역 변수: 장바구니 목록과 총합
let cart = []; // [{menuId, restaurantId, price, quantity, subTotal}, ...]
let totalPrice = 0; // 장바구니 총 금액

window.onload = () => {
  const restaurantId = '32'; // 임시 값
  menuByRestaurant(restaurantId);
  setupPaymentButton();
};

// 메뉴 목록 불러오기
async function menuByRestaurant(restaurantId) {
  try {
    // 실제 API 주소와 맞춰주세요
    const response = await fetch(`/api/restaurnts/${restaurantId}/menus`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }

    const data = await response.json();
    // 예시: { data: [ { menuId, restaurantId, menuName, price, content }, ... ] }
    const menus = data.data; // 'data' 속성에서 메뉴 배열 추출

    if (!Array.isArray(menus)) {
      throw new Error('메뉴 데이터가 배열이 아닙니다.');
    }

    displayMenus(menus);
  } catch (error) {
    console.error('메뉴를 가져오는 중 오류 발생:', error);
  }
}

// 메뉴 목록을 동적으로 표시
function displayMenus(menus) {
  const menusContainer = document.getElementById('menusContainer');
  menusContainer.innerHTML = ''; // 기존 내용 초기화

  menus.forEach((menu) => {
    // 메뉴 하나당 컨테이너 div
    const menuContainer = document.createElement('div');
    menuContainer.style.marginBottom = '1rem';

    // 메뉴 정보 article
    const menuArticle = document.createElement('article');
    menuArticle.id = 'menu';
    menuArticle.innerHTML = `
      <span class="left">${menu.menuName}</span>
      <span class="center">${menu.content}</span>
      <span class="right">${menu.price}원</span>
    `;

    // 수량 선택 UI
    const quantityUI = document.createElement('div');
    quantityUI.className = 'quantityUI';
    quantityUI.innerHTML = `
      <div style="display: flex;  align-items: center; height:100px; margin-top:0px">

        <div style="display: flex; gap: 0.5rem; align-items: center; margin : 0px auto 0px auto;">
          <button type="button" class="minusBtn">-</button>
          <input
            type="number"
            class="quantityInput"
            value="1"
            min="1"
            style="width:150px;text-align:center;font-size:1rem;"
          />
          <button type="button" class="plusBtn">+</button>
          <button type="button" class="addToCartBtn" style="width:150px;height:66px;">
            주문 담기
          </button>
        </div>
      </div>
    `;

    // (1) 메뉴(article)를 클릭하면 수량 UI를 토글
    menuArticle.addEventListener('click', () => {
      if (quantityUI.style.display === 'none' || !quantityUI.style.display) {
        quantityUI.style.display = 'block';
      } else {
        quantityUI.style.display = 'none';
      }
    });

    // (2) 수량 조절 / 주문 담기 이벤트
    setTimeout(() => {
      const minusBtn = quantityUI.querySelector('.minusBtn');
      const plusBtn = quantityUI.querySelector('.plusBtn');
      const quantityInput = quantityUI.querySelector('.quantityInput');
      const addToCartBtn = quantityUI.querySelector('.addToCartBtn');

      // 마이너스 버튼
      minusBtn.addEventListener('click', () => {
        let val = parseInt(quantityInput.value, 10);
        if (val > 1) {
          quantityInput.value = val - 1;
        }
      });

      // 플러스 버튼
      plusBtn.addEventListener('click', () => {
        let val = parseInt(quantityInput.value, 10);
        quantityInput.value = val + 1;
      });

      // 주문 담기 버튼
      addToCartBtn.addEventListener('click', () => {
        const count = parseInt(quantityInput.value, 10);
        // 합계 업데이트
        const subTotal = menu.price * count;
        totalPrice += subTotal;

        // 장바구니 배열에 push (필요 시 중복 체크/합산 로직 추가)
        cart.push({
          menuId: menu.menuId,
          restaurantId: menu.restaurantId,
          price: menu.price,
          count: count,
          subTotal: subTotal,
        });

        // 합계 UI 반영
        updateTotalPriceUI();

        alert(
          `${menu.menuName} ${count}개(${subTotal}원)를 장바구니에 담았습니다.`,
        );
      });
    });

    // (3) DOM 배치
    menuContainer.appendChild(menuArticle);
    menuContainer.appendChild(quantityUI);
    menusContainer.appendChild(menuContainer);
  });
}

// 총합 표시 부분 갱신
function updateTotalPriceUI() {
  const totalPriceLabel = document.getElementById('totalPriceLabel');
  totalPriceLabel.textContent = `합계: ${totalPrice}원`;
}

// “주문하기” 버튼 세팅
function setupPaymentButton() {
  const goPaymentBtn = document.getElementById('goPaymentBtn');

  goPaymentBtn.addEventListener('click', async () => {
    console.log('현재 장바구니:', cart);
    if (cart.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }

    try {
      const response = await fetch('/api/users/me/carts', {
        method: 'POST',
        credentials: 'include', // 쿠키 전송(세션/인증) 허용
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart, // => { cart: [...] } 형태로 전송
        }),
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
      }
      alert('서버에 장바구니 저장 완료!\n결제 화면으로 이동합니다.');

      window.location.href = '/cart.html';
    } catch (err) {
      console.error('주문 정보 등록 중 오류:', err);
      alert('주문 정보 등록 실패: ' + err.message);
    }
  });
}
