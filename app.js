const express = require('express');
const session = require('express-session');
const app = express();
const port = 3001;
const mainRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// SESSION
app.use(session({
  secret: 'rahasia 123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use(mainRoutes);

app.listen(port, () => console.log(`app listen to localhost:${port}`));