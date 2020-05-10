const express = require('express');
const Celebrity = require('./../models/celebrity');
const celebRouter = new express.Router();

// Handle GET request for website root
celebRouter.get('/', (req, res, next) => {
  console.log('arrived at celebrities page');
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.get('/create', (req, res, next) => {
  console.log('arrived at celebrity creation page');
  res.render('celebrities/create');
});

celebRouter.post('/create', (req, res, next) => {
  console.log('attempted creating celebrity');
  const details = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
    movies: req.body.movies,
  };
  Celebrity.findOne({ name: details.name })
    .then((document) => {
      if (!document) {
        return Celebrity.create(details);
      } else {
        const error = new Error('That celebrity already exists!');
        return Promise.reject(error);
      }
    })
    .then((celebrities) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.get('/view/:name', (req, res, next) => {
  console.log('arrived at celebrity view page');
  const name = req.params.name;
  Celebrity.findOne({ name: name })
    .then((celebrity) => {
      res.redirect(`/celebrities/${celebrity._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('arrived at celebrity details page for', id);
  Celebrity.findById(id)
    .then((celebrity) => {
      console.log(celebrity.movies);
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  console.log('arrived at celebrity edit page for', id);
  Celebrity.findByIdAndUpdate(id)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const newDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
    movies: req.body.movies,
  };
  Celebrity.findByIdAndUpdate(id, newDetails)
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.post('/:id/delete', (req, res, next) => {
  console.log('hello im gonna be deleted');
  const id = req.params.id;
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

celebRouter.use((error, req, res, next) => {
  console.log(error);
  res.render('error', { error });
});

module.exports = celebRouter;
