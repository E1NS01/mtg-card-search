import { useSelector } from "react-redux";
import { Circle } from "../../styles/resultStyles";

export function ColorCircle({ color }: ColorCircleProps) {
  const cardListData = useSelector((state: RootState) => state.cardList);
  return (
    <Circle color={color}>
      <p>{`${(
        (cardListData.colors[color] / cardListData.data.length) *
        100
      ).toFixed(2)}%`}</p>
    </Circle>
  );
}
