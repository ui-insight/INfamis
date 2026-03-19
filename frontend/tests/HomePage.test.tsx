import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import HomePage from "../src/pages/HomePage";

describe("HomePage", () => {
  it("renders the heading and project link", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "INfamis" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("View Project Requests"),
    ).toBeInTheDocument();
  });
});
