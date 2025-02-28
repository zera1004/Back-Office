import { prisma } from '../utils/prisma/index.js';

class AuthRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  // email로 손님 검색
  findCustomer = async (email) => {
    return await this.#orm.user.findUnique({ where: { email } });
  };

  // id로 손님 검색
  findCustomerId = async (id) => {
    return await this.#orm.user.findUnique({ where: { userId: +id } });
  };

  // 손님 회원가입
  signUpCustomer = async ({
    email,
    password,
    name,
    phoneNumber,
    verificationCode,
  }) => {
    return await this.#orm.user.create({
      data: {
        email,
        password,
        name,
        phoneNumber,
        point: 1000000,
        isVerified: false,
        verificationCode,
      },
    });
  };

  // eail로 사장님 검색
  findOwner = async (email) => {
    return await this.#orm.owner.findUnique({ where: { email } });
  };

  // id로 사장님 검색
  findOwnerId = async (id) => {
    return await this.#orm.owner.findUnique({ where: { ownerId: +id } });
  };

  // 사장님 회원가입
  signUpOwner = async ({
    email,
    password,
    name,
    phoneNumber,
    verificationCode,
  }) => {
    return await this.#orm.owner.create({
      data: {
        email,
        password,
        name,
        phoneNumber,
        point: 0,
        isVerified: false,
        verificationCode,
      },
    });
  };

  // 손님 이메일 인증 성공
  emailVerifyCustomer = async (email) => {
    return await this.#orm.user.update({
      where: { email },
      data: {
        isVerified: true,
      },
    });
  };

  // 손님 장바구니 생성
  makeCustomerCart = async (userId) => {
    return await this.#orm.cart.create({
      data: { userId },
    });
  };

  // 사장님 이메일 인증 성공
  emailVerifyOwner = async (email) => {
    return await this.#orm.owner.update({
      where: { email },
      data: {
        isVerified: true,
      },
    });
  };

  // 손님 회원 탈퇴
  deleteCustomerId = async (email) => {
    return await this.#orm.user.delete({
      where: { email },
    });
  };

  // 사장님 회원 탈퇴
  deleteOwnerId = async (email) => {
    return await this.#orm.owner.delete({
      where: { email },
    });
  };

  // 회원 정보 수정
  updateProfile = async (email, updateData) => {
    return await this.#orm.user.update({
      where: { email },
      data: updateData,
    });
  };
}

export default new AuthRepository(prisma);
