import { useQuery } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

import { getRestaurantList } from "@/common/queries/getRestaurantList";

import { RestaurantSelection } from "./RestaurantSelection";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("@/common/queries/getRestaurantList", () => ({
  getRestaurantList: jest.fn(),
}));

describe("RestaurantSelection", () => {
  const navigate = jest.fn();
  const RESTAURANTS = [
    { restaurantId: 1, name: "A" },
    { restaurantId: 2, name: "B" },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (getRestaurantList as jest.Mock).mockResolvedValue(RESTAURANTS);
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: RESTAURANTS,
    });
  });

  it("renders heading correctly", () => {
    const screen = render(<RestaurantSelection />);

    const heading = screen.getByRole("heading", { name: "สั่งไรดี" });

    expect(heading).toBeInTheDocument();
  });

  it("renders restaurant options correctly", () => {
    const screen = render(<RestaurantSelection />);

    const select = screen.getByRole("combobox");

    fireEvent.focus(select);
    fireEvent.keyDown(select, { key: "ArrowDown", code: 40 });

    expect(select).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
