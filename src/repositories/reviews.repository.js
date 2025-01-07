// 저장소 계층(Repository Layer)은 데이터 엑세스 계층(Data Access Layer)이라고도 불림
// 주로 데이터베이스와 관련된 작업을 처리하는 계층

// src/repositories/reviews.repository.js

import { prisma } from '../utils/prisma/index.js';

export class PostsRepository {
  findAllReviews = async () => {
    // ORM인 Prisma에서 review 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const reviews = await prisma.review.findMany();

    return reviews;
  };

  findReviewById = async (reviewId) => {
    // ORM인 Prisma에서 review 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const review = await prisma.review.findUnique({
      where: { reviewId: +reviewId }, // 수정 필요
    });

    return review;
  };

  createReview = async (restaurantId, paymentId, userId, content, star) => {
    // ORM인 Prisma에서 review 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdReview = await prisma.review.create({
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
    // ORM인 Prisma에서 review 모델의 update 메서드를 사용해 데이터를 수정합니다.
    const updatedReview = await prisma.review.update({
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
    // ORM인 Prisma에서 review 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
    const deletedReview = await prisma.review.delete({
      where: {
        reviewId: parseInt(reviewId, 10),
      },
    });

    return deletedReview;
  };
}
