import Joi from 'joi';

const schema = Joi.object({
  address: Joi.string().required().messages({
    'any.required': '주소를 입력해주세요', // 'any.required'로 메시지 정의
    'string.empty': '주소를 입력해주세요', // 빈 문자열인 경우에 대한 처리도 추가
  }),
  phoneNumber: Joi.string()
    .pattern(/^(01[016789]{1})-(\d{3,4})-(\d{4})$/) // 전화번호 형식 검증
    .min(10) // 최소 10자
    .max(13) // 최대 13자
    .required()
    .messages({
      'string.pattern.base':
        '유효한 전화번호를 입력해주세요 (예: 010-0000-0000)',
      'any.required': '전화번호를 입력해주세요',
      'string.empty': '전화번호를 입력해주세요',
      'string.min': '전화번호는 최소 10자 이상이어야 합니다',
      'string.max': '전화번호는 최대 13자까지 입력 가능합니다',
    }),
  restaurantName: Joi.string().min(1).max(20).required().messages({
    'any.required': '업장 이름을 입력해주세요',
    'string.empty': '업장 이름을 입력해주세요',
    'string.min': '업장 이름은 최소 1자 이상이어야 합니다',
    'string.max': '업장 이름은 최대 20자까지 입력 가능합니다',
  }),
  restaurantType: Joi.string().required().messages({
    'any.required': '업장 분류를 입력해주세요',
  }),
}).unknown(true);

export const createRestaurantValidator = async (req, res, next) => {
  try {
    // Joi 스키마 유효성 검사를 비동기적으로 진행
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    // Joi 검증 오류가 발생한 경우, 에러 메시지를 하나만 반환
    const errorMessage = err.details[0].message;

    // 단일 에러 메시지만 응답
    res.status(HTTP_STATUS.BAD_REQUEST).json(errorMessage);
  }
};
