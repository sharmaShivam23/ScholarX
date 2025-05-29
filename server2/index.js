// const express = require('express')
// const cors = require("cors")
// require('dotenv').config()
// const app = express()


// app.use(express.json())
// app.use(cors());


// const fileUpload = require('express-fileupload')
// app.use(fileUpload({
//   useTempFiles : true,
//   tempFileDir : '/tmp/'
// }))

// const routes = require("./routes/Routes")
// app.use("/api/lms" , routes) 

// //db connection
// const database = require('./config/database')
// console.log(database);
// database()

// //cloudinary

// const {cloudinaryConnect} = require('./config/cloudinary')
// cloudinaryConnect()

// PORT = process.env.PORT
// app.listen(PORT , () => {
//   console.log(`Project successfully running on ${PORT}`);
// })



const express = require('express');
const cors = require("cors");
const csrf = require('csurf');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const app = express();


app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: '*',
//   // origin: ['http://localhost:5173', 'http://localhost:5174'],
//   credentials: true
// }));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || /http:\/\/localhost:\d{4}/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// app.use(cors())


app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret_key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true }
}));


const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);


app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));


const routes = require("./routes/Routes");
app.use("/api/lms", routes);

const database = require('./config/database');
database();


const { cloudinaryConnect } = require('./config/cloudinary');
cloudinaryConnect();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Project successfully running on ${PORT}`);
});
