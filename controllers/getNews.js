const ObjectID = require('mongodb').ObjectID;
const config = require('../config');
const models = require('../models');
 
 async function getNews(req, res) {
    try {
        if (!req.params.id) {
            const news = await models.News.find({}); // get all news
            res.status(200).json({TotalNews: news.length , News: news.map(new1 => {
                return {
                _id: new1._id,
                Header: new1.Title,
                Image: new1.Image,
                Body: new1.Text,
                Created: new1.createdAt, 
                Updated: new1.updatedAt,
                Author: new1.Author,
                request: {
                    type: 'GET',
                    url: `${config.HOME_URL}/news/${new1._id}`
                }}
            }) 
        }); 
        } else {
            try {
                let testID = new ObjectID(req.params.id);
            } catch (e) {
                return res.status(400).json({ errmsg: "Incorecct Id of news" })
            };
            const news = await models.News.findOne({ _id: req.params.id });
            if (!post) return res.status(404).json({ errmsg: "Not found" })
            res.status(200).json({ News: { Header: news.Title, Image: news.Image, Text: news.Text, Created: news.createdAt, Updated: news.updatedAt,
            request_update:{
                type: 'PUT',
                ulr: `${config.HOME_URL}/news/${news._id}`
            },
            request_delete:{
                type: 'DELETE',
                ulr: `${config.HOME_URL}/news/${news._id}`
            }}
         }); // rework with render
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ resultCode: 1, errmsg: "Server error" });
    };
}

module.exports = getNews;