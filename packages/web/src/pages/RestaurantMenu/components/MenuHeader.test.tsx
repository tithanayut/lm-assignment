import { useSuspenseQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react";

import { getRestaurantInfo } from "@/common/queries/getRestaurantInfo";

import { MenuHeader } from "./MenuHeader";

jest.mock("@tanstack/react-query", () => ({
  useSuspenseQuery: jest.fn(),
}));

jest.mock("@/common/queries/getRestaurantInfo", () => ({
  getRestaurantInfo: jest.fn(),
}));

describe("MenuHeader", () => {
  const RESTAURANT_INFO = {
    restaurantId: 1,
    name: "TEST",
    coverImage: "https://image",
    isOpen: true,
    activeTimePeriod: {
      open: "10:30",
      close: "20:00",
    },
  };

  beforeEach(() => {
    (getRestaurantInfo as jest.Mock).mockResolvedValue(RESTAURANT_INFO);
    (useSuspenseQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: RESTAURANT_INFO,
    });
  });

  it("should show detail and cover image correctly", () => {
    const screen = render(<MenuHeader restaurantId="1" />);

    const heading = screen.getByRole("heading", { name: /TEST/ });
    const coverImage = screen.getByAltText(/ภาพประกอบร้าน TEST/);
    const activeTime = screen.getByText(/เวลาเปิด - ปิด: 10:30 - 20:00/);

    expect(heading).toBeInTheDocument();
    expect(coverImage).toHaveAttribute("src", "https://image");
    expect(coverImage).toBeInTheDocument();
    expect(activeTime).toBeInTheDocument();
  });

  it("should show เปิด tag with green color when restaurant is open", () => {
    (useSuspenseQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { ...RESTAURANT_INFO, isOpen: true },
    });

    const screen = render(<MenuHeader restaurantId="1" />);

    const isOpen = screen.getByText("เปิด");

    expect(isOpen).toBeInTheDocument();
    expect(isOpen).toHaveClass("bg-[#0cbc25]");
  });

  it("should show ปิด tag with red color when restaurant is closed", () => {
    (useSuspenseQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { ...RESTAURANT_INFO, isOpen: false },
    });

    const screen = render(<MenuHeader restaurantId="1" />);

    const isOpen = screen.getByText("ปิด");

    expect(isOpen).toBeInTheDocument();
    expect(isOpen).toHaveClass("bg-red-600");
  });
});
