import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe(SearchBar, () => {
  it(" should render SearchBar", () => {
    render(<SearchBar setInputSearch={vi.fn()} />);
  });
  it("should update the input value", async () => {
    render(<SearchBar setInputSearch={vi.fn()} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "cat");

    expect(input).toHaveValue("cat");
  });
  it("should show an error message when trying to search with an empty input", async () => {
    render(<SearchBar setInputSearch={vi.fn()} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "{enter}");

    const errorMessage = screen.getByText(
      "You are trying to search with an empty input. Please try again bud."
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it("should clear input value when Enter key is pressed", async () => {
    render(<SearchBar setInputSearch={vi.fn()} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "dog");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(input).toHaveTextContent("");
    });
  });
  it("should be able to search and display results", async () => {
    render(<SearchBar setInputSearch={vi.fn()} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "dog" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  });
});
