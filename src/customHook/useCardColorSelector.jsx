import { useState } from "react";

const useCardColorSelector = () => {
  const [border, setBorder] = useState({
    sora: "border-blackBorder",
    pink: "border-none",
    green: "border-none",
  });
  const [colorSelected, setColorSelected] = useState("");

  // 뭐 하나를 클릭했을때 그친구만 보더를 바꾸고, 다른 친구들은 보더를 없앤다.
  // a를 클릭했을 때 클릭함수의 매개변수로 a를 줘서 그걸 useCardColorSelector까지 전달한다.
  // 모든 보더를 제거하고 a만 보더를 준다.

  const eventHandler = (color) => {
    setColorSelected(color);
    setBorder({
      sora: "border-none",
      pink: "border-none",
      green: "border-none",
    });
    setBorder((prev) => ({ ...prev, [color]: "border-blackBorder" }));
  };

  return {
    border,
    colorSelected,
    eventHandler,
  };
};
export default useCardColorSelector;
