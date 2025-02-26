import { body } from "express-validator";

const userValidation = {
  register: [
    body("name")
      .exists().withMessage("Имя обязательно!")
      .isString().withMessage("Имя должно быть строкой!")
      .isLength({ min: 2 }).withMessage("Имя должно быть не менее 2 символов!"),
    body("email")
      .exists().withMessage("Email обязателен!")
      .trim()
      .toLowerCase()
      .isEmail().withMessage("Некорректный адрес электронной почты!"),
    body("password")
      .exists().withMessage("Пароль обязателен!")
      .isString().withMessage("Пароль должен быть строкой!")
      .isLength({ min: 8 }).withMessage("Пароль должен быть не менее 8 символов!")
  ],

  login: [
    body("email")
      .exists().withMessage("Email обязателен!")
      .trim()
      .toLowerCase()
      .isEmail().withMessage("Некорректный адрес электронной почты!"),
    body("password")
      .exists().withMessage("Пароль обязателен!")
      .isString().withMessage("Пароль должен быть строкой!")
  ],
  
  updateProfile: [
    body("name")
      .optional()
      .isString().withMessage("Имя должно быть строкой!")
      .isLength({ min: 2 }).withMessage("Имя должно быть не менее 2 символов!"),
    body("email")
      .optional()
      .trim()
      .toLowerCase()
      .isEmail().withMessage("Некорректный адрес электронной почты!"),
    body("password")
      .optional()
      .isString().withMessage("Пароль должен быть строкой!")
      .isLength({ min: 8 }).withMessage("Пароль должен быть не менее 8 символов!")
  ],

  adminLogin: [
    body("email")
      .exists().withMessage("Email обязателен!")
      .trim()
      .toLowerCase()
      .isEmail().withMessage("Некорректный адрес электронной почты!"),
    body("password")
      .exists().withMessage("Пароль обязателен!")
      .isString().withMessage("Пароль должен быть строкой!")
  ]
};

export default userValidation;