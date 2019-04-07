const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const app = express();
const PORT = process.env.PORT || 6357
const auth = require('./auth');
const api = require('./api');
const {checkToken} = require('./middleware/middleware');


mongoose.connect(
	keys.mongoURI,
	{ useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => console.log('connected to the database'));
db.on("error", console.log.bind(console, "MongoDb connection error"));


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/api', checkToken, api);


app.listen(PORT, () => console.log(`listening on ${PORT}`));