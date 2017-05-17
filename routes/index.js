const express       = require('express');
const router        = express.Router();
const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database      = require('knex')(configuration);
const error         = require('../helpers/error');

// Do work 

router.get('/', (request, response) => {
  response.json({
    user: 'hugh',
    cool: true
  });
});

router.get('/api/v1/sharks', (request, response) => {
  const { species } = request.query;

  if(!species) {
    database('sharks').select()
    .then(sharks => response.status(200).json(sharks))
    .catch(() => response.status(404));
  } else {
    database('sharks').where('species', 'like', `%${species}%`).select()
    .then(sharks => {
      sharks.length > 0
        ? response.status(200).json(sharks)
        : error.queryArrayLength(request, response);
    });
  }
});

router.get('/api/v1/sharks/:id', (request, response) => {
  const { id } = request.params;

  database('sharks').where('id', id).select()
  .then(shark => {
    shark.length > 0
      ? response.status(200).json(shark)
      : error.arrayLength(request, response);
  });
});

router.get('/api/v1/sharks/:id/pings', (request, response) => {
  database('pings').where('key', request.params.id).select()
  .then(sharks => {
    sharks.length > 0 
      ? response.status(200).json(sharks)
      : error.arrayLength(request, response);
  });
});

router.get('/api/v1/pings', (request, response) => {
  const { shark_id } = request.query;
  if(!shark_id){
    database('pings').select()
    .then(pings => response.status(200).json(pings))
    .catch(() => response.status(404));
  } else {
    database('pings').where('shark_id', shark_id).select()
    .then(pings => {
      pings.length > 0 
        ? response.status(200).json(pings)
        : error.queryArrayLength(request, response);
    });
  }
});


router.get('/api/v1/pings/:id', (request, response) => {
  const { id } = request.params;

  database('pings').where('id', id).select()
  .then(ping => {
    ping.length > 0 
      ? response.status(200).json(ping) 
      : error.arrayLength(request, response);
  });
});


module.exports = router;









