# BYO-BACKEND

# About

This yung BYO-backend pulls in shark data that includes latitudinal and longitudinal tracking information.

#### Error Handling
* **All endpoints have ultra robust error handling**
  * GET wrong path will throw `404`
  * IMPLEMENT error handling for :  routeNotFound, invalid: arrayLength, invalidID, invalid queryArrayLength, invalid ID, missingFields, serverError
***

## ENDPOINTS
- **[<code>GET</code> api/v1/sharks](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L21-L36)**

- **[<code>GET</code> api/v1/sharks/:id](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L38-L47)**

- **[<code>GET</code> api/v1/sharks/:id/pings](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L49-L56)**

- **[<code>GET</code> api/v1/pings](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L58-L73)**

- **[<code>GET</code> api/v1/pings/:id](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L75-L84)**

- **[<code>POST</code> api/v1/sharks/](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L88-L102)**

- **[<code>POST</code> api/v1/pings/](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L104-L118)**

- **[<code>PUT</code> api/v1/sharks/:id](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L122-L150)**

- **[<code>PUT</code> api/v1/pings/:id](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L152-L180)**

- **[<code>PATCH</code> api/v1/sharks/:id](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L184-L213)**

- **[<code>PATCH</code> api/v1/pings/:id](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L216-L245)**

- **[<code>DELETE</code> api/v1/sharks/:id](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L249-L264)**

- **[<code>DELETE</code> api/v1/pings/:id](https://github.com/hmorri32/byo-backend/blob/master/routes/index.js#L266-L281)**
















