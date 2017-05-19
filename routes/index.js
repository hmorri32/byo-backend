const express       = require('express');
const router        = express.Router();
const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database      = require('knex')(configuration);
const error         = require('../helpers/error');
const { checkAuth } = require('../helpers/checkAuth');


// Do work 

router.get('/', (request, response) => {
  response.json({
    name: 'hugh',
    cool: true
  });
});

// GET shorty 

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

// yung POST noir

router.post('/api/v1/sharks', checkAuth, (request, response) => {
  let sharkFields = ['shark_id', 'name', 'tagIdNumber', 'species', 'gender', 'stageOfLife', 'length', 'weight', 'tagDate', 'tagLocation', 'description'].every((prop) => {
    return request.body.hasOwnProperty(prop);
  });

  if (sharkFields) {
    const shark = request.body;

    database('sharks').insert(shark, ['shark_id', 'name', 'tagIdNumber', 'species', 'gender', 'stageOfLife', 'length', 'weight', 'tagDate', 'tagLocation', 'description'])
      .then((sharks) => response.status(201).json(sharks))
      .catch(() => error.serverError(response));
  } else {
    return error.missingFields(response);
  }
});

router.post('/api/v1/pings', checkAuth, (request, response) => {
  let pingFields = ['key', 'shark_id', 'ping_id', 'datetime', 'tz_datetime', 'latitude', 'longitude'].every((prop) => {
    return request.body.hasOwnProperty(prop);
  });

  if (pingFields) {
    const ping = request.body;

    database('pings').insert(ping, ['key', 'shark_id', 'ping_id', 'datetime', 'tz_datetime', 'latitude', 'longitude'])
      .then((pings) => response.status(201).json(pings))
      .catch(() => error.serverError(response));
  } else {
    return error.missingFields(response);
  }
});

// PUT 'er there bud

router.put('/api/v1/sharks/:id', checkAuth, (request, response) => {
  const { id } = request.params;
  let sharkFields = ['shark_id', 'name', 'tagIdNumber', 'species', 'gender', 'stageOfLife', 'length', 'weight', 'tagDate', 'tagLocation', 'description'].every((prop) => {
    return request.body.hasOwnProperty(prop);
  });

  if (request.body.hasOwnProperty('id')) {
    return error.dontTouchID(response);
  }

  if (sharkFields) {
    const updatedShark = request.body;

    database('sharks').where('id', id).select()
      .then((sharks) => {
        if (sharks.length > 0) {
          database('sharks').where('id', id)
            .update(updatedShark)
            .then(() => database('sharks').where('id', id))
            .then((shark) => response.status(200).json(shark))
            .catch(() => error.serverError(response));
        } else {
          return error.invalidID(response);
        }
      });
  } else {
    return error.missingFields(response);
  }
});

router.put('/api/v1/pings/:id', checkAuth, (request, response) => {
  const { id }   = request.params;
  let pingFields = ['key', 'shark_id', 'ping_id', 'datetime', 'tz_datetime', 'latitude', 'longitude'].every((prop) => {
    return request.body.hasOwnProperty(prop);
  });

  if (request.body.hasOwnProperty('id')) {
    return error.dontTouchID(response);
  }

  if (pingFields) {
    const updatedPing = request.body;

    database('pings').where('id', id).select()
      .then((pings) => {
        if (pings.length > 0) {
          database('pings').where('id', id)
            .update(updatedPing)
            .then(() => database('pings').where('id', id))
            .then((ping) => response.status(200).json(ping))
            .catch(() => error.serverError(response));
        } else {
          return error.invalidID(response);
        }
      });
  } else {
    return error.missingFields(response);
  }
});

// bespoke PATCH work 

router.patch('/api/v1/sharks/:id', checkAuth, (request, response) => {
  const { id }  = request.params;
  let patchWork = ['name', 'species', 'description'].every((prop) => {
    return request.body.hasOwnProperty(prop);
  });

  if (request.body.hasOwnProperty('id')) {
    return error.dontTouchID(response);
  }

  if (patchWork) {
    const { name, species, description } = request.body;
    const sharkPatch = { name, species, description };

    database('sharks').where('id', id).select()
      .then((sharks) => {
        if (sharks.length > 0) {
          database('sharks').where('id', id)
            .update(sharkPatch)
            .then(() => database('sharks').where('id', id))
            .then((shark) => response.status(200).json(shark))
            .catch(() => error.serverError(response));
        } else {
          return error.invalidID(response);
        }
      });
  } else {
    return error.missingFields(response);
  }
});


router.patch('/api/v1/pings/:id', checkAuth, (request, response) => {
  const { id }  = request.params;
  let patchWork = ['datetime', 'latitude', 'longitude'].every((prop) => {
    return request.body.hasOwnProperty(prop);
  });

  if (request.body.hasOwnProperty('id')) {
    return error.dontTouchID(response);
  }

  if (patchWork) {
    const { datetime, latitude, longitude } = request.body;
    const pingPatch = { datetime, latitude, longitude };

    database('pings').where('id', id).select()
      .then((pings) => {
        if (pings.length > 0) {
          database('pings').where('id', id)
            .update(pingPatch)
            .then(() => database('pings').where('id', id))
            .then((ping) => response.status(200).json(ping))
            .catch(() => error.serverError(response));
        } else {
          return error.invalidID(response);
        }
      });
  } else {
    return error.missingFields(response);
  }
});

// DELETE 

router.delete('/api/v1/sharks/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('sharks').where('id', id).select()
    .then((sharks) => {
      if (sharks.length > 0) {
        database('sharks').where('id', id).del()
          .then(() => database('sharks').select())
          .then((sharks) => response.status(200).json(sharks))
          .catch(() => error.serverError(response));
      } else {
        return error.invalidID(response);
      }
    })
    .catch(() => error.serverError(response));
});

router.delete('/api/v1/pings/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('pings').where('id', id).select()
    .then((pings) => {
      if (pings.length > 0) {
        database('pings').where('id', id).del()
          .then(() => database('pings').select())
          .then((pings) => response.status(200).json(pings))
          .catch(() => error.serverError(response));
      } else {
        return error.invalidID(response);
      }
    })
    .catch(() => error.serverError(response));
});

module.exports = router;