import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

//this component test functionality for togglebutton + favoritlist.

describe(Header, () => {
  it("should render header", () => {
    render(<Header />);
    const title = screen.getByText("Word Finder");
    expect(title).toBeInTheDocument;
  });
  it("should have a toggle button dark/light mode", () => {
    render(<Header />);
    const toggleBtn = screen.getByRole("checkbox");
    expect(toggleBtn).toBeInTheDocument;
  });
  it("should have a favorite-list", () => {
    render(<Header />);
    const favoriteList = screen.getByText("My favorites", { exact: false });
    expect(favoriteList).toBeInTheDocument;
  });
});
