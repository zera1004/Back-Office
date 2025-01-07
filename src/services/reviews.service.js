import { ReviewsRepository } from '../repositories/reviews.repository';

export class ReviewsService {
  ReviewsRepository = new ReviewsRepository();
  // ReviewsRepository의 findAllPosts, createPost 메서드를 호출

  findAllPosts = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const reviews = await this.ReviewsRepository.findAllPosts();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    reviews.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    // 서비스 계층에서는 return posts.map(post => {}); 와 같이 데이터를 가공하는 작업이 이루어짐
    // 데이터를 그대로 전달하다 민감한 정보까지 노출되는 문제가 발생할 수 있기 때문에 가공
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

  findPostById = async (postId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const post = await this.postsRepository.findPostById(postId);

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  createPost = async (nickname, password, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createdPost = await this.postsRepository.createPost(
      nickname,
      password,
      title,
      content,
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createdPost.postId,
      nickname: createdPost.nickname,
      title: createdPost.title,
      content: createdPost.content,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  };

  updatePost = async (postId, password, title, content) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.postsRepository.updatePost(postId, password, title, content);

    // 변경된 데이터를 조회합니다.
    const updatedPost = await this.postsRepository.findPostById(postId);

    return {
      postId: updatedPost.postId,
      nickname: updatedPost.nickname,
      title: updatedPost.title,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  };

  deletePost = async (postId, password) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.postsRepository.deletePost(postId, password);

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };
}
