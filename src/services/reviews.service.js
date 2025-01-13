// src/services/reviews.service.js
import ReviewsRepository from '../repositories/reviews.repository.js';

class ReviewsService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }
  // 음식점별 리뷰
  // data : restaurantId
  findALLReviewByRestaurantId = async (data) => {
    if (!Number.isInteger(data.restaurantId)) {
      // 로그에 오류 기록
      console.error('Validation Error: restaurantId는 정수여야 합니다.', {
        restaurantId: data.restaurantId,
      });
      throw new Error('잘못된 요청입니다.');
    }

    // 저장소(Repository)에게 데이터를 요청합니다.
    const reviews = await this.#repository.findALLReviewByRestaurantId(
      data.restaurantId,
    );

    if (!reviews) {
      throw new Error('매장에 리뷰가 없습니다.');
    }

    // 호출한 reviews를 가장 최신 게시글 부터 정렬합니다.
    reviews.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    // 서비스 계층에서는 return posts.map(post => {}); 와 같이 데이터를 가공하는 작업이 이루어짐
    // 데이터를 그대로 전달하다 민감한 정보까지 노출되는 문제가 발생할 수 있기 때문에 가공
    return reviews.map((review) => {
      return {
        // 클라이언트에서 어떻게 쓰일지 몰라 일단 다 보내는 중
        restaurantId: review.restaurantId,
        paymentId: review.paymentId,
        userId: review.userId,
        content: review.content,
        createdAt: review.createdAt,
      };
    });
  };

  // 내 모든 리뷰
  // data : userId
  findAllMyReviews = async (data) => {
    if (!Number.isInteger(data.userId)) {
      console.error('Validation Error: userId 정수여야 합니다.', {
        userId: data.userId,
      });
      throw new Error('잘못된 요청입니다.');
    }
    // 저장소(Repository)에게 데이터를 요청합니다.
    const reviews = await this.#repository.findAllMyReviews(data.userId);

    // 본인의 리뷰만 조회 가능
    if (reviews.userId !== data.userId) throw new Error('잘못된 요청입니다.');

    reviews.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    if (!reviews) {
      throw new Error('작성한 리뷰가 없습니다.');
    }

    return reviews.map((review) => {
      return {
        restaurantId: review.restaurantId,
        paymentId: review.paymentId,
        userId: review.userId,
        content: review.content,
        createdAt: review.createdAt,
      };
    });
  };

  // 결제별 리뷰
  // data : paymentId,userId
  findReviewByPayId = async (data) => {
    if (!Number.isInteger(data.userId) || !Number.isInteger(data.paymentId)) {
      console.error('Validation Error: userId, paymentId는 정수여야 합니다.', {
        userId: data.userId,
        paymentId: data.paymentId,
      });
      throw new Error('잘못된 요청입니다.');
    }
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const reviews = await this.#repository.findReviewByPayId(data.paymentId);

    if (!reviews) {
      throw new Error('작성한 리뷰가 없습니다.');
    }
    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  // 리뷰 생성
  // data : restaurantId: paymentId, userId, content, star
  createReview = async (data) => {
    if (
      !data.restaurantId ||
      !data.paymentId ||
      !data.userId ||
      !data.content ||
      data.star === null
    )
      throw new Error('필수 필드가 누락되었습니다.');

    const existingReview = await this.#repository.findReviewByPayId(
      data.paymentId,
    );
    if (existingReview)
      throw new Error('결제별로 하나의 리뷰만 작성할 수 있습니다.');

    if (data.star < 1 || data.star > 5)
      throw new Error('별점은 1에서 5 사이여야 합니다.');

    if (data.content.length < 10 || data.content.length > 100)
      throw new Error('리뷰 내용은 10자 이상 100자 이하이어야 합니다.');

    if (
      !Number.isInteger(data.userId) ||
      !Number.isInteger(data.restaurantId) ||
      !Number.isInteger(data.paymentId)
    ) {
      // 로그에 오류 기록
      console.error(
        'Validation Error: userId, restaurantId, paymentId는 정수여야 합니다.',
        {
          userId: data.userId,
          restaurantId: data.restaurantId,
          paymentId: data.paymentId,
        },
      );

      // 클라이언트에게는 일반적인 오류 메시지 반환
      throw new Error('잘못된 요청입니다.');
    }

    // 저장소에 요청
    return await this.#repository.createReview(data);
  };

  // 리뷰 수정
  // data : reviewId, userId, content, star
  updateReview = async (data) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const review = await this.#repository.findReviewByReviewId(data.reviewId);
    if (!review) throw new Error('존재하지 않는 리뷰입니다.');

    if (review.userId !== data.userId)
      throw new Error('본인의 리뷰만 수정할 수 있습니다.');

    if (data.star < 1 || data.star > 5)
      throw new Error('별점은 1에서 5 사이여야 합니다.');

    if (data.content.length < 10 || data.content.length > 100)
      throw new Error('리뷰 내용은 10자 이상 100자 이하이어야 합니다.');

    // 저장소에 요청
    await this.#repository.updateReview(data);
  };

  // 리뷰 삭제
  // data : reviewId, userId
  deleteReview = async (data) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const review = await this.#repository.findReviewByReviewId(data.reviewId);
    if (!review) throw new Error('이미 존재하지 않는 리뷰입니다.');

    if (review.userId !== data.userId)
      throw new Error('본인의 리뷰만 삭제할 수 있습니다.');

    // 저장소에 요청
    await this.#repository.deleteReview(data.reviewId);
  };
}

export default new ReviewsService(ReviewsRepository);
