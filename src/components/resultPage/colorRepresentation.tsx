import { ColorCircle } from "./colorCircle";
import { ColorBar } from "../../styles/resultStyles";

export function ColorRepresentation() {
  return (
    <ColorBar>
      <ColorCircle color="white" />
      <ColorCircle color="blue" />
      <ColorCircle color="black" />
      <ColorCircle color="red" />
      <ColorCircle color="green" />
    </ColorBar>
  );
}
