module.exports = {
  development: {
    client: 'pg',
    connection: 'postgress://localhost/byobackend',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }
};