import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DisplayWord from "./DisplayWord";
import mockWords from "../../test/mockWords.json";
import DisplayMessage from "../DisplayMessage/DisplayMessage";
import LikedWordContextProvider from "../LikedWordContext/LikedWordContext";

describe(DisplayWord, () => {
  it("Should render the heading Hello", async () => {
    render(
      <LikedWordContextProvider>
        {" "}
        // rendering this because i'm using dispatch in the component.
        <DisplayWord inputSearch={mockWords} dispatch={vi.fn()} />
      </LikedWordContextProvider>
    );

    const h1 = screen.getByRole("heading", { level: 1 });

    expect(h1).toBeInTheDocument();
  });
});
