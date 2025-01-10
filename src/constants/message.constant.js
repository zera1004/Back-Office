import {
  MIN_PASSWORD_LENGTH,
  MIN_PHONE_LENGTH,
  MAX_PHONE_LENGTH,
} from './auth.constant.js';

export const MESSAGES = {
  AUTH: {
    COMMON: {
      EMAIL: {
        REQUIRED: '이메일을 입력해 주세요.',
        INVALID_FORMAT: '이메일 형식이 올바르지 않습니다.',
        DUPLICATED: '이미 가입 된 사용자입니다.',
        NONEXISTENT: '존재하지 않는 사용자입니다.',
      },
      PASSWORD: {
        REQUIRED: '비밀번호를 입력해 주세요.',
        MIN_LENGTH: `비밀번호는 ${MIN_PASSWORD_LENGTH}자리 이상이어야 합니다.`,
      },
      PASSWORD_CONFIRM: {
        REQUIRED: '비밀번호 확인을 입력해 주세요.',
        NOT_MACHTED_WITH_PASSWORD: '입력 한 두 비밀번호가 일치하지 않습니다.',
      },
      NAME: {
        REQUIRED: '이름을 입력해 주세요.',
      },
      PHONE: {
        REQUIRED: '전화번호를 입력해 주세요',
        LENGTH: `전화번호는 ${MIN_PHONE_LENGTH}이상 ${MAX_PHONE_LENGTH}이하의 길이를 입력해야 합니다.`,
        DUPLICATED: '이미 사용된 전화번호입니다.',
      },
      MEMBERTYPE: {
        WRONGTYPE: 'memberType을 customer과 owner에서 선택해주세요.',
      },
      EMAILVERIFICATION: {
        REQUIRED: '인증 코드를 입력해 주세요.',
        WORNGCODE: '이메일 코드가 일치하지 않습니다.',
        NOVERIFICATION: '이메일 인증을 완료해 주세요.',
      },
      UNAUTHORIZED: '인증 정보가 유효하지 않습니다.',
      JWT: {
        NO_TOKEN: '인증 정보가 없습니다.',
        NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
        EXPIRED: '인증 정보가 만료되었습니다.',
        NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
        INVALID: '인증 정보가 유효하지 않습니다.',
      },
    },
    SIGN_UP: {
      SUCCEED: '회원가입에 성공했습니다. 이메일 인증을 완료해 주세요.',
    },
    EMAIL_VERIFY: {
      SUCCEED: '이메일 인증에 성공하였습니다.',
    },
    LOG_IN: {
      SUCCEED: '로그인에 성공했습니다.',
    },
  },
  ADDRESS: {
    COMMON: {
      ADDRESS: {
        REQUIRED: '주소를 입력해 주세요',
      },
      ADDRESSNAME: {
        REQUIRED: '주소지 이름을 정해주세요',
      },
      NOT_FOUND: '주소가 존재하지 않습니다.',
      NOT_FOUND_USER: '유저가 존재하지 않습니다.',
    },
    CREATE: {
      SUCCEED: '주소 생성에 성공했습니다.',
      NO_BODY_DATA: '생성 할 정보를 입력해 주세요.',
    },
    READ_LIST: {
      SUCCEED: '주소 조회에 성공했습니다.',
      NO_BODY_DATA: '조회 할 정보를 입력해 주세요.',
    },
    UPDATE: {
      SUCCEED: '주소 수정에 성공했습니다.',
      NO_BODY_DATA: '수정 할 주소 ID를 입력해 주세요.',
    },
    DELETE: {
      SUCCEED: '주소 삭제에 성공했습니다.',
      NO_BODY_DATA: '삭제 할 주소 ID를 입력해 주세요.',
    },
  },
};
