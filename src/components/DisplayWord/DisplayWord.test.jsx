import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisplayWord from "./DisplayWord";
import DisplayMessage from "../DisplayMessage/DisplayMessage";
import LikedWordContextProvider from "../LikedWordContext/LikedWordContext";
import { server } from "../../test/mocks/mockServer";
import mockWords from "../../test/mocks/mockWords.json";

beforeAll(() => server.listen());
afterAll(() => server.close());

// this component render all information about a word with help of my json myWords.
// it makes sure that the functionality for example my button "see more", works the way it should.

describe("DisplayWord", () => {
  it("should display words when inputSearch is provided", () => {
    render(
      <LikedWordContextProvider>
        <DisplayWord inputSearch={mockWords} />
      </LikedWordContextProvider>
    );
    const wordElements = screen.getAllByRole("heading", { level: 1 });
    expect(wordElements.length).toBe(mockWords.length);
  });
  it("should toggle star when star icon is clicked", () => {
    const { container } = render(
      <LikedWordContextProvider>
        <DisplayWord inputSearch={mockWords} />
      </LikedWordContextProvider>
    );
    const starIcon = container.querySelector(".star");
    fireEvent.click(starIcon);
    expect(starIcon).toHaveClass("filled");
  });
  it("should not display words when inputSearch is empty or invalid", () => {
    render(
      <LikedWordContextProvider>
        <DisplayWord inputSearch={[]} />
      </LikedWordContextProvider>
    );

    const wordElements = screen.queryAllByRole("heading", { level: 1 });
    expect(wordElements.length).toBe(0);
  });
  it("should not display words when inputSearch is null or undefined", () => {
    render(
      <LikedWordContextProvider>
        <DisplayWord inputSearch={null} />
      </LikedWordContextProvider>
    );
    const wordElements = screen.queryAllByRole("heading", { level: 1 });
    expect(wordElements.length).toBe(0);
  });
  it("should diplay all information about a word", () => {
    const { container } = render(
      <LikedWordContextProvider>
        <DisplayWord inputSearch={mockWords} />
      </LikedWordContextProvider>
    );

    const h1 = screen.getByRole("heading", { name: /hello/i });
    const definitions = screen.getAllByRole("listitem");
    const audioElement = screen.getAllByTestId("audio");
    const exampleElements = container.querySelectorAll("p.example");
    const seeMoreBtn = screen.getByRole("button", { name: /see more/i });
    const phonetics = screen.queryAllByRole("heading", { level: 3 });

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
  it("should show more information when pressing on see more button", async () => {
    render(
      <LikedWordContextProvider>
        <DisplayWord inputSearch={mockWords} />
      </LikedWordContextProvider>
    );
    expect(screen.getAllByText(/Example:/).length).toBe(3);
    const seeMoreButton = screen.getByRole("button", { name: /See More/i });
    const user = userEvent.setup();
    await user.click(seeMoreButton);
    expect(screen.getAllByText(/Example:/).length).toBe(5);
  });
});
