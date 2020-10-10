const models = require('../models');
const bcrypt = require('bcryptjs');


async function registerEditor(req, res) {
    const { Login, Password, confirmPassword } = req.body;
    try {
        if (!req.body.Password || !req.body.Login) return res.status(400).json({errMessage: "No password or login"});
        // we can use some validators here like  isEmail(req.Login) - if we want login be an email form
        if (Password != confirmPassword) return res.status(400).json({ errMessage: "Passwords do not matched" });
        if (Password.length <= 5) return res.status(400).json({ errMessage: "Passwords less than 6 symbols" });
        const editor = await models.Editor.findOne({ Login });
        if (editor) return res.status(400).json({ errMessage: "User already exists" });
        const crptPassword = await bcrypt.hash(Password, 10);
        const newEditor = await models.Editor.create({ Login, Password: crptPassword });
        await newEditor.save();
        req.session.user = editor;
        res.status(201).json({ newEditor });

    } catch (error) {
        console.log(error);
        res.status(500).json({ errMessage: "Server error" })
    };

}
module.exports = registerEditor;