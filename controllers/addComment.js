const models = require('../models');


async function addComment(req, res) {
    let { Author, Email, Text, ParentID } = req.body;
    console.log(req.body); // check 
    try {
        if (!req.body) return res.status(400).json({ errmsg: "Request without 'body'" });
        if (!Text) return res.status(400).json({ errmsg: "Text of comment is reqired" });
        const comment = await models.Comment.create({ Author, Email, Text, Parent: ParentID  }); // bind author wia cookie
        await comment.save();
        // update news
        const parent = await models.News.findOneAndUpdate({
            _id: ParentID },
            { Comments: parent.Comments.push(comment._id) },
            { new: true });
        console.log('created new Comment in DB');
        res.status(201).json({ comment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errmsg: "Server error" });
    };
};

module.exports = addComment;