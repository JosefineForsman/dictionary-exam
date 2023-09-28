import { describe, it, expect, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen } from "@testing-library/react";
import WordItem from "./WordItem";
import userEvent from "@testing-library/user-event";
import mockMyWords from "../../../test/mocks/mockMyWords.json";
import LikedWordContextProvider from "../../LikedWordContext/LikedWordContext";

// This test file contains unit tests for the WordItem component. WordItem is responsible
// for rendering individual word items in the "My Word List." These tests cover the rendering
// of word items, toggling additional information on button click, and verifying the display
// of all information about a liked word.
// get mockMyWord from my json-file.

const server = setupServer(
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
  it('toggles info on "see more" button click', async () => {
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
    expect(infoContainer).toHaveClass("hidden");
    const seeMoreButton = screen.getByText("See more");
    await user.click(seeMoreButton);

    expect(infoContainer).toHaveClass("visible");

    expect(screen.getByText("noun")).toBeInTheDocument();
    expect(screen.getByText("verb")).toBeInTheDocument();
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
    const h1 = screen.getByRole("heading", { name: /hello/i });
    const definitions = screen.getAllByRole("listitem");
    const audioElement = screen.getAllByTestId("audio");
    const exampleElements = container.querySelectorAll(
      "p.my-word-list__text-example"
    );
    const seeMoreBtn = screen.getByRole("button", { name: /see more/i });
    const phoneticText = screen.getByText("/həˈləʊ/");

    expect(h1).toBeInTheDocument();
    expect(screen.getByText("noun")).toBeInTheDocument();
    expect(screen.getByText("verb")).toBeInTheDocument();
    expect(screen.getByText("interjection")).toBeInTheDocument();
    expect(definitions.length).toBe(5);
    expect(audioElement).toHaveLength(2);
    expect(exampleElements.length).toBe(3);
    expect(seeMoreBtn).toBeInTheDocument();
    expect(phoneticText).toBeInTheDocument();
  });
});
