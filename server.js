require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const router = require('./routes/index');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));

app.use('/', router);

app.listen(3000, () => {
    console.log('TripApp started');
})