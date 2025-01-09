// src/services/reviews.service.js
import ReviewsService from '../services/reviews.service.js';
// 데이터 타입 확인, 필수 필드확인은 보통 컨트롤러
class ReviewsController {
  #service;

  constructor(service) {
    this.#service = service;
  }
  // 음식점 별 리뷰 (인증 X)
  findALLReviewByRestaurantId = async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const AllReviewsByRestaurant =
        await this.#service.findALLReviewByRestaurantId({
          restaurantId: +restaurantId,
        });

      return res.status(201).json({ data: AllReviewsByRestaurant });
    } catch (error) {
      return res.status(400).json({ message: '잘못된 요청 입니다.' });
    }
  };

  // 내 리뷰 전체 조회 (인증 O)
  findAllMyReviews = async (req, res) => {
    const userId = req.user;
    try {
      const AllMyReviews = await this.#service.findAllMyReviews({
        userId: userId,
      });

      return res.status(201).json({ data: AllMyReviews });
    } catch (error) {
      return res.status(400).json({ message: '잘못된 요청 입니다.' });
    }
  };

  // 결제id로 리뷰 조회 (인증 O)
  findReviewByPayId = async (req, res) => {
    const { paymentId } = req.params;
    const userId = req.user;
    try {
      const ReviewByPayId = await this.#service.findReviewByPayId({
        paymentId: +paymentId,
        userId: userId,
      });

      return res.status(201).json({ data: ReviewByPayId });
    } catch (error) {
      return res.status(400).json({ message: '잘못된 요청 입니다.' });
    }
  };

  // 리뷰 생성 (인증 O)
  createReview = async (req, res) => {
    // Client로 부터 받은 데이터를 가공
    const { content, star } = req.body;
    // 파라미터로 부터 받은 데이터
    // const { restaurantId, paymentId } = req.params;
    const { restaurantId } = req.params;
    // 인증 미들웨어에서 받은 유저 정보
    // const userId = req.user;

    // 테스트용 //
    const userId = 10;
    const paymentId = 3;
    // 테스틍용
    try {
      await this.#service.createReview({
        restaurantId: +restaurantId,
        paymentId: +paymentId,
        userId,
        content,
        star,
      });
      return res.status(201).json({ message: '리뷰가 생성되었습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: '리뷰 생성에 실패했습니다.' });
    }
  };

  // 리뷰 업데이트 (인증 O)
  updateReview = async (req, res) => {
    // Client로 부터 받은 데이터를 가공
    const { content, star } = req.body;
    // 파라미터로 부터 받은 데이터
    // const { reviewId } = req.params;
    // 인증 미들웨어에서 받은 유저 정보
    // const userId = req.user;

    // 테스트 용
    const reviewId = 4;
    const userId = 10;
    // 테스트 용

    // ReviewsService를 이용하여 게시글 생성 요청
    try {
      await this.#service.updateReview({
        reviewId: +reviewId,
        userId,
        content,
        star,
      });
      return res.status(201).json({ message: '리뷰가 수정되었습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: '리뷰 수정에 실패했습니다.' });
    }
  };

  // 리뷰 삭제 (인증 O)
  deleteReview = async (req, res) => {
    // 파라미터로 부터 받은 데이터
    // const { reviewId } = req.params;
    // 인증 미들웨어에서 받은 유저 정보
    // const userId = req.user;

    // 테스트 용
    const reviewId = 4;
    const userId = 10;
    // 테스트 용

    // PostService를 이용하여 게시글 생성 요청
    try {
      await this.#service.deleteReview({
        reviewId: +reviewId,
        userId,
      });

      // PostService가 반환한 결과를 Client에게 전달
      return res.status(201).json({ message: '리뷰가 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: '리뷰 삭제에 실패했습니다.' });
    }
  };
}

export default new ReviewsController(ReviewsService);
