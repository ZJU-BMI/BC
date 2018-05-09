var express = require('express');
var path = require('path');
var open = require('open');

import webpack from "webpack";
import config from "../config/webpack.config.js";

const compiler = webpack(config);

const port = 3000;
const app = express();

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'assets' , 'index.html'));
});

app.get('/simple', function(req, res) {
    res.send('simple response');
})

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        //open(`http://localhost:${port}`);
        console.log(`listen to http://localhost:${port}`);
    }
});

export default app;