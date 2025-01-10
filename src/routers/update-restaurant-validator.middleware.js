import Joi from 'joi';

const schema = Joi.object({
  address: Joi.string().optional().messages({
    'string.empty': '주소를 입력해주세요',
  }),
  phoneNumber: Joi.string()
    .pattern(/^(01[016789]{1})-(\d{3,4})-(\d{4})$/)
    .optional() // optional() 사용, 값이 없으면 검증하지 않음
    .messages({
      'string.pattern.base':
        '유효한 전화번호를 입력해주세요 (예: 010-0000-0000)',
    }),
  restaurantName: Joi.string().min(1).max(20).optional().messages({
    'string.min': '업장 이름은 최소 1자 이상이어야 합니다',
    'string.max': '업장 이름은 최대 20자까지 입력 가능합니다',
  }),
  restaurantType: Joi.string().optional().messages({
    'string.empty': '업장 분류를 입력해주세요',
  }),
}).unknown(true); // 추가적인 필드가 있어도 무시

export const updateRestaurantValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    const errorMessage = err.details[0].message;
    res.status(400).json(errorMessage);
  }
};
