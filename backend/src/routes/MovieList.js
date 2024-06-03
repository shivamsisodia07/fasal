const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Movie = require('../models/faviorateMovies');

const router = express.Router();

// Create a new favorite movie
router.post('/add', authMiddleware, async (req, res) => {
  console.log(req.body)
  const {
    name,
    backdrop_path,
    first_air_date,
    id,
    overview,
    poster_path,
    media_type
    
} = req.body;
  const userId = req.user.id;

  try {
    const newMovie = new Movie({
      userId,
      name,
      backdrop_path,
      first_air_date,
      id,
      overview,
      poster_path
      ,media_type
    });

    const movie = await newMovie.save();
    res.json({msg:"Movie added",movie});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all favorite movies for the logged-in user
router.get('/get', authMiddleware, async (req, res) => {
  try {
    const movies = await Movie.find({ userId: req.user.id });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a favorite movie
router.put('/update/:id', authMiddleware, async (req, res) => {
  const { title, director, genre, releaseDate } = req.body;

  const movieFields = { title, director, genre, releaseDate };

  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    if (movie.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: movieFields },
      { new: true }
    );

    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a favorite movie
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    if (movie.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Movie.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Movie removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
