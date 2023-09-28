import { it, describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import ThemeContextProvider from "./components/ThemeContext/ThemeContext";
import userEvent from "@testing-library/user-event";

// This test file contains a series of test cases that tests the interaction between components in the App.
// It covers scenarios such as toggling themes, searching for words, adding/removing favorites, displaying error messages, and more.

const user = userEvent.setup();
describe(App, () => {
  it("should toggle dark theme in header component", async () => {
    render(
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    );

    const toggleBtn = screen.getByRole("checkbox");
    const header = screen.getByRole("banner");

    expect(header).not.toHaveClass("header dark");
    await user.click(toggleBtn);
    expect(header).toHaveClass("header dark");
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
    await user.type(input, "dog{enter}");

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

  it("should delete a favorite word from the favorite list", async () => {
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
  });
  it("should render error message from the api if the word does not exist there", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");

    await user.type(input, "asdfadsg{enter}");

    const errorMessage = await screen.findByText("No Definitions Found");
    expect(errorMessage).toBeInTheDocument();
  });
  it("should be able to play audio ", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await user.type(input, "carrot{enter}");
    const world = await screen.findByText("carrot");
    expect(world).toBeInTheDocument();

    const audioElement = screen.getByTestId("audio");
    expect(audioElement).toBeInTheDocument();
    fireEvent.play(audioElement);
    expect(audioElement.volume).toBeGreaterThan(0);
  });
  it("should be able to render out more words if the api have an array of the same words.", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await user.type(input, "rat{enter}");
    const rats = await screen.findAllByText("rat");
    expect(rats.length).toBe(3);
  });
  it("should be able to render synonyms and antonyms", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await user.type(input, "mood{enter}");
    const searchWord = screen.getAllByDisplayValue("mood");
    expect(searchWord.length).toBeGreaterThan(0);
    const synonyms = await screen.findAllByText(/Synonyms:/i);
    expect(synonyms.length).toBe(3);
    const antonyms = await screen.findByText(/Antonyms:/i);
    expect(antonyms).toBeInTheDocument();
  });
});
