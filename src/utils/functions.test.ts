import { render, screen } from "@testing-library/react";
import { maxHeaderSize } from "http";
import { SIZE_L_STATUS, SIZE_M_STATUS } from "../state/const";
import {
  createRandomId,
  calcTotal,
  searchAddress,
  validateOrderDate,
  timestampToDate,
} from "./functions";

test("ランダムID生成関数のランダム性のテスト", () => {
  const max = 100;
  for (let i = 0; i <= max; i++) {
    expect(createRandomId()).not.toBe(createRandomId());
  }
});

test("計算処理の確認", () => {
  const items = [
    {
      id: 1,
      name: "1カレー",
      text: "1美味しいカレーです",
      mprice: 2000,
      lprice: 3000,
      img: "1URL",
    },
    {
      id: 2,
      name: "2カレー",
      text: "2美味しいカレーです",
      mprice: 800,
      lprice: 1550,
      img: "2URL",
    },
  ];
  const itemId = 1; //商品
  const itemNum = 1; //個数
  const itemSize = SIZE_M_STATUS; //Mサイズ入れた場合
  const toppings = [
    { id: 1, size: SIZE_M_STATUS },
    { id: 2, size: SIZE_L_STATUS },
  ];
  const result = (items[0].mprice + 200 + 300) * itemNum;
  expect(calcTotal(items, itemId, itemSize, itemNum, toppings)).toBe(result);
});

test("住所検索API", (done) => {
  searchAddress("000-0000")
    .then((res) => {
      expect(res).toBe("東京都板橋区東坂下");
      done();
    })
      .catch((res) => {
      expect(res).toBe("取得に失敗しました。");
      done();
    });
});
