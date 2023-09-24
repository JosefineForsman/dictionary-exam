import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe(Header, () => {
  it("should render header", () => {
    render(<Header />);
    const message = screen.getByRole("heading", { level: 1 });
    expect(message).toBeInTheDocument;
  });
  it("should have a toggle button dark/light mode", () => {
    render(<Header />);
    const toggleBtn = screen.getByRole("checkbox");
    expect(toggleBtn).toBeInTheDocument;
  });
  it("should have a favorite-list", () => {
    render(<Header />);
    const favoriteList = screen.queryByText("my favorites");
    expect(favoriteList).toBeInTheDocument;
  });
});
