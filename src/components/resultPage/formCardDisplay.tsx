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
  const cardFormData = useSelector((state: RootState) => state.cardForm);
  return (
    <MockCard>
      <CardHeader>
        <CardName>{cardFormData.name}</CardName>
        <ManaCost>{cardFormData.cost}</ManaCost>
      </CardHeader>
      <CardArtPlaceholder>
        {<img src={cardFormData.image} alt="" />}
      </CardArtPlaceholder>
      <CardType>{cardFormData.type}</CardType>
      <CardDescription>
        {cardFormData.description}

        <PowerToughness>
          {cardFormData.power || "x"}/{cardFormData.toughness || "x"}
        </PowerToughness>
      </CardDescription>
    </MockCard>
  );
}
