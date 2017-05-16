const express       = require('express');
const router        = express.Router();
const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database      = require('knex')(configuration);


// Do work here
router.get('/', (request, response) => {
  response.json({
    user: 'hugh',
    cool: true
  });
});

router.get('/api/v1/sharks', (request, response) => {
  database('sharks').select()
  .then(sharks => {
    response.status(200).json(sharks);
  })
  .catch(e => console.log(e));
});

router.get('/api/v1/sharks/:id', (request, response) => {
  database('sharks').where('id', request.params.id).select()
  .then(sharks => {
    response.status(200).json(sharks);
  })
  .catch(e => console.log(e));
});

router.get('/api/v1/pings', (request, response) => {
  database('pings').select()
  .then(pings => {
    response.status(200).json(pings);
  })
  .catch(e => console.log(e));
});


module.exports = router;