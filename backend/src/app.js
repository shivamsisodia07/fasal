const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const MovieList = require('./routes/MovieList');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:5173', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// Routes
// app.use('/',async (req, res) => {
//   res.send('Hello World');
// })
app.use('/api/auth', authRoutes);
app.use('/api/faviorateMovie', MovieList);
// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000,  
socketTimeoutMS: 45000 })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
