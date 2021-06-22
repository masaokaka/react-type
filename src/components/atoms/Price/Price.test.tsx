import { render, screen } from "@testing-library/react";
import { Price } from "./Price";

describe("Price", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(<Price price={100} tax={true} bigsize={true} />);
    expect(screen.getByText(/100/)).toBeInTheDocument();
    // screen.debug();
  });
});
