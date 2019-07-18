const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 8080;

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);

app.get('/', (req, res, next) => {
  try {
    res.send('Hello');
    next();
  } catch (error) {
    next(error);
  }
  //next();
});

// make sure to put this AFTER your session middleware, but BEFORE you send your response!
app.use((req, res, next) => {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter); // increment THEN log
  next(); // needed to continue through express middleware
});

// place right after the session setup middleware
app.use((req, res, next) => {
  console.log('SESSION: ', req.session);
  next();
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
