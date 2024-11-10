import { useSelector } from "react-redux";
import { Container } from "../../styles/globalStyle";
import { LoadingContainer } from "../../styles/loadingStyles";
import useFetchCards from "../../hooks/useFetchCards";

function LoadingPage() {
  const cardFormData = useSelector((state: RootState) => state.cardForm);
  const cardListData = useSelector((state: RootState) => state.cardList);

  useFetchCards(cardFormData, cardListData);

  return (
    <Container>
      <LoadingContainer>
        <img src="/mana_image.webp" alt="Magic Mana Types" />
      </LoadingContainer>
    </Container>
  );
}

export default LoadingPage;
