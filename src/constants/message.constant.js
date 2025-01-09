// 메세지를 맵핑하는(키, 밸류, AUTH COMMON EMAIL REQUIRED) 객체를 내보내주고 있다.
export const MESSAGES = {
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
