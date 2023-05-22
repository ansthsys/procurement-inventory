"use strict";

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
      "Items",
      [
        {
          userId: 1,
          name: "Motorola IX",
          category: "object",
          qty: 5,
          price: 10000000,
          description:
            "Sint magna velit nulla commodo. Occaecat id Lorem eiusmod minim est consequat. Labore quis laborum cillum anim aliquip commodo consequat. Minim magna laborum sit velit officia amet irure. Proident aute velit mollit laborum ea nulla ipsum veniam. Officia cillum ex labore pariatur enim deserunt.",
          status: "process",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          name: "Motorola X",
          category: "object",
          qty: 5,
          price: 11000000,
          description:
            "Sint magna velit nulla commodo. Occaecat id Lorem eiusmod minim est consequat. Labore quis laborum cillum anim aliquip commodo consequat. Minim magna laborum sit velit officia amet irure. Proident aute velit mollit laborum ea nulla ipsum veniam. Officia cillum ex labore pariatur enim deserunt.",
          status: "approve",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          name: "Motorola IX",
          category: "object",
          qty: 5,
          price: 10000000,
          description:
            "Sint magna velit nulla commodo. Occaecat id Lorem eiusmod minim est consequat. Labore quis laborum cillum anim aliquip commodo consequat. Minim magna laborum sit velit officia amet irure. Proident aute velit mollit laborum ea nulla ipsum veniam. Officia cillum ex labore pariatur enim deserunt.",
          status: "reject",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          name: "Motorola Pro Max",
          category: "object",
          qty: 5,
          price: 15000000,
          description:
            "Sint magna velit nulla commodo. Occaecat id Lorem eiusmod minim est consequat. Labore quis laborum cillum anim aliquip commodo consequat. Minim magna laborum sit velit officia amet irure. Proident aute velit mollit laborum ea nulla ipsum veniam. Officia cillum ex labore pariatur enim deserunt.",
          status: "process",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          name: "Motorola Max",
          category: "object",
          qty: 5,
          price: 13000000,
          description:
            "Sint magna velit nulla commodo. Occaecat id Lorem eiusmod minim est consequat. Labore quis laborum cillum anim aliquip commodo consequat. Minim magna laborum sit velit officia amet irure. Proident aute velit mollit laborum ea nulla ipsum veniam. Officia cillum ex labore pariatur enim deserunt.",
          status: "approve",
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
  },
};
