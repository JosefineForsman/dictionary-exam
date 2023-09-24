import { describe, it, expect, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, fireEvent } from "@testing-library/react";
import WordItem from "./WordItem";
import mockMyWords from "../../../test/mockMyWords.json";
import LikedWordContextProvider from "../../LikedWordContext/LikedWordContext";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  // Här kan du definiera mockade endpoints som du använder i dina tester
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/hello",
    (req, res, ctx) => {
      return res(ctx.json({ word: "mockMyWords" }));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe(WordItem, () => {
  it("should render wordItem", () => {
    render(
      <LikedWordContextProvider>
        <WordItem
          wordItem={mockMyWords[0]}
          theme={vi.fn()}
          handleDeleteClick={vi.fn()}
        />
      </LikedWordContextProvider>
    );
  });
  it('toggles info on "see more" click', async () => {
    const { container } = render(
      <LikedWordContextProvider>
        <WordItem
          wordItem={mockMyWords[0]}
          theme={vi.fn()}
          handleDeleteClick={vi.fn()}
        />
      </LikedWordContextProvider>
    );
    const user = userEvent.setup();
    const infoContainer = container.querySelector(".info-container");
    expect(infoContainer).toHaveClass("hidden"); // Förvänta dig att klassen är "hidden" från början
    const seeMoreButton = screen.getByText("See more");
    await user.click(seeMoreButton);

    expect(infoContainer).toHaveClass("visible"); // Förvänta dig att klassen har ändrats till "visible"
  });
  it("should be able to click on star", async () => {
    render(
      <LikedWordContextProvider>
        <WordItem
          wordItem={mockMyWords[0]}
          theme={vi.fn()}
          handleDeleteClick={vi.fn()}
        />
      </LikedWordContextProvider>
    );
    const starArticle = screen.getByTestId("remove-star");
    const user = userEvent.setup();
    await user.click(starArticle);
  });
});
