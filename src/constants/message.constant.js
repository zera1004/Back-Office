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
        ALREADYDONE: '이미 이메일 인증을 완료하였습니다.'
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
    DELETE_ID: {
      SUCCEED: '회원 탈퇴가 완료되었습니다.',
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
  RESTAURANT: {
    COMMON: {
      OWNER: {
        REQUIRED: '사장님을 찾을 수 없습니다.',
      },
    },
    CREATE: {
      SUCCEED: '업장 등록에 성공하였습니다!',
      NOT_FOUND_OWNER: '사장님을 찾을 수 없습니다.',
      ONE_RESTAURANT: '업장은 한개만 등록 가능합니다.',
    },
    READ_LIST: {
      SUCCEED: '업장을 조회하였습니다',
      NOT_FOUND_RESTAURANT: '업장을 찾을 수 없습니다.',
    },
    UPDATE: {
      SUCCEED: '업장이 수정되었습니다.',
      NOT_FOUND_RESTAURANT: '업장을 찾을 수 없습니다.',
      NOT_OWNER: '업장 등록자가 아닙니다',
    },
    DELETE: {
      SUCCEED: '업장이 삭제 되었습니다.',
      NOT_FOUND_RESTAURANT: '업장을 찾을 수 없습니다.',
      NOT_OWNER: '업장 등록자가 아닙니다',
    },
  },
  MENU: {
    CREATE: {
      SUCCEED: '메뉴등록이 완료되었습니다',
      NOT_FOUND_RESTAURANT: '레스토랑을 찾을 수 없습니다.',
    },
    READ_LIST: {
      SUCCEED: '메뉴를 조회하였습니다',
      NOT_FOUND_MENU: '메뉴를 찾을 수 없습니다.',
    },
    UPDATE: {
      SUCCEED: '메뉴가 수정되었습니다.',
      NOT_FOUND_MENU: '해당 레스토랑의 메뉴를 찾을 수 없습니다.',
    },
    DELETE: {
      SUCCEED: '메뉴가 삭제되었습니다.',
      NOT_FOUND_MENU: '해당 레스토랑의 메뉴를 찾을 수 없습니다.',
    },
  },
  REVIEW: {
    SERVICE: {
      NOT_FOUND_ERROR: '잘못된 요청입니다.',
      ERROR_RESTAURANT: 'Validation Error: restaurantId는 정수여야 합니다.',
      ERROR_USER: 'Validation Error: userId 정수여야 합니다.',
      ERROR_PAYMENT: 'Validation Error: userId, paymentId는 정수여야 합니다.',
      ERROR_ALL:
        'Validation Error: userId, restaurantId, paymentId는 정수여야 합니다.',
      NOT_FOUND_REVIEW: '작성한 리뷰가 없습니다.',
      NOT_FOUND: '존재하지 않는 리뷰입니다.',
      ERROR_FILED: '필수 필드가 누락되었습니다.',
      ONE_REVIEW: '결제별로 하나의 리뷰만 작성할 수 있습니다.',
      DATA_STAR: '별점은 1에서 5 사이여야 합니다.',
      DATA_LENGTH: '리뷰 내용은 10자 이상 100자 이하이어야 합니다.',
      USER_UPDATE: '본인의 리뷰만 수정할 수 있습니다.',
      USER_DELETE: '본인의 리뷰만 삭제할 수 있습니다.',
    },
    CREATE: {
      SUCCEED: '리뷰가 생성되었습니다.',
      NOT_FOUND_REVIEW: '리뷰 생성에 실패했습니다.',
    },
    READ_LIST: {
      NOT_FOUND_REVIEW: '잘못된 요청 입니다.',
    },
    UPDATE: {
      SUCCEED: '리뷰가 수정되었습니다.',
      NOT_FOUND_REVIEW: '리뷰 수정에 실패했습니다.',
    },
    DELETE: {
      SUCCEED: '리뷰가 삭제되었습니다.',
      NOT_FOUND_REVIEW: '리뷰 삭제에 실패했습니다.',
    },
  },
  PAYMENT: {
    READ_LIST: {
      SUCCEED: '결제 내역 조회 완료',
    },
    READ_LIST_POINT: {
      NOT_FOUND_RESTAURANT: 'RESTAURANT_NOT_FOUND',
      FAIL: '레스토랑을 찾을 수 없습니다.',
    },
  },
  ORDER: {
    SERVICE: {
      CREATE: {
        NOT_POINT: '음식을 주문하기 위한 포인트가 부족합니다.',
        NOT_ERROR: '주문 생성중 에러가 발생 담당자한테 문의할것',
      },
      DELETE: {
        NOT_FOUND: '주문을 찾을 수 없습니다.',
        NOT_ERROR: '주문 취소 중 오류가 발생 담당자한테 문의할것.',
      },
      CHECK: {
        READY: '준비중',
        GO: '배달중',
        FINISH: '배달완료',
        NOT_ERROR: '배달 상황을 확인하는 중 오류가 발생 담당자한테 문의할것.',
        NOT_KNOW: '알 수 없음',
      },
    },
    CREATE: {
      SUCCEED: '주문이 완료되었습니다(남은금액:',
    },
    DELETE: {
      SUCCEED: '주문이 취소되었습니다(환불금액:',
    },
    CHECK: {
      SUCCEED: '현재 배달상황은:',
    },
  },
  GETRESTAURANT: {
    RANK: {
      CONTROLLER: 'Controller ranking',
      NOT_FOUND: '매장 매출 정보가 존재하지 않습니다.',
      SUCCEED: '매출 상위 20위',
      ERROR_RANK: 'Error in ranking:',
      NOT_ERROR: '서버 내부 오류가 발생했습니다.',
    },
    BYTYPE: {
      TYPE: '컨트롤러 type',
      CONSOLE: 'Controller restaurantByType',
      NOT_FOUND: '선택한 타입의 매장 정보가 존재하지 않습니다',
      ERROR_TYPE: 'Error in restaurantByType:',
      NOT_ERROR: '서버 내부 오류가 발생했습니다.',
    },
    BYADDRESS: {
      CONSOLE: 'Controller restaurantByAddress',
      NOT_FOUND: '선택한 지역의 매장 정보가 존재하지 않습니다',
      ERROR_TYPE: 'Error in restaurantByType:',
      NOT_ERROR: '서버 내부 오류가 발생했습니다.',
    },
    ALL: {
      CONSOLE: 'Controller allRestaurant',
      NOT_FOUND: '매장 정보가 존재하지 않습니다.',
      ERROR_TYPE: 'Error in allRestaurant:',
      NOT_ERROR: '서버 내부 오류가 발생했습니다.',
    },
    SEARCH: {
      CONSOLE: 'Controller searchRestaurants',
      SEARCH_RESTAURANT: '검색어를 입력해 주세요.',
      NOT_FOUND: '일치하는 매장 정보가 존재하지 않습니다.',
      ERROR_TYPE: 'Error in searchRestaurants:',
      NOT_ERROR: '서버 내부 오류가 발생했습니다.',
    },
    DETAIL: {
      CONSOLE: 'Controller restaurantDetail',
      NOT_FOUND: '매장 정보가 존재하지 않습니다.',
      ERROR_TYPE: 'Error in restaurantDetail:',
      NOT_ERROR: '서버 내부 오류가 발생했습니다.',
    },
    SERVICE: {
      RANK: {
        CONSOLE: 'Service ranking',
      },
      BYADDRESS: {
        CONSOLE: 'Service restaurantByAddress',
      },
      BYTYPE: {
        TYPE: '서비스 type',
        CONSOLE: 'Service restaurantByType',
      },
      ALL: {
        CONSOLE: 'Service allRestaurant',
        ERROR_DATA: 'Invalid data format: expected an array of restaurants',
        ERROR_LENGTH: 'No restaurants available',
      },
      BYNAME: {
        CONSOLE: 'Service searchRestaurantsByName',
        ERROR_NAME: 'Invalid name keyword',
        ERROR_DATA: 'No restaurants found with the given name',
      },
      MENU: {
        CONSOLE: 'Service searchRestaurantsByMenu',
        ERROR_MENU: 'Invalid menu keyword',
        ERROR_DATA: 'No restaurants found with the given menu',
      },
      NAMEMENU: {
        CONSOLE: 'Service searchRestaurantsByMenu',
        ERROR_KEY: 'Invalid keyword',
        ERROR_DATA: 'No restaurants found with the given name, menu',
      },
      DETAIL: {
        CONSOLE: 'Service restaurantDetails',
        TYPE: '타입 : ',
        ERROR_ID: 'Invalid restaurant ID',
        ERROR_DATA: 'Restaurant not found',
      },
    },
  },
};
