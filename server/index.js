var express = require('express');
var path = require('path');
var open = require('open');
var bodyParser = require('body-parser');

import webpack from "webpack";
import config from "../config/webpack.config.js";

const compiler = webpack(config);

const port = 3000;
const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

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

app.use('/deploy', require('./routes/deploy.js'));
app.use('/excuteProcess', require('./routes/excuteProcess.js'));

export default app;