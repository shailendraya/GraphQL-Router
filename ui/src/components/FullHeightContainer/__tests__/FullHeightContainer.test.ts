import { screen, render } from "@testing-library/react";
import FullHeightContainer from "..";

describe("full height container layout test", () => {
  it("check for presence of children", () => {
    const args = {
      children: <div>Hello</div>,
      backgroundImage: "dummy.image.jpeg",
    };
    render(<FullHeightContainer {...args} />);

    const children = screen.getByText(/hello/i);

    expect(children).toBeInTheDocument();
  });
});
