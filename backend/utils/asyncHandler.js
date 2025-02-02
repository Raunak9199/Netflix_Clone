const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((er) => next(er));
  };
};

/* const asynHandler = (fnc) => async (req, res, next) => {
  try {
    await fnc(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
}; */

export { asyncHandler };
