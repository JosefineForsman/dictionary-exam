import { describe, it, expect, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, fireEvent } from "@testing-library/react";
import WordItem from "./WordItem";
import mockMyWords from "../../../test/mocks/mockMyWords.json";
import LikedWordContextProvider from "../../LikedWordContext/LikedWordContext";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  // Här kan du definiera mockade endpoints som du använder i dina tester
  rest.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/hello",
    (req, res, ctx) => {
      return res(ctx.json({ word: mockMyWords }));
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
  it("should show all information about a liked word", () => {
    const { container } = render(
      <LikedWordContextProvider>
        <WordItem
          wordItem={mockMyWords[0]}
          theme={vi.fn()}
          handleDeleteClick={vi.fn()}
        />
      </LikedWordContextProvider>
    );
    screen.debug();
    const h1 = screen.getByRole("heading", { name: /hello/i });
    const definitions = screen.getAllByRole("listitem");
    const audioElement = screen.getAllByTestId("audio");
    const exampleElements = container.querySelectorAll(
      "p.my-word-list__text-example"
    );
    const seeMoreBtn = screen.getByRole("button", { name: /see more/i });
    const phonetics = screen.getAllByRole("heading", { level: 3 });

    expect(h1).toBeInTheDocument();
    expect(screen.getByText("noun")).toBeInTheDocument();
    expect(screen.getByText("verb")).toBeInTheDocument();
    expect(screen.getByText("interjection")).toBeInTheDocument();
    expect(definitions.length).toBe(5);
    expect(audioElement).toHaveLength(2);
    expect(exampleElements.length).toBe(3);
    expect(seeMoreBtn).toBeInTheDocument();
    expect(phonetics.length).toBe(2);
  });
});
