import ReviewsController from '../controllers/reviews.controller.js';
import express from 'express';
import { reviewsUploader } from '..//middlewares/s3uploader.middleware.js';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';

const router = express.Router();

// 음식점 별 리뷰 (인증 X)
router.get(
  '/users/me/restaurants/:restaurantId/reviews',
  ReviewsController.findALLReviewByRestaurantId,
);
// 내 리뷰 전체 조회 (인증 O)
// router.get('/', requireAccessToken, ReviewsController.findAllMyReviews);
// 결제id로 리뷰 조회 (인증 O)
// router.get('/:resumeId', ReviewsController.findReviewByPayId);
// 리뷰 생성 (인증 O)
router.post(
  '/users/me/restaurants/:restaurantId/reviews',
  requireAccessToken,
  reviewsUploader.single('media'),
  ReviewsController.createReview,
);
// 리뷰 수정 (인증 O)
router.put(
  '/users/me/restaurants/:restaurantId/reviews/:reviewId',
  ReviewsController.updateReview,
);
// 리뷰 삭제 (인증 O)
router.delete(
  '/users/me/restaurants/:restaurantId/reviews/:reviewId',
  ReviewsController.deleteReview,
);

export default router;
