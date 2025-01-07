import express from 'express';
import { prisma } from '../uts/prisma/index.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post(
  '/users/me/restaurants/:restaurantId/reviews',
  authMiddleware,
  async (req, res, next) => {
    try {
      // 주문, 결제 중 어디와 연결되는지 몰라 일단 테이블 상 컬럼에 있는 paymentId 받아옴
      // 클라이언트에서 paymentId 전달 필요 (주문 내역 마다 있는 리뷰 등록 버튼 클릭 시)
      const { paymentId, content, star } = req.body;
      const { restaurantId } = req.params;
      const { userId } = req.user;

      const newRiview = await prisma.review.create({
        data: {
          restaurantId: +restaurantId,
          paymentId: paymentId,
          userId: userId,
          content: content,
          star: +star,
        },
      });

      return res
        .status(201)
        .json({ message: '리뷰가 생성되었습니다.', data: newRiview });
    } catch (error) {
      next(error); // 에러를 다음 핸들러로 전달
    }
  },
);

// 특정 가계의 리뷰 전체 조회
router.get(
  '/users/me/restaurants/:restaurantId/reviews',
  async (req, res, next) => {
    const { restaurantId } = req.params;

    const getReviews = await prisma.review.findUnique({
      where: { restaurantId: parseInt(restaurantId, 10) }, // ID로 게시글 검색
      select: {
        reviews: true,
        restaurantId: true,
        paymentId: true,
        content: true,
        star: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ data: getReviews });
  },
);

router.get('/post/select/:postId', async (req, res, next) => {
  const { postId } = req.params; // 조회할 게시글의 ID
  try {
    const post = await prisma.posts.findUnique({
      where: { postId: parseInt(postId, 10) }, // ID로 게시글 검색
      include: {
        profile: {
          select: {
            lolNickname: true,
            tier: true,
            line: true,
            user: {
              select: {
                nickname: true, // 닉네임 포함
              },
            },
          },
        },
      },
      select: {
        title: true,
        postImage: true,
        likeCount: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }
    // 결과 데이터에 닉네임 추가
    const result = {
      nickname: post.profile.user.nickname,
      title: post.title,
      postImage: post.postImage,
      likeCount: post.likeCount,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
    return res
      .status(200)
      .json({ message: '게시글이 조회되었습니다.', data: result });
  } catch (error) {
    console.error('게시글 조회 오류:', error);
    next(error); // 에러를 다음 핸들러로 전달
  }
});

// 내 리뷰 수정
router.patch(
  '/users/me/restaurants/:restaurantId/reviews/:reviewId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { restaurantId, reviewId } = req.params;
      const { paymentId, content, star } = req.body; // 수정할 데이터

      // 게시글 업데이트
      const updatedReview = await prisma.review.update({
        where: {
          reviewId: parseInt(reviewId, 10),
          restaurantId: parseInt(restaurantId, 10),
        },
        data: {
          ...(content && { content }),
          ...(star && { star }),
        },
      });

      return res
        .status(200)
        .json({ message: '게시글이 수정되었습니다.', data: updatedReview });
    } catch (error) {
      next(error); // 에러를 다음 핸들러로 전달
    }
  },
);

// 리뷰 삭제
router.delete(
  '/users/me/restaurants/:restaurantId/reviews/:reviewId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { restaurantId, reviewId } = req.params;

      // 리뷰 존재 확인
      const isReview = await prisma.review.findUnique({
        where: {
          reviewId: parseInt(reviewId, 10),
          restaurantId: parseInt(restaurantId, 10),
        },
      });

      if (!isReview) {
        return res.status(404).json({ message: '리뷰가 존재하지 않습니다.' });
      }

      // 게시글 삭제
      await prisma.review.delete({
        reviewId: parseInt(reviewId, 10),
        restaurantId: parseInt(restaurantId, 10),
      });

      return res.status(200).json({ message: '리뷰가 삭제되었습니다.' });
    } catch (error) {
      next(error); // 에러를 다음 핸들러로 전달
    }
  },
);

export default router;
