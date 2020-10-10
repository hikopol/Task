function checkEditorStatus(req, res, next) {
    if (req.session.user.IsConfirmed != true) {
         const err = new Error("You'r login are not Confirmed by admin!");
         err.statusCode = 401;
         next(err);   
    };
    next();
    };
module.exports = checkEditorStatus;
    