class NotFoundError extends Error {
  public status: number;

  constructor(message: string = "Data not found") {
    super(message);
    this.status = 404;
    this.message = message;
  }
}

class InternalServerError extends Error {
  public status: number;

  constructor(message: string = "Internal server error") {
    super(message);
    this.status = 500;
    this.message = message;
  }
}

class BadRequestError extends Error {
  public status: number;

  constructor(message: string = "Bad request") {
    super(message);
    this.status = 400;
    this.message = message;
  }
}

class UnauthorizedError extends Error {
  public status: number;

  constructor(message: string = "Unauthorized") {
    super(message);
    this.status = 401;
    this.message = message;
  }
}

export {
  NotFoundError,
  InternalServerError,
  BadRequestError,
  UnauthorizedError,
};
