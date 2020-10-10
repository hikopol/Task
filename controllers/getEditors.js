const ObjectID = require('mongodb').ObjectID;
const config = require('../config');
const models = require('../models');

async function getEditors(req, res) {
    try {
        if (!req.params.id) {
            const editors = await models.Editor.find({}); // take all editors from DB
            res.status(200).json({TotalEditors: editors.length , Editors: editors.map(editor => {
                return {
                _id: editor._id,
                Login: editor.Login,
                Status: editor.IsConfirmed,
                request: {
                    type: 'GET',
                    url: `${config.HOME_URL}/editor/${editor._id}`
                }}
            }) 
        }); // 
        } else {
            try {
                let testID = new ObjectID(req.params.id);
            } catch (e) {
                return res.status(400).json({ errmsg: "Incorecct Id of Editor" })
            };
            const editor = await models.Editor.findOne({ _id: req.params.id });
            if (!editor) return res.status(404).json({ errmsg: "Not found" })
            res.status(200).json({ Editor: { Login: editor.Login, Status: editor.IsConfirmed,
            request_update:{
                type: 'PUT',
                ulr: `${config.HOME_URL}/editor/${editor._id}`
            },
            request_delete:{
                type: 'DELETE',
                ulr: `${config.HOME_URL}/editor/${editor._id}`
            }}
         }); // add admin logic
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ resultCode: 1, errmsg: "Server error" });
    };
}





module.exports = getEditors;