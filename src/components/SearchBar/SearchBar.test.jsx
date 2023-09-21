import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe(SearchBar, () => {
  it(" should render SearchBar", () => {
    render(<SearchBar inputSearch={""} setInputSearch={vi.fn()} />);
  });
  it("should be able to accept input from user", async () => {
    render(<SearchBar inputSearch={""} setInputSearch={vi.fn()} />);
    const user = userEvent.setup(); // create user.
    const input = screen.getByRole("textbox");

    await user.type(input, "cat");

    expect(input).toHaveValue("cat");
  });
});
