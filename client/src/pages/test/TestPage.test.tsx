import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestPage from "./TestPage";

describe("TestPage", () => {
  test("test render", () => {
    render(<TestPage />);
    const testText = screen.getByText(/testpage/i);
    expect(testText).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/input text/i);
    expect(input).toMatchSnapshot();
    expect(input).toBeInTheDocument();
  });

  test("test toggle block visible", () => {
    render(<TestPage />);
    const toggleBtn = screen.getByTestId("toggleBtn");
    expect(screen.queryByTestId("toggleBlock")).toBeNull();
    fireEvent.click(toggleBtn);
    expect(screen.queryByTestId("toggleBlock")).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.queryByTestId("toggleBlock")).toBeNull();
  });

  test("textarea input", () => {
    render(<TestPage />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toContainHTML("");
    fireEvent.input(textarea, {
      target: { value: "123" },
    });
    expect(textarea).toContainHTML("123");
  });
});
