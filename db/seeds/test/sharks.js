// knex seed:run --env test
// knex migrate:latest --env test

/* eslint-disable */

exports.seed = function(knex, Promise) {
  return knex('pings').del()
    .then(() => knex('sharks').del())
    .then(() => {
      return Promise.all([
        knex('sharks').insert({
          id: 1,
          shark_id: 12,
          name: "Alistair Hennessey",
          tagIdNumber: "2222",
          species: "Jaguar shark",
          gender: "Female",
          stageOfLife: "Super Mature",
          length: "30 ft",
          weight: "34356 lbs.",
          tagDate: "17 September 2012",
          tagLocation: "Miami, where the heat is on.",
          description: "That's an endangered species at most. What would be the scientific purpose of killing it?"
        }, 'id')
        .then(shark => {
          return knex('pings').insert([{
            id: 1,
            key: 1,
            shark_id: 12,
            ping_id: "61865",
            datetime: "12 May 2017 5:56:18 PM",
            tz_datetime: "12 May 2017 5:56:18 PM +0900",
            latitude: "36.65662",
            longitude: "-72.01635"
          }, {
            id: 2,
            key: 1,
            shark_id: 12,
            ping_id: "61439",
            datetime: "23 April 2017 8:49:00 AM",
            tz_datetime: "23 April 2017 8:49:00 AM +0900",
            latitude: "31.1444",
            longitude: "-77.10802"
          }, {
            id: 3,
            key: 1,
            shark_id: 12,
            ping_id: "61164",
            datetime: "15 April 2017 4:00:59 AM",
            tz_datetime: "15 April 2017 4:00:59 AM +0900",
            latitude: "30.80375",
            longitude: "-79.05285"
          }])
        }),
        knex('sharks').insert({
          id: 2,
          shark_id: 6,
          name: "Steve Zissou",
          tagIdNumber: "121425",
          species: "Great white orca",
          gender: "Male",
          stageOfLife: "not not mature...",
          length: "A bunch of feet",
          weight: "more than you.",
          tagDate: "17 Whatever 2003",
          tagLocation: "Somewhere cold and dreary",
          description: "Well... uh... we fuckin stole it. man."
        }, 'id')
        .then(shark => {
          return knex('pings').insert([{
            id: 4,
            key: 2,
            shark_id: 12,
            ping_id: "61865",
            datetime: "12 May 2017 5:56:18 PM",
            tz_datetime: "12 May 2017 5:56:18 PM +0900",
            latitude: "36.65662",
            longitude: "-72.01635"
          }, {
            id: 5,
            key: 2,
            shark_id: 12,
            ping_id: "61439",
            datetime: "23 April 2017 8:49:00 AM",
            tz_datetime: "23 April 2017 8:49:00 AM +0900",
            latitude: "31.1444",
            longitude: "-77.10802"
          }, {
            id: 6,
            key: 2,
            shark_id: 12,
            ping_id: "61164",
            datetime: "15 April 2017 4:00:59 AM",
            tz_datetime: "15 April 2017 4:00:59 AM +0900",
            latitude: "30.80375",
            longitude: "-79.05285"
          }
        ])
      })
    ])
  })
}
