const mongoose = require("mongoose");
const faker = require("faker");

const User = require("../models/User.model");
/* const Inscription = require("../models/Inscription.model"); */
/* const Subscriptions = require("../models/Subscriptions.model");
 */const Game = require("../models/Game.model");


require("../config/db.config");

let usersCreated = [];

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
      usersCreated = users;

      //Create Events
      const games = [];

      for (let i = 0; i < 10; i++) {
        games.push({
          name: faker.name.findName(),
          description: faker.commerce.productDescription(),
          address: faker.address.streetName(),
          image: faker.image.sports(),
          user: usersCreated[0].id,
          date: new Date(),
        });
      }
      return Game.create(games);
    })
    .then((games) => {
      console.log(`${games.length} eventos creados`);
      gamesCreated = games;

      //Create Courts
      /* const Inscription = []; */

     /*  for (let index = 0; index < 10; index++) {
        Inscription.push({
          user: usersCreated[0].id,
          event: gamesCreated[0].id,

        });
      } */
 /*      return Inscription; */
    })
  /*   .then((Inscription) => {
      console.log(`${Inscription.length} Inscription created`);
    }) */

    .then(() => console.info(`- All data created!`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0));
});
