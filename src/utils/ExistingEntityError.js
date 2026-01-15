import AppError from "./AppError.js"

class ExistsingEntityError extends AppError {
  constructor(message) {
    super(message, 401);

  }
}

export default ExistingEntityError;

