// API 호출 및 리뷰 목록 가져오기
async function fetchReviews(restaurantId) {
  try {
    const response = await fetch(
      `/api/users/me/restaurants/${restaurantId}/reviews`,
    );
    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }
    const data = await response.json();
    const reviews = data.data; // 'data' 속성에서 리뷰 배열 추출

    // 리뷰가 배열인지 확인
    if (!Array.isArray(reviews)) {
      throw new Error('리뷰 데이터가 배열이 아닙니다.');
    }

    displayReviews(reviews);
  } catch (error) {
    console.error('리뷰를 가져오는 중 오류 발생:', error);
  }
}

// 리뷰 목록을 HTML로 표시
function displayReviews(reviews) {
  const reviewsContainer = document.getElementById('reviewsContainer');
  reviewsContainer.innerHTML = ''; // 기존 내용 초기화

  reviews.forEach((review) => {
    const reviewElement = document.createElement('main');
    reviewElement.className = 'container';
    reviewElement.innerHTML = `
      <div class="reviewContainer">
          <article id="image">
              <img src="${review.media}" alt="Review Image" style="width: 100%; height: 100%;">
          </article>
      </div>
      <div class="content">
          <article id="star">${'★'.repeat(review.star)}</article>
          <article id="content">${review.content}</article>
      </div>
    `;
    reviewsContainer.appendChild(reviewElement);
  });
}

// 페이지 로드 시 리뷰 가져오기
window.onload = () => {
  const restaurantId = '1'; // 실제 음식점 ID로 변경
  fetchReviews(restaurantId);
};
