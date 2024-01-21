import { fireEvent, render } from "@testing-library/react";

import { MenuDrawer } from "./MenuDrawer";

jest.mock("./components/MenuDrawerContent", () => ({
  MenuDrawerContent: () => null,
}));

describe("MenuDrawer", () => {
  it("should display close button", () => {
    const screen = render(<MenuDrawer isOpen setOpen={() => {}} restaurantId="1" menuId="" />);

    const closeButton = screen.getByRole("button", { name: "ปิด" });

    expect(closeButton).toBeInTheDocument();
  });

  it("should close drawer when close button is clicked", () => {
    const closeFn = jest.fn();
    const screen = render(<MenuDrawer isOpen setOpen={closeFn} restaurantId="1" menuId="" />);

    const closeButton = screen.getByRole("button", { name: "ปิด" });

    fireEvent.click(closeButton);

    expect(closeFn).toHaveBeenCalledWith(false);
  });
});
