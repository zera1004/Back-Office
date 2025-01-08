// 저장소 계층(Repository Layer)은 데이터 엑세스 계층(Data Access Layer)이라고도 불림
// 주로 데이터베이스와 관련된 작업을 처리하는 계층

// src/repositories/reviews.repository.js

import { prisma } from '../utils/prisma/index.js';

class ReviewsRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }
  // 음식점 별 리뷰 >> 일반적인 배달어플의 매장별로 모여있는 리뷰 조회
  findReviewByResId = async (restaurantId) => {
    const ResReviews = await this.#orm.review.findMany({
      where: { restaurantId: +restaurantId },
    });
    if (!ResReviews) {
      throw new Error('매장에 리뷰가 없습니다.');
    }
    return ResReviews;
  };

  // userId를 통해 내가 작성한 리뷰들 모두 조회
  findMyReviews = async (userId) => {
    const myReview = await this.#orm.review.findMany({
      where: { userId: +userId },
    });
    if (!myReview) {
      throw new Error('작성한 리뷰가 없습니다');
    }
    return review;
  };

  // 결제별로 하나만 있는 리뷰 조회
  findReviewByPayId = async (paymentId) => {
    const reviewByPay = await this.#orm.review.findUnique({
      where: { paymentId: +paymentId },
    });
    // 결제별 리뷰가 아직 작성되지 않았을 때
    if (!reviewByPay) {
      throw new Error('리뷰를 작성하세요!');
    }
    return reviewByPay;
  };

  // 추가할만한 메서드
  // 별점별 리뷰 조회 메서드 ex) 4점이상 리뷰, 5점 이상 리뷰
  // 리뷰 정렬 기능 > 최신순 조회 메서드, 별점순 조회 메서드 등
  // 음식점별 리뷰 통계 조회 메서드

  createReview = async (restaurantId, paymentId, userId, content, star) => {
    // 필수 필드 검증
    if (
      !restaurantId ||
      !paymentId ||
      !userId ||
      !content ||
      star === undefined
    ) {
      throw new Error('필수 필드가 누락되었습니다.');
    }

    // 별점 유효성 검증 >> 클라이언트에서 정해진 값만 넘어올수 있도록 하면 꼭 필요한 검증일까?
    // 데이터 변조를 방지하여 포함해야 하는가?
    if (star < 1 || star > 5) {
      throw new Error('별점은 1에서 5 사이여야 합니다.');
    }

    // 중복 리뷰 방지
    const existingReview = await this.#orm.review.findUnique({
      where: { paymentId: paymentId },
    });
    if (existingReview) {
      throw new Error('결제별로 하나의 리뷰만 작성할 수 있습니다.');
    }

    const createdReview = await this.#orm.review.create({
      data: {
        restaurantId: +restaurantId,
        paymentId: paymentId,
        userId: userId,
        content: content,
        star: +star,
      },
    });

    return createdReview;
  };

  updateReview = async (reviewId, content, star) => {
    // 리뷰 존재 여부 확인
    const review = await this.#orm.review.findUnique({
      where: { reviewId: parseInt(reviewId, 10) },
    });
    if (!review) {
      throw new Error('리뷰가 존재하지 않습니다.');
    }

    // 수정할 필드 검증
    if (!content && star === undefined) {
      throw new Error('수정할 내용을 입력해야 합니다.');
    }

    // 별점 유효성 검증
    if (star !== undefined && (star < 1 || star > 5)) {
      throw new Error('별점은 1에서 5 사이여야 합니다.');
    }

    const updatedReview = await this.#orm.review.update({
      where: {
        reviewId: parseInt(reviewId, 10),
      },
      data: {
        ...(content && { content }),
        ...(star && { star }),
      },
    });

    return updatedReview;
  };

  deleteReview = async (reviewId) => {
    const review = await this.#orm.review.findUnique({
      where: { reviewId: parseInt(reviewId, 10) },
    });
    if (!review) {
      throw new Error('삭제할 리뷰가 없습니다.');
    }

    const deletedReview = await this.#orm.review.delete({
      where: {
        reviewId: parseInt(reviewId, 10),
      },
    });

    return deletedReview;
  };
}

export default new ReviewsRepository(prisma);
