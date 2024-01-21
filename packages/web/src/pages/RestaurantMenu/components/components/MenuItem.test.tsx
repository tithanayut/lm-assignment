import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

import { MenuItem } from "./MenuItem";

describe("MenuItem", () => {
  it("should display basic detail", () => {
    const screen = render(
      <HashRouter>
        <MenuItem
          id="ข้าวมันไก่"
          name="ข้าวมันไก่"
          fullPrice={10}
          discountedPrice={10}
          image="https://image"
          isInStock
        />
      </HashRouter>,
    );

    const heading = screen.getByRole("heading", { name: /ข้าวมันไก่/ });
    const price = screen.getByText(/10 บาท/);
    const image = screen.getByRole("img", { name: /ข้าวมันไก่/ });

    expect(heading).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://image");
  });

  it("should display discounted price and full price with strikethrough when fullPrice != discountedPrice", () => {
    const screen = render(
      <HashRouter>
        <MenuItem
          id="ข้าวมันไก่"
          name="ข้าวมันไก่"
          fullPrice={10}
          discountedPrice={5}
          image="https://image"
          isInStock
        />
      </HashRouter>,
    );

    const fullPrice = screen.getByText(/10 บาท/);
    const discountedPrice = screen.getByText(/5 บาท/);

    expect(fullPrice).toBeInTheDocument();
    expect(fullPrice).toHaveClass("line-through");
    expect(discountedPrice).toBeInTheDocument();
  });

  it("should display no image when image is not provided", () => {
    const screen = render(
      <HashRouter>
        <MenuItem id="ข้าวมันไก่" name="ข้าวมันไก่" fullPrice={10} discountedPrice={10} isInStock />
      </HashRouter>,
    );

    const image = screen.queryByRole("img", { name: /ข้าวมันไก่/ });
    const imagePlaceholder = screen.getByText(/ไม่มีภาพประกอบ/);

    expect(image).not.toBeInTheDocument();
    expect(imagePlaceholder).toBeInTheDocument();
  });

  it("should add (หมด) to the heading when isInStock is false", () => {
    const screen = render(
      <HashRouter>
        <MenuItem id="ข้าวมันไก่" name="ข้าวมันไก่" fullPrice={10} discountedPrice={10} isInStock={false} />{" "}
      </HashRouter>,
    );

    const heading = screen.getByRole("heading", { name: /ข้าวมันไก่ \(หมด\)/ });

    expect(heading).toBeInTheDocument();
  });

  it('should navigate to "/:menuId" when clicked', () => {
    const screen = render(
      <HashRouter>
        <MenuItem id="ข้าวมันไก่" name="ข้าวมันไก่" fullPrice={10} discountedPrice={10} isInStock />
      </HashRouter>,
    );

    const link = screen.getByRole("link", { name: /ข้าวมันไก่/ });

    expect(link).toHaveAttribute("href", "#/ข้าวมันไก่");
  });
});
