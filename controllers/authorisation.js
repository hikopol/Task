const models = require('../models');
const bcrypt = require('bcryptjs');

async function login(req, res) {
    if (!req.body.Login || !req.body.Password) return res.status(400).json({errmsg: "No password or login"});
    // Also validation can be here like in regisrer 
    const {Login, Password}  = req.body;
    try {
        const editor = await models.Editor.findOne({ Login });
        if (!editor) return res.status(400).json({ errmsg: "User or Password not correct 0" }); // 0 ? 1 - just for test cases
        const passMatch = await bcrypt.compare(Password, editor.Password);
        if (!passMatch) return res.status(400).json({ errmsg: "User or Password not correct 1" });
        req.session.user = editor;
        //req.session.userID = user._id;
        res.json({ msg: `Logged in ... Welcome ${editor.Login} !` });
        console.log(req.session.user._id);
        //
    } catch (error) {
        console.log(error);
        res.status(500).json({errmsg: error});
    };
}

module.exports = login;