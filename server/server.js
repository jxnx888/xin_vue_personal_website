const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express()
const port = 3000
const {generateText, translateText }=require('./openai')

app.disable('x-powered-by');
var allowedOrigins = ['http://localhost:8080'];
app.use(cors({
  origin: function (origin, callback) {

    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
// As long as these two configurations are added, there will be one more attribute on the post request object: body
// which means you can use req.body to get the sent data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json());
app.use(express.json());

app.post('/openai/chat/conversition', async (req, res) => {
  const input = req.body.input
  console.log('input',input)
  const model = [
    "davinci",
    "text-davinci-002",
    "text-moderation-playground",
  ]
  const data = await generateText(input,model[0]);
  if(data){
    res.status(200).json(data)
  } else{
    res.status(403).json(data)
  }
})

app.get('/', async (req, res) => {
  res.send(`app listening on port ${port}`)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;
