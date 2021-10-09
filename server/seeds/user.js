exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "tester123@gmail.com",
          username: "tester123",
          role: "junior",
          auth_id: "auth0|614ac8d8c6d69a0070e625c2",
          image_url:
            "data:image/jpeg;base64,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",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "3-4 years experience",
        },
        {
          id: 2,
          email: "tester2@gmail.com",
          username: "tester2",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 3,
          email: "tester3@gmail.com",
          username: "tester3",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 4,
          email: "tester4@gmail.com",
          username: "tester4",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 5,
          email: "tester5@gmail.com",
          username: "tester5",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 6,
          email: "tester6@gmail.com",
          username: "tester6",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 7,
          email: "tester7@gmail.com",
          username: "tester7",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 8,
          email: "tester8@gmail.com",
          username: "tester8",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 9,
          email: "tester9@gmail.com",
          username: "tester9",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 10,
          email: "tester10@gmail.com",
          username: "tester10",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 11,
          email: "tester11@gmail.com",
          username: "tester11",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 12,
          email: "tester12@gmail.com",
          username: "tester12",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 13,
          email: "tester13@gmail.com",
          username: "tester13",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 14,
          email: "tester14@gmail.com",
          username: "tester14",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 15,
          email: "tester15@gmail.com",
          username: "tester15",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        },
        {
          id: 16,
          email: "tester16@gmail.com",
          username: "tester16",
          role: "junior",
          auth_id: "auth0|614ae95061718e0069e33e77",
          image_url:
            "https://s.gravatar.com/avatar/5091f298eb10686c05fb110c95c7ce0d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nulla felis, luctus et nunc vestibulum, cursus iaculis risus.",
          experience: "5+ years experience",
        }
      ]);
    });
};
