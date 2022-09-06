const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use(bodyParser.json());

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});