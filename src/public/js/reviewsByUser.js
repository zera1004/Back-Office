// API 호출 및 리뷰 목록 가져오기
let currentReviewId = null; // 현재 수정할 리뷰 ID
let allReviews = []; // 전체 리뷰 데이터를 저장하는 전역 변수

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

async function userReviews() {
  try {
    const response = await fetch('/api/users/me/reviews', {
      method: 'GET',
      credentials: 'include', // 쿠키 전송 허용
    });

    if (!response.ok) {
      throw new Error('네트워크 응답이 좋지 않습니다.');
    }

    console.log('응답 상태:', response.status);
    const data = await response.json();
    console.log('userReviews API 응답 데이터:', data);
    const reviews = data.data; // 'data' 속성에서 리뷰 배열 추출

    if (!Array.isArray(reviews)) {
      throw new Error('리뷰 데이터가 배열이 아닙니다.');
    }

    allReviews = reviews; // 전역 변수에 저장
  } catch (error) {
    console.error('리뷰를 가져오는 중 오류 발생:', error);
  }
}

async function getRestaurantName(reviews) {
  try {
    // restaurantId 중복 제거
    const uniqueRestaurantIds = [
      ...new Set(reviews.map((r) => r.restaurantId)),
    ];

    console.log('유니크한 restaurantIds:', uniqueRestaurantIds);

    // 각 restaurantId에 대해 이름 가져오기
    const restaurantNames = {};
    await Promise.all(
      uniqueRestaurantIds.map(async (restaurantId) => {
        const response = await fetch(`/api/restaurantName/${restaurantId}`, {
          method: 'GET',
          credentials: 'include', // 쿠키 전송 허용
        });

        if (!response.ok) {
          throw new Error(
            `레스토랑 이름을 가져오는 중 오류 발생: ${response.status}`,
          );
        }

        const data = await response.json();
        console.log(`레스토랑 ID ${restaurantId}의 API 응답 데이터:`, data);

        // restaurantNames에 저장
        restaurantNames[restaurantId] = data.data.restaurantName || 'Unknown';
        console.log(restaurantNames[1]);
      }),
    );

    console.log('restaurantNames 객체:', restaurantNames);

    // 리뷰 데이터에 restaurantName 추가
    const reviewsWithNames = reviews.map((review) => ({
      ...review,
      restaurantName:
        restaurantNames[review.restaurantId] || 'Unknown RestaurantName',
    }));

    console.log('reviewsWithNames 데이터:', reviewsWithNames);

    // 업데이트된 리뷰 데이터 표시
    displayReviews(reviewsWithNames);
  } catch (error) {
    console.error('레스토랑 이름을 가져오는 중 오류 발생:', error);
  }
}

// 리뷰 목록을 HTML로 표시
function displayReviews(reviews) {
  const reviewsContainer = document.getElementById('reviewsContainer');
  reviewsContainer.innerHTML = ''; // 기존 내용 초기화

  reviews.forEach((review) => {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'reviewsContainer';

    // Restaurant Name과 createdAt 정보 표시
    const restaurantName = review.restaurantName || 'Restaurant Name';
    const createdAt = new Date(review.createdAt).toLocaleDateString(); // 날짜 포맷 (필요에 따라 수정)

    reviewElement.innerHTML = `
       <main class="container">
        <article id="title">${restaurantName}, ${createdAt}</article> <!-- Restaurant Name과 createdAt 동적 표시 -->
        <div class="review">
          <div class="reviewContainer">
            <article id="image">
              <img src="${review.media || 'default-image.jpg'}" alt="Review Image" style="width: 100%; height: 100%;">
            </article>
            </div>
            <div class="content">
             <article id="star">${'★'.repeat(Number(review.star))}</article>
             <article id="content">${review.content}</article>
             </div>
            <div class="button">
              <button id="button" onclick="reorder(${review.reviewId})">재주문</button>
              <button id="button" onclick="editReview(${review.reviewId})">수정</button>
              <button id="button" onclick="deleteReview(${review.reviewId})">삭제</button>
             </div>
        </div>
      </main>
    `;

    reviewsContainer.appendChild(reviewElement);
  });
}

// 수정 버튼 클릭 시 모달 열기
function editReview(reviewId) {
  currentReviewId = reviewId; // 수정할 리뷰 ID 저장

  // 전역 변수에서 해당 리뷰 데이터를 검색
  const review = allReviews.find((r) => r.reviewId === reviewId);
  console.log(review);
  if (!review) {
    console.error('리뷰를 찾을 수 없습니다.');
    return;
  }

  // 기존 리뷰 데이터 채우기
  document.getElementById('editContent').value = review.content;
  document.getElementById('editStar').value = review.star; // 별점 설정

  // 모달 창 열기
  document.getElementById('editModal').style.display = 'block';
}

function saveReview() {
  const content = document.getElementById('editContent').value;
  const star = document.getElementById('editStar').value;

  // 전역 변수에서 수정 대상 리뷰 데이터 업데이트
  const reviewIndex = allReviews.findIndex(
    (r) => r.reviewId === currentReviewId,
  );

  if (reviewIndex === -1) {
    console.error('수정할 리뷰를 찾을 수 없습니다.');
    return;
  }

  // 업데이트된 데이터
  allReviews[reviewIndex] = {
    ...allReviews[reviewIndex],
    content: content,
    star: star,
  };

  // 서버에 수정된 데이터 전송
  fetch(`/api/users/me/reviews/${currentReviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content,
      star: star,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('리뷰 수정에 실패했습니다.');
      }
      return response.json();
    })
    .then(() => {
      console.log('수정 성공');

      // 수정된 데이터로 화면 갱신
      displayReviews(allReviews);
      console.log('전송 데이터:', {
        content: content,
        star: parseInt(star, 10),
      });

      // 모달 창 닫기
      closeModal();
    })
    .catch((error) => {
      console.error('리뷰 수정 중 오류 발생:', error);
    });
}

// 페이지 로드 시 리뷰 가져오기
window.onload = async () => {
  try {
    // 1. 리뷰 데이터 로드
    await userReviews();

    // 2. 레스토랑 이름 로드 및 리뷰 데이터 표시
    await getRestaurantName(allReviews);
  } catch (error) {
    console.error('페이지 로드 중 오류 발생:', error);
  }
};
