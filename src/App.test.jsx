import { it, describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Phonetic from "./components/MyWordList/Phonetic/Phonetic";
import userEvent, { UserEvent } from "@testing-library/user-event";

const user = userEvent.setup();
describe(App, () => {
  it("should be able to find searchBar and get info", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");

    await user.type(input, "hello");
    const searchResult = screen.getByRole("heading", { level: 1 });
    expect(searchResult).toBeInTheDocument;
  });
  it("should toggle dark theme in header component", () => {
    render(<App />);
    const toggleBtn = screen.getByRole("checkbox");
    const header = screen.getByRole("banner");

    expect(toggleBtn).toBeInTheDocument;
    user.click(toggleBtn);
    expect(header).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
  });
  it("should show error message when trying to search with empty input", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    await user.type(input, "{enter}");

    const displayMessage = screen.getByText(
      "You are trying to search with an empty input. Please try again bud.",
      { exact: false }
    );
    expect(displayMessage).toBeInTheDocument();
  });
  it("should be able to write in a word, like it, press on favorite list and see the word in the list.", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "dog{enter}");

    const h1 = await screen.findByText("dog");
    expect(h1).toBeInTheDocument();

    const addFavoriteStarBtn = screen.getByTestId("star");
    await user.click(addFavoriteStarBtn);
    expect(addFavoriteStarBtn).toHaveClass("star filled");

    const favoriteList = screen.getByText("My Favorites", { exact: false });
    await user.click(favoriteList);

    const displayLikedWord = await screen.findByText("dog");
    expect(displayLikedWord).toBeInTheDocument();
  });

  it("should remove a favorite word from the favorite list", async () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    user.type(input, "dog{enter}");
    const h1 = await screen.findByText("dog");
    expect(h1).toBeInTheDocument();

    const addFavoriteStarBtn = screen.getByTestId("star");
    await user.click(addFavoriteStarBtn);
    expect(addFavoriteStarBtn).toHaveClass("star filled");

    const favoriteList = screen.getByText("My Favorites", { exact: false });
    fireEvent.click(favoriteList);

    const displayLikedWord = await screen.findByText("dog");
    expect(displayLikedWord).toBeInTheDocument();

    const starArticle = screen.getByTestId("remove-star");
    fireEvent.click(starArticle);

    expect(displayLikedWord).not.toBeInTheDocument();
    screen.debug();
  });
});
