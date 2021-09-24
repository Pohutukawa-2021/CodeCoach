exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("messages")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("messages").insert([
        { id: 1, message: "hey", date: 1632455553990, time: 1632455553990 },
        { id: 2, message: "hey", date: 1632455553995, time: 1632455553995 },
        {
          id: 3,
          message: "how is it going?",
          date: 1632455554001,
          time: 1632455554001,
        },
      ]);
    });
};
