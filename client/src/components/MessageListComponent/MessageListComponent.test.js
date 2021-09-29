import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../test-utils";
import MessageListComponent from "./MessageListComponent";
import { getByAltText } from "@testing-library/react";

describe("Message list component", () => {
  it("Should display the correct Messages", () => {
    const dummyUser = [
      {
        auth_id: "test_auth_id_account",
        bio: null,
        email: "testerAccount@gmail.com",
        experience: null,
        id: 4,
        image_url:
          "https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png",
        role: "",
        username: "testerAccount",
      },
      {
        auth_id: "test_auth_id_account2",
        bio: null,
        email: "testerAccount2@gmail.com",
        experience: null,
        id: 3,
        image_url:
          "https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder.png",
        role: "",
        username: "testerAccount2",
      },
    ];

    const dummyMessages = {
      3: [
        {
          date: 1632725540891,
          from: 3,
          id: 4,
          message: "asdads",
          message_id: 4,
          time: 1632725540891,
          to: 4,
        },
        {
          date: 1632764644885,
          from: 3,
          id: 10,
          message: "it's working",
          message_id: 10,
          time: 1632764644885,
          to: 4,
        },
      ],
    };

    renderWithRedux(<MessageListComponent />, {
      initialState: {
        users: dummyUser,
        messages: dummyMessages,
      },
    });
    const userMessage = screen.getAllByRole("listitem").length;
    expect(
      screen.getByText("it's working", { exact: false })
    ).toBeInTheDocument();
    expect(userMessage).toBe(1);
  });
});
