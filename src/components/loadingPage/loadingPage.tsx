import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCards } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { updateCardList } from "../../actions/cardListActions";
import { Container } from "../../styles/globalStyle";
import { LoadingContainer } from "../../styles/loadingStyles";

function LoadingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardFormData = useSelector((state: RootState) => state.cardForm);
  const cardListData = useSelector((state: RootState) => state.cardList);

  useEffect(() => {
    async function fetchResults() {
      const data = await getCards(cardFormData);
      dispatch(updateCardList("data", data.data));
      dispatch(updateCardList("colors", data.colors));
    }

    fetchResults();
  }, [cardFormData, navigate, dispatch]);

  useEffect(() => {
    if (cardListData.data.length > 0) {
      navigate("/result");
    }
  }, [cardListData, navigate]);

  return (
    <Container>
      <LoadingContainer>
        <img src="/mana_image.webp" alt="Magic Mana Types" />
      </LoadingContainer>
    </Container>
  );
}

function mapStateToProps(state: RootState) {
  return { cardListData: state.cardList };
}

const mapDispatchToProps = {
  updateCardList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
