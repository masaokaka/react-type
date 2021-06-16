import React from "react";

interface Props {
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

export const CalcTotal = ({ totalPrice, setTotalPrice }: Props) => {
  return <h2>合計：{totalPrice}円(税込)</h2>;
};
