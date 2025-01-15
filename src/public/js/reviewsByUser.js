// API 호출 및 리뷰 목록 가져오기
let currentReviewId = null; // 현재 수정할 리뷰 ID
let allReviews = []; // 전체 리뷰 데이터를 저장하는 전역 변수
let currentDeleteReviewId = null;

document.getElementById('confirmDeleteButton').addEventListener('click', () => {
  if (currentDeleteReviewId) {
    deleteReview(currentDeleteReviewId);
  }
});

function openDeleteModal(reviewId) {
  currentDeleteReviewId = reviewId; // 삭제할 리뷰 ID 저장
  document.getElementById('deleteModal').style.display = 'block';
}

function closeDeleteModal() {
  document.getElementById('deleteModal').style.display = 'none';
  currentDeleteReviewId = null; // 삭제할 리뷰 ID 초기화
}

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
    const uniqueRestaurantIds = [
      ...new Set(reviews.map((r) => r.restaurantId)),
    ];

    console.log('유니크한 restaurantIds:', uniqueRestaurantIds);

    const restaurantNames = {};
    await Promise.all(
      uniqueRestaurantIds.map(async (restaurantId) => {
        const response = await fetch(`/api/restaurantName/${restaurantId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(
            `레스토랑 이름을 가져오는 중 오류 발생: ${response.status}`,
          );
        }

        const data = await response.json();
        console.log(`레스토랑 ID ${restaurantId}의 API 응답 데이터:`, data);

        restaurantNames[restaurantId] = data.data.restaurantName || 'Unknown';
      }),
    );

    console.log('restaurantNames 객체:', restaurantNames);

    const reviewsWithNames = reviews.map((review) => ({
      ...review,
      restaurantName:
        restaurantNames[review.restaurantId] || 'Unknown RestaurantName',
    }));

    console.log('reviewsWithNames 데이터:', reviewsWithNames);

    displayReviews(reviewsWithNames);
  } catch (error) {
    console.error('레스토랑 이름을 가져오는 중 오류 발생:', error);
  }
}

function displayReviews(reviews) {
  const reviewsContainer = document.getElementById('reviewsContainer');
  reviewsContainer.innerHTML = '';

  reviews.forEach((review) => {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'reviewsContainer';

    const restaurantName = review.restaurantName || 'Restaurant Name';
    const createdAt = new Date(review.createdAt).toLocaleDateString();

    reviewElement.innerHTML = `
       <main class="container">
        <article id="title">${restaurantName}, ${createdAt}</article>
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
              <button id="button" onclick="openDeleteModal(${review.reviewId})">삭제</button>
             </div>
        </div>
      </main>
    `;

    reviewsContainer.appendChild(reviewElement);
  });
}

function editReview(reviewId) {
  currentReviewId = reviewId;

  const review = allReviews.find((r) => r.reviewId === reviewId);
  console.log(review);
  if (!review) {
    console.error('리뷰를 찾을 수 없습니다.');
    return;
  }

  document.getElementById('editContent').value = review.content;
  document.getElementById('editStar').value = review.star;

  document.getElementById('editModal').style.display = 'block';
}

function saveReview() {
  const content = document.getElementById('editContent').value;
  const star = document.getElementById('editStar').value;

  const reviewIndex = allReviews.findIndex(
    (r) => r.reviewId === currentReviewId,
  );

  if (reviewIndex === -1) {
    console.error('수정할 리뷰를 찾을 수 없습니다.');
    return;
  }

  allReviews[reviewIndex] = {
    ...allReviews[reviewIndex],
    content: content,
    star: star,
  };

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

      displayReviews(allReviews);

      closeModal();
    })
    .catch((error) => {
      console.error('리뷰 수정 중 오류 발생:', error);
    });
}

async function deleteReview(reviewId) {
  try {
    const response = await fetch(`/api/users/me/reviews/${reviewId}`, {
      method: 'DELETE',
      credentials: 'include', // 쿠키 전송 허용
    });

    if (!response.ok) {
      throw new Error('리뷰 삭제에 실패했습니다.');
    }

    // 서버에서 삭제 성공 시 전역 변수 및 화면 갱신
    allReviews = allReviews.filter((review) => review.reviewId !== reviewId);
    displayReviews(allReviews);

    console.log(`리뷰 ID ${reviewId} 삭제 성공`);
  } catch (error) {
    console.error('리뷰 삭제 중 오류 발생:', error);
  } finally {
    closeDeleteModal();
  }
}

window.onload = async () => {
  try {
    await userReviews();
    await getRestaurantName(allReviews);
  } catch (error) {
    console.error('페이지 로드 중 오류 발생:', error);
  }
};
