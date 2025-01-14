// API 호출 및 리뷰 목록 가져오기
async function menuByRestaurant(restaurantId) {
  try {
    const response = await fetch(`/api/restaurnts/${restaurantId}/menus`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }
    console.log('응답 상태:', response.status);
    const data = await response.json();
    console.log('응답 데이터:', data);
    const menus = data.data; // 'data' 속성에서 리뷰 배열 추출
    console.log(menus);
    // 리뷰가 배열인지 확인
    if (!Array.isArray(menus)) {
      throw new Error('리뷰 데이터가 배열이 아닙니다.');
    }

    displayMenus(menus);
  } catch (error) {
    console.error('리뷰를 가져오는 중 오류 발생:', error);
  }
}

// 리뷰 목록을 HTML로 표시
function displayMenus(menus) {
  const menusContainer = document.getElementById('menusContainer');
  menusContainer.innerHTML = ''; // 기존 내용 초기화

  menus.forEach((menus) => {
    const menusElement = document.createElement('div');
    menusElement.className = 'menusContainer';

    menusElement.innerHTML = `
          <article id="menu">
    <span class="left">${menus.menuName}</span> <!-- 왼쪽 정렬 -->
    <span class="center">${menus.content}</span> <!-- 가운데 정렬 -->
    <span class="right">${menus.price}원</span> <!-- 오른쪽 정렬 -->
  </article>
      `;

    menusContainer.appendChild(menusElement);
  });
}

// 페이지 로드 시 리뷰 가져오기
window.onload = () => {
  const restaurantId = '25';
  menuByRestaurant(restaurantId);
};
