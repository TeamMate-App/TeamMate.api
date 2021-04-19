const mongoose = require('mongoose')
const faker = require('faker')

const User = require('../models/User.model')

const categories = require('../constants/categories')

require('../config/db.config')

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db.dropDatabase()
    .then(() => console.log('Database clear'))
    .then(() => {
      const users = []

      for (let index = 0; index < 10; index++) {
        users.push({
          email: faker.internet.email(),
          password: '12345678',
          name: faker.name.findName(),
          address: faker.address.streetName(),
          image: faker.internet.avatar()
        })
      }

      return User.create(users)
    })
    .then(users => {
      console.log(`${users.length} users created`)
      console.log(`${users} users info`)



   
    })
    .then(() => console.info(`- All data created!`))
    .catch(error => console.error(error))
    .finally(() => process.exit(0))
})
