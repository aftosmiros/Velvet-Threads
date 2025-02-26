const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.status || 500;
    
    res.status(statusCode).json({
      success: false,
      msg: err.msg || err.message || 'Internal Server Error',
      errors: err.errors || null
    });
  };
  
  export default errorHandler;