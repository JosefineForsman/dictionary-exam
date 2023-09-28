import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

// This test file contains test cases that focus on the interaction and behavior of the SearchBar component.
// It tests the rendering of the SearchBar, updates to input values, handling of empty input searches,
// and clearing of input values when the Enter key is pressed.

const user = userEvent.setup();
describe(SearchBar, () => {
  it(" should render SearchBar", () => {
    render(<SearchBar setInputSearch={vi.fn()} />);
  });
  it("should update the input value", async () => {
    render(<SearchBar setInputSearch={vi.fn()} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "cat");

    expect(input).toHaveValue("cat");
  });
  it("should show an error message when trying to search with an empty input", async () => {
    render(<SearchBar setInputSearch={vi.fn()} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "{enter}");

    const errorMessage = screen.getByText(
      "You are trying to search with an empty input. Please try again bud."
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it("should clear input value when enter key is pressed", async () => {
    render(<SearchBar setInputSearch={vi.fn()} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "dog{Enter}");

    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });
});
