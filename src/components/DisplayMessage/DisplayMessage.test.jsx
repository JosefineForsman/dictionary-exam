import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DisplayMessage from "./DisplayMessage";

describe(DisplayMessage, () => {
  it("should display message", () => {
    render(<DisplayMessage title={""} message={""} resolution={""} />);
    const message = screen.getByRole("heading", { level: 2 });
    expect(message).toBeInTheDocument();

    screen.debug();
  });
});
