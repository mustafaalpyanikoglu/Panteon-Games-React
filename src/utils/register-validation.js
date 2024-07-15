import appMessages from "../constants/app-messages";

export default class RegisterValidation {
  static validateRegisterForm(username, email, password) {
    let isValid = true;

    if (!email) {
      return { valid: false, message: appMessages.EMAIL_REQUIRED };
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return { valid: false, message: appMessages.EMAIL_INVALID };
    }

    if (!username) {
      return { valid: false, message: appMessages.USERNAME_REQUIRED };
    } else if (username.length < 3) {
      return { valid: false, message: appMessages.USERNAME_MIN_LENGTH };
    }

    if (!password) {
      return { valid: false, message: appMessages.PASSWORD_REQUIRED };
    } else if (password.length < 6) {
      return { valid: false, message: appMessages.PASSWORD_MIN_LENGTH };
    } else if (!/[A-Z]/.test(password)) {
      return { valid: false, message: appMessages.PASSWORD_UPPERCASE };
    } else if (!/[a-z]/.test(password)) {
      return { valid: false, message: appMessages.PASSWORD_LOWERCASE };
    } else if (!/\d/.test(password)) {
      return { valid: false, message: appMessages.PASSWORD_NUMBER };
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { valid: false, message: appMessages.PASSWORD_SPECIAL_CHAR };
    }

    return { valid: true };
  }

  static validateLoginForm(username, password) {
    if (!username || !password) {
      return { valid: false, message: appMessages.USERNAME_REQUIRED };
    }
    return { valid: true };
  }
}
