const mongoose = require("mongoose");
const faker = require("faker");

const User = require("../models/User.model");
const Courts = require("../models/Courts.model");
const Event = require("../models/Event.model")

const sports = require("../constants/sports")


require("../config/db.config");

let usersCreated = []

mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );

  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log("Database clear"))
    .then(() => {
      const users = [];

      for (let index = 0; index < 10; index++) {
        users.push({
          email: faker.internet.email(),
          password: "12345678",
          name: faker.name.findName(),
          address: faker.address.streetName(),
          image: faker.internet.avatar(),
        });
      }

      return User.create(users);
    })
    .then((users) => {
      console.log(`${users.length} users created`);
      console.log(`${users} users info`);
      usersCreated = users

      //Create Courts
      const courts = [];

      for (let index = 0; index < 10; index++) {
        courts.push({
          name: faker.name.findName(),
          address: faker.address.streetName(),
          image: faker.image.sports(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          /* categories:[categories[Math.floor(Math.random() * categories.length)]], */
          /*  place:[place[Math.floor(Math.random() * place.length)]], */
          /*  Surface:[Surface[Math.floor(Math.random() * Surface.length)]],
          Wall:[Wall[Math.floor(Math.random() * Wall.length)]], */
        });
      }
      return Courts.create(courts);
    })
    .then((courts) => {
      console.log(`${courts.length} courts created`);
      
      //Create Events
      const events = []
      
      for(let i = 0; i < 10; i++) {
        events.push({
          name: faker.name.findName(),
          description: faker.commerce.productDescription(),
          address: faker.address.streetName(),
          image: faker.image.sports(),
          user: usersCreated[0].id,
          sports: sports[Math.floor(Math.random() * sports.length)],
          date: new Date,
          
         
        })
      }
      return Event.create(events)
    })
    .then(events => {
      console.log(`${events.length} eventos creados`)
    })

    .then(() => console.info(`- All data created!`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0));
});
