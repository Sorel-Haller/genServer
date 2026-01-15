import AuthenticationError from "../utils/AuthenticatinError.js"
import AppError from "./AppError.js"

class AuthenticationError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

export default AuthentificationError;
