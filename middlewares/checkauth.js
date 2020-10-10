
function checkauth(req, res, next) {
if (!req.session || !req.session.user) {
     const err = new Error("You are not logged!");
     err.statusCode = 401;
     next(err);   
};
next();
};
module.exports = checkauth;
