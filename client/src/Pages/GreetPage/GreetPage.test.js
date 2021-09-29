import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../../test-utils";
import GreetPage from "./GreetPage";
import { expressJwtSecret } from "jwks-rsa";

describe("Greet Page testing", () => {
  it("renders the images withing the greet page", () => {
    renderWithRouter(<GreetPage />);
    const logo = screen.getAllByRole("img");
    expect(logo[0]).toHaveAttribute("src", "/logo.png");
    expect(logo[1]).toHaveAttribute("src", "/connection.png");
  });
});
