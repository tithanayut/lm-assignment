import { useSuspenseQuery } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react";

import { getMenuItem } from "@/common/queries/getMenuItem";

import { MenuDrawerContent } from "./MenuDrawerContent";

jest.mock("@tanstack/react-query", () => ({
  useSuspenseQuery: jest.fn(),
}));

jest.mock("@/common/queries/getMenuItem", () => ({
  getMenuItem: jest.fn(),
}));

describe("MenuDrawerContent", () => {
  const MENU_ITEM = {
    menuId: "ข้าวหน้าเป็ด",
    name: "ข้าวหน้าเป็ด",
    image: "https://image",
    fullPrice: 120,
    discountedPrice: 100,
    isInStock: true,
    options: [
      { label: "เนื้อสัตว์", choices: [{ label: "หมู" }, { label: "ไก่" }] },
      { label: "ผักโรย", choices: [{ label: "ผักชี" }, { label: "แตงกวา" }] },
    ],
  };

  beforeEach(() => {
    (getMenuItem as jest.Mock).mockResolvedValue(MENU_ITEM);
    (useSuspenseQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: MENU_ITEM,
    });
  });

  it("should show name, price (discounted), and image correctly", () => {
    const screen = render(<MenuDrawerContent restaurantId="1" menuId="ข้าวหน้าเป็ด" />);

    const heading = screen.getByRole("heading", { name: /ข้าวหน้าเป็ด/ });
    const image = screen.getByRole("img", { name: /ภาพประกอบเมนู ข้าวหน้าเป็ด/ });
    const price = screen.getByText(/100 บาท/);

    expect(heading).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://image");
    expect(price).toBeInTheDocument();
  });

  it("should add (หมด) to the name when menu is out of stock", () => {
    (useSuspenseQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { ...MENU_ITEM, isInStock: false },
    });

    const screen = render(<MenuDrawerContent restaurantId="1" menuId="ข้าวหน้าเป็ด" />);

    const heading = screen.getByRole("heading", { name: /ข้าวหน้าเป็ด \(หมด\)/ });

    expect(heading).toBeInTheDocument();
  });

  it("should display placeholder image when image is not available", () => {
    (useSuspenseQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { ...MENU_ITEM, image: undefined },
    });

    const screen = render(<MenuDrawerContent restaurantId="1" menuId="ข้าวหน้าเป็ด" />);

    const image = screen.queryByRole("img", { name: /ภาพประกอบเมนู ข้าวหน้าเป็ด/ });
    const placeholderImage = screen.getByText(/ไม่มีภาพประกอบ/);

    expect(image).not.toBeInTheDocument();
    expect(placeholderImage).toBeInTheDocument();
  });

  it('should copy the current URL to clipboard when "copy link" button is clicked', () => {
    const writeText = jest.fn();
    Object.assign(window.navigator, { clipboard: { writeText } });

    const screen = render(<MenuDrawerContent restaurantId="1" menuId="ข้าวหน้าเป็ด" />);

    const copyLinkButton = screen.getByRole("button", { name: /คัดลอกลิงก์/ });
    fireEvent.click(copyLinkButton);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(writeText).toHaveBeenCalled();
  });

  it("should display options and choices correctly", () => {
    const screen = render(<MenuDrawerContent restaurantId="1" menuId="ข้าวหน้าเป็ด" />);

    const option1 = screen.getByText(/เนื้อสัตว์/);
    const choice1 = screen.getByText(/หมู/);
    const choice2 = screen.getByText(/ไก่/);

    const option2 = screen.getByText(/ผักโรย/);
    const choice3 = screen.getByText(/ผักชี/);
    const choice4 = screen.getByText(/แตงกวา/);

    expect(option1).toBeInTheDocument();
    expect(choice1).toBeInTheDocument();
    expect(choice2).toBeInTheDocument();

    expect(option2).toBeInTheDocument();
    expect(choice3).toBeInTheDocument();
    expect(choice4).toBeInTheDocument();
  });
});
