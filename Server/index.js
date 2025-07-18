const express = require("express")
require('dotenv').config()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const {cloudinaryConnect} = require("./config/cloudinary")
const app = express()
const fileUpload = require("express-fileupload")
const passport = require("passport");
const session = require("express-session");
const helmet = require('helmet');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
require("./config/passport");

app.use(express.json())
app.use(cookieParser())
app.use(helmet());
app.use(xssClean());
app.use(hpp());
// Prevent NoSQL injection
app.use(mongoSanitize());
app.use(compression());
app.use(cors({
  origin : ["http://localhost:5173","http://localhost:3000","http://localhost:5174" , "https://scholar-x.vercel.app"],
  methods : ["GET","POST","PUT","DELETE"],
  credentials : true
}))

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : "/tmp/"
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,          
    sameSite: "none",      
    httpOnly: true,
  }
}));


app.listen(process.env.PORT, () => {
  console.log("port is running on 3001");
})



app.use(passport.initialize());
app.use(passport.session());

// Google Auth Routes
app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  }
);


app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.FRONTEND_URL}/`);
  });
});

app.get("/auth/user", (req, res) => {
  res.send(req.user);
});



//routes
const routes = require("./routes/Route")
app.use("/scholarX", routes);


const database = require('./config/databse') 
database()

cloudinaryConnect()
