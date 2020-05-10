const express = require('express');
const Movie = require('./../models/movie');
const movieRouter = new express.Router();

// Handle GET request for website root
movieRouter.get('/', (req, res, next) => {
  console.log('arrived at movies page');
  Movie.find()
    .then((movies) => {
      res.render('movies/index', { movies });
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.get('/create', (req, res, next) => {
  console.log('arrived at movie creation page');
  res.render('movies/create');
});

movieRouter.post('/create', (req, res, next) => {
  console.log('attempted creating movie');
  const details = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.findOne({ title: details.title })
    .then((document) => {
      if (!document) {
        return Movie.create(details);
      } else {
        const error = new Error('That movie already exists!');
        return Promise.reject(error);
      }
    })
    .then((movies) => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  console.log('arrived at movie edit page for', id);
  Movie.findByIdAndUpdate(id)
    .then((movie) => {
      res.render('movies/edit', { movie });
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.get('/view/:title', (req, res, next) => {
  console.log('arrived at celebrity view page');
  const title = req.params.title;
  Movie.findOne({ title: title })
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const newDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.findByIdAndUpdate(id, newDetails)
    .then((movie) => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('arrived at movie details page for', id);
  Movie.findById(id)
    .then((movie) => {
      console.log(movie);
      res.render('movies/show', { movie });
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.post('/:id/delete', (req, res, next) => {
  console.log('hello im gonna be deleted');
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.use((error, req, res, next) => {
  console.log(error);
  res.render('error', { error });
});

module.exports = movieRouter;
