import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../test-utils";
import UsersOnline from "./UsersOnline";

describe("Users Online Test", () => {
  it("Display the correct amount of onlione users", () => {
    const initialUsersOnline = {
      test1Account1: {
        auth_id: "test_auth_id_account",
        bio: null,
        email: "testerAccount@gmail.com",
        experience: null,
        id: 777,
        image_url:
          "https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png",
        role: "",
        username: "testerAccount",
      },
      test1Account2: {
        auth_id: "test_auth_id_account2",
        bio: null,
        email: "testerAccount2@gmail.com",
        experience: null,
        id: 778,
        image_url:
          "https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png",
        role: "",
        username: "testerAccount2",
      },
    };
    renderWithRedux(<UsersOnline />, {
      initialState: { usersOnline: initialUsersOnline },
    });
    const usersOnline = screen.getAllByRole("listitem").length;
    expect(usersOnline).toBe(2);
  });
});
