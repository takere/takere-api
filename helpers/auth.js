function checkAuthenticated(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      return next()
    } else {
      const err = new Error("Not authorized! Go back!");
      err.status = 401;
      return next(err);
    }
  } catch (e) {
    return res.status(401).redirect('/login').send({status: 401, message: 'unauthorized'})
  }
}

async function checkAdminAuthenticated(req, res, next) {
  try {
    const u = await req.user;
    if (req.isAuthenticated() && u.role === 'adm') {
      return next()
    } else {
      const err = new Error("Not authorized! Go back!");
      err.status = 401;
      return next(err);
    }
  } catch (e) {
    return res.status(401).redirect('/login').send({status: 401, message: 'unauthorized'})
  }
}

module.exports = {
  checkAuthenticated,
  checkAdminAuthenticated
}