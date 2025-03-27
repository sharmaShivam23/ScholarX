const express = require('express')
const cors = require("cors")
require('dotenv').config()
const app = express()


app.use(express.json())
app.use(cors());


const fileUpload = require('express-fileupload')
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}))

const routes = require("./routes/Routes")
app.use("/api/lms" , routes) 

//db connection
const database = require('./config/database')
console.log(database);
database()

//cloudinary

const {cloudinaryConnect} = require('./config/cloudinary')
cloudinaryConnect()

PORT = process.env.PORT
app.listen(PORT , () => {
  console.log(`Project successfully running on ${PORT}`);
})



// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const csrf = require('csurf');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
// const database = require('./config/database');
// const { cloudinaryConnect } = require('./config/cloudinary');
// const routes = require('./routes/Routes');
// const app = express();

// // Session Setup
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'default_secret_key', 
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

// // CSRF Protection
// const csrfProtection = csrf({ cookie: true });

// // Body Parsers
// app.use(bodyParser.json());
// app.use(express.json());

// // CORS Configuration
// app.use(cors({
//   origin: 'http://localhost:5173', // Adjust this to match your frontend origin
//   credentials: true
// }));

// // File Upload
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/'
// }));

// // CSRF Token Generation Route
// app.get('/api/csrf-token', csrfProtection, (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

// // Routes with CSRF Protection
// app.use(csrfProtection);
// app.use('/api/lms', routes);

// // Database Connection
// database();
// cloudinaryConnect();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Project successfully running on port ${PORT}`);
// });

