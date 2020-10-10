const ObjectID = require('mongodb').ObjectID;
const config = require('../config');
const models = require('../models');

async function getPost(req, res) {
    try {
        if (!req.params.id) {
            if (req.session.user.IsAdmin) {
                const posts = await models.Post.find({}); // if admin take all post
                res.status(200).json({
                    Totalposts: posts.length, Posts: posts.map(post => {
                        return {
                            _id: post._id,
                            Header: post.Header,
                            Image: post.Image,
                            Body: post.Body,
                            Created: post.createdAt,
                            Updated: post.updatedAt,
                            Author: post.Author,
                            request: {
                                type: 'GET',
                                url: `${config.HOME_URL}/posts/${post._id}`
                            }
                        }
                    })
                });
            } else {
            const posts = await models.Post.findById({ _id: req.session.user._id }); // if Editor take only your posts
            if (!posts) return res.status(200).json({ msg: 'havent posts yet'});
            res.status(200).json({
                Totalposts: posts.length, Posts: posts.map(post => {
                    return {
                        _id: post._id,
                        Header: post.Header,
                        Image: post.Image,
                        Body: post.Body,
                        Created: post.createdAt,
                        Updated: post.updatedAt,
                        Author: post.Author,
                        request: {
                            type: 'GET',
                            url: `${config.HOME_URL}/posts/${post._id}`
                        }
                    }
                })
            });}
            // 200 status , later = res.render('postPage', post) for next step
        } else {
            try {
                let testID = new ObjectID(req.params.id);
            } catch (e) {
                return res.status(400).json({ errmsg: "Incorecct Id" })
            };
            const post = await models.Post.findOne({ _id: req.params.id });
            if (!post) return res.status(404).json({ errmsg: "Not found" })
            res.status(200).json({
                post: {
                    Header: post.Header, Image: post.Image, Text: post.Body, Created: post.createdAt, Updated: post.updatedAt,
                    request_update: {
                        type: 'PUT',
                        ulr: `${config.HOME_URL}/posts/${post._id}`
                    },
                    request_delete: {
                        type: 'DELETE',
                        ulr: `${config.HOME_URL}/posts/${post._id}`
                    }
                }
            }); // rework with render
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ resultCode: 1, errmsg: "Server error" });
    };
}

module.exports = getPost;