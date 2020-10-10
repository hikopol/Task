const express = require('express');
const sessions = require('./components/sessions')
const config = require('./config');
const router = require('./routes');
const bodyParser = require('body-parser');

// init express
const app = express();
// sessions
app.use(sessions);

// Parse request from client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routing
app.use('/admin', router.Admin);
app.use('/editor', router.Editor);
app.use('/', router.User);


// start server
app.listen(config.PORT, () => {
    console.log(`Server started at port - ${config.PORT}`);
    console.log(`Server now in Production mode: ${process.env.IS_PRODUCTION}`);
})