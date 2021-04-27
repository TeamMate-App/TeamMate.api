
module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated) {
      console.log("secure")
      next()
    } else {
      res.redirect('/')
    }
  }
  
  module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated) {
      res.redirect('/')
    } else {
      next()
    }
  }