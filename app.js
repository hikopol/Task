const express = require('express');
const config = require('./config');

// init express
const app = express();



// start server
app.listen(config.PORT, () => {
    console.log(`Server started at port - ${config.PORT}`);
    console.log(`Server now in Production mode: ${process.env.IS_PRODUCTION}`);
})