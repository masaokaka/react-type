import { render, screen } from "@testing-library/react";
import { IconBtn } from "./IconBtn";

describe("IconBtn", () => {
  test("アイコンボタンが指定通りに表示されているかどうかをテスト", () => {
    render(<IconBtn icon="Search" onClk={() => console.log("test")} />);
    expect(screen.getByRole("button"));
    // screen.debug()
  });
});
