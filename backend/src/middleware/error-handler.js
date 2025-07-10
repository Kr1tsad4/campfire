const errorHandler = (err, req, res, next) => {
  if(!res.statusCode || res.statusCode === 200){
    if(err.statusCode){
      res.status(err.statusCode)
    }else{
      res.status(500)
    }
  }
  res.json({ message: err.message });
};

module.exports = errorHandler;