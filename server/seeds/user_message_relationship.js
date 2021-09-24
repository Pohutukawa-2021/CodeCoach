exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_message_relationship")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user_message_relationship").insert([
        { id: 1, message_id: 1, to: 1, from: 2 },
        { id: 2, message_id: 2, to: 2, from: 1 },
        { id: 3, message_id: 3, to: 1, from: 2 },
      ]);
    });
};
