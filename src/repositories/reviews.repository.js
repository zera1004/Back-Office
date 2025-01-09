// src/repositories/reviews.repository.js
import { prisma } from '../utils/prisma/index.js';

class ReviewsRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  // 음식점 별 리뷰
  findALLReviewByRestaurantId = async (restaurantId) => {
    const resReviews = await this.#orm.review.findMany({
      where: { restaurantId },
    });

    return resReviews;
  };

  // 내 리뷰 조회 (userId로)
  findAllMyReviews = async (userId) => {
    const myReviews = await this.#orm.review.findMany({
      where: { userId },
    });

    return myReviews;
  };

  // 결제별로 하나만 있는 리뷰 조회 (결제 내역에 보이는 리뷰를 선택하여 상세하게 보려 한다면)
  findReviewByPayId = async (paymentId) => {
    const reviewByPay = await this.#orm.review.findUnique({
      where: { paymentId },
    });

    return reviewByPay;
  };

  // reviewId로 리뷰 찾기 (업데이트, 삭제 비즈니스 로직에 사용)
  findReviewByReviewId = async (reviewId) => {
    const reviewByReviewId = await this.#orm.review.findUnique({
      where: { reviewId },
    });
    return reviewByReviewId;
  };

  // 추가할만한 메서드
  // 별점별 리뷰 조회 메서드 ex) 4점이상 리뷰, 5점 이상 리뷰
  // 리뷰 정렬 기능 > 최신순 조회 메서드, 별점순 조회 메서드 등
  // 음식점별 리뷰 통계 조회 메서드

  createReview = async ({ restaurantId, paymentId, userId, content, star }) => {
    const createdReview = await this.#orm.review.create({
      data: {
        restaurantId: restaurantId,
        paymentId: paymentId,
        userId: userId,
        content: content,
        star: star,
      },
    });

    return createdReview;
  };
  // 내 리뷰 업데이트
  updateReview = async ({ reviewId, content, star }) => {
    const updatedReview = await this.#orm.review.update({
      where: {
        reviewId: reviewId,
      },
      data: {
        ...(content && { content }),
        ...(star && { star }),
      },
    });

    return updatedReview;
  };

  deleteReview = async (reviewId) => {
    const deletedReview = await this.#orm.review.delete({
      where: {
        reviewId,
      },
    });

    return deletedReview;
  };
}

export default new ReviewsRepository(prisma);
