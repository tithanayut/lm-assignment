import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { useInView } from "react-intersection-observer";
import { HashRouter } from "react-router-dom";

import { getMenuList } from "@/common/queries/getMenuList";

import { MenuBody } from "./MenuBody";

jest.mock("@tanstack/react-query", () => ({
  useSuspenseInfiniteQuery: jest.fn(),
}));

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

jest.mock("@/common/queries/getMenuList", () => ({
  getMenuList: jest.fn(),
}));

jest.mock("./MenuDrawer", () => ({
  MenuDrawer: () => null,
}));

describe("MenuBody", () => {
  const MENU_LIST = {
    meta: { currentPage: 1, totalPage: 1 },
    data: [
      {
        menuId: "ข้าวมันไก่",
        name: "ข้าวมันไก่",
        fullPrice: 10,
        discountedPrice: 10,
        image: "https://image",
        isInStock: true,
      },
      {
        menuId: "ข้าวหน้าเป็ด",
        name: "ข้าวหน้าเป็ด",
        fullPrice: 10,
        discountedPrice: 10,
        image: "https://image-2",
        isInStock: true,
      },
    ],
  };

  beforeAll(() => {
    (useInView as jest.Mock).mockReturnValue({
      ref: { current: null },
      inView: false,
    });
    (useSuspenseInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [MENU_LIST],
      },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
    });
    (getMenuList as jest.Mock).mockResolvedValue(MENU_LIST);
  });

  it("should display the menu listing", () => {
    const screen = render(
      <HashRouter>
        <MenuBody restaurantId="1" />
      </HashRouter>,
    );

    const menuItems = screen.getAllByRole("link");
    expect(menuItems).toHaveLength(2);
    expect(menuItems[0]).toHaveAttribute("href", "#/ข้าวมันไก่");
    expect(menuItems[1]).toHaveAttribute("href", "#/ข้าวหน้าเป็ด");
  });

  it("should trigger infinite query when placeholder is in view", async () => {
    (useInView as jest.Mock).mockReturnValue({
      ref: { current: null },
      inView: true,
    });
    const fetchNextPage = jest.fn();
    (useSuspenseInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [MENU_LIST],
      },
      hasNextPage: true,
      fetchNextPage,
      isFetchingNextPage: false,
    });

    render(
      <HashRouter>
        <MenuBody restaurantId="1" />
      </HashRouter>,
    );

    expect(fetchNextPage).toHaveBeenCalledWith();
  });

  it("should display menu listing correctly when there is more than 1 page from infinite query", () => {
    (useSuspenseInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [MENU_LIST, MENU_LIST],
      },
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
    });

    const screen = render(
      <HashRouter>
        <MenuBody restaurantId="1" />
      </HashRouter>,
    );

    const menuItems = screen.getAllByRole("link");
    expect(menuItems).toHaveLength(4);
    expect(menuItems[0]).toHaveAttribute("href", "#/ข้าวมันไก่");
    expect(menuItems[1]).toHaveAttribute("href", "#/ข้าวหน้าเป็ด");
    expect(menuItems[2]).toHaveAttribute("href", "#/ข้าวมันไก่");
    expect(menuItems[3]).toHaveAttribute("href", "#/ข้าวหน้าเป็ด");
  });
});
