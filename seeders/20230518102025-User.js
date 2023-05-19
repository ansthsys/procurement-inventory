"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          username: "ADM0001",
          email: "john@example.com",
          password: bcrypt.hashSync("johndoe", 8),
          role: "admin",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Foo Bar",
          username: "MBM0001",
          email: "foo@bar.com",
          password: bcrypt.hashSync("foobar", 8),
          role: "member",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
