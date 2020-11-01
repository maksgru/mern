const express = require("express");
const config = require('config');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const upwork = require('./controllers/upwork');
const Job = require('./models/Job');
// const controller = require('./controllers/auth')
const passport = require('passport');

const auth = require('./routes/auth.routes');

const app = express();

const PORT = config.get('port');


const uri = "mongodb://localhost:27017/mern";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established...')
})

app.use(passport.initialize())
require('./middleware/passport')(passport);

app.use(bodyParser.json());

app.use('/api/auth', auth);

app.get('/api/mobdev', passport.authenticate('jwt', {session: false}), (req, res) => {
  Job.find({}, (err,docs) => {
    res.json(docs[0]);
  })
})


const params = {
  subcategory2: "Mobile Development",
  paging: "0;100",
};
// upwork.getJobs(params);

app.listen(PORT, () =>
      console.log(`Express server has been started at ${PORT}`)
    );
    
process.on("SIGINT", () => {
  mongoose.disconnect();
  process.exit();
});
