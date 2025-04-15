import { screen, render } from "@testing-library/react";
import Navbar from "../index";

describe("Navbar testing", () => {
  it("test rendered pages link", () => {
    const navigation = [
      { name: "Scheduler", href: "/schedule" },
      { name: "View Schedules", href: "/job-details" },
    ];
    render(<Navbar navigation={navigation} />);

    const navItem = screen.getByText(navigation[0].name);
    expect(navItem).toBeInTheDocument();
  });
});
