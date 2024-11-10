import { useSelector } from "react-redux";
import {
  CardArtPlaceholder,
  CardDescription,
  CardHeader,
  CardName,
  CardType,
  ManaCost,
  MockCard,
  PowerToughness,
} from "../../styles/resultStyles";

export function FormCardDisplay() {
  const { name, cost, image, type, description, power, toughness } =
    useSelector((state: RootState) => state.cardForm);
  return (
    <MockCard>
      <CardHeader>
        <CardName>{name}</CardName>
        <ManaCost>{cost}</ManaCost>
      </CardHeader>
      <CardArtPlaceholder>{<img src={image} alt="" />}</CardArtPlaceholder>
      <CardType>{type}</CardType>
      <CardDescription>
        {description}

        <PowerToughness>
          {power || "x"}/{toughness || "x"}
        </PowerToughness>
      </CardDescription>
    </MockCard>
  );
}
