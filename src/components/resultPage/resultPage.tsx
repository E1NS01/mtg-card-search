import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CardImage,
  CardWrapper,
  ContentContainer,
  EditSearchButton,
  NavigationButton,
  NavigationContainer,
  NoCardsFoundContainer,
} from "../../styles/resultStyles";
import { ColorRepresentation } from "./colorRepresentation";
import { FormCardDisplay } from "./formCardDisplay";
import { useState } from "react";
import { Container } from "../../styles/globalStyle";

function ResultPage() {
  const [index, setIndex] = useState<number>(0);
  const cardListData = useSelector((state: RootState) => state.cardList);
  const navigate = useNavigate();

  const isSuccess = cardListData.data[0] !== "error";

  if (!isSuccess) {
    return (
      <Container>
        <NoCardsFoundContainer>
          <h1>No Cards found!</h1>
          <EditSearchButton onClick={() => navigate("/")}>
            Edit Search
          </EditSearchButton>
        </NoCardsFoundContainer>
      </Container>
    );
  }

  return (
    <Container>
      <CardWrapper>
        <ContentContainer>
          <FormCardDisplay />
          <div>
            <CardImage>
              <img src={cardListData.data[index]} alt="Card" />
              <NavigationContainer>
                <NavigationButton
                  disabled={index === 0}
                  onClick={() => {
                    setIndex((prev) => prev - 1);
                  }}
                >
                  ←
                </NavigationButton>
                <p>{`${index + 1} / ${cardListData.data.length}`}</p>
                <NavigationButton
                  disabled={index >= cardListData.data.length - 1}
                  onClick={() => {
                    setIndex((prev) => prev + 1);
                  }}
                >
                  →
                </NavigationButton>
              </NavigationContainer>
            </CardImage>
          </div>
        </ContentContainer>
        <div>
          <ColorRepresentation />
        </div>
        <EditSearchButton moveLeft={isSuccess} onClick={() => navigate("/")}>
          Edit Search
        </EditSearchButton>
      </CardWrapper>
    </Container>
  );
}

export default connect()(ResultPage);
