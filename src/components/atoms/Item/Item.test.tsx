import { render, screen } from "@testing-library/react";
import { Item } from "./Item";

const testItem = {
  id: 1,
  name: "カレー",
  text: "美味しいカレーです",
  mprice: 2000,
  lprice: 3000,
  img: "URL",
};

describe("Item", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(<Item item={testItem} />);
    expect(screen.getByText("カレー")).toBeInTheDocument();
    // screen.debug();
  });
});
