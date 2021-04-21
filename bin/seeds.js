const mongoose = require("mongoose");
const faker = require("faker");

const User = require("../models/User.model");
const Courts = require("../models/Courts.model");

const categories = require("../constants/categories");

require("../config/db.config");

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
    })
    .then(() => console.info(`- All data created!`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0));
});
