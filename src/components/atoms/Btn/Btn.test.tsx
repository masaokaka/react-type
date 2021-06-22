import { render, screen } from "@testing-library/react";
import { Btn } from "./Btn";

describe("Btn", () => {
  test("ボタンを表示する", () => {
    render(<Btn text="テスト" onClk={() => console.log("test")} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
