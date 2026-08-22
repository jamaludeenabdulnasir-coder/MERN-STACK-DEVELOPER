const path = require('path');
const dns = require('dns');

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

require('dotenv').config();

const UserRoutes = require('./routes/UserRoute');
const IndexRouter = require('./routes/IndexRouter');

dns.setServers(['8.8.8.8']);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

async function connectDB() {
  const uris = [process.env.MONGO_URI, process.env.MONGO_URI_OFFLINE].filter(Boolean);
  for (const uri of uris) {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
      const target = uri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'local MongoDB';
      console.log(`✅ Connected to ${target}`);
      return;
    } catch (err) {
      console.error(`❌ MongoDB connection failed (${uri.includes('mongodb+srv') ? 'Atlas' : 'local'}):`, err.message);
      mongoose.disconnect().catch(() => {});
    }
  }
  console.error('❌ No MongoDB connection available');
}

connectDB();

const allowedOrigins = [process.env.CORS_ORIGIN, 'http://localhost:5173'].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/', IndexRouter);
app.use('/user', UserRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}`));

module.exports = app;
