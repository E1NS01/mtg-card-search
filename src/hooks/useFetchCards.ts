import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCards } from "../lib/api";
import { updateCardList } from "../actions/cardListActions";

function useFetchCards(
  cardFormData: CardFormState,
  cardListData: CardListState
) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResults() {
      const cardData = await getCards(cardFormData);

      if (!Array.isArray(cardData.data)) {
        dispatch(
          updateCardList("error", {
            message: "Unexpected data format received.",
            url: "",
          })
        );
        return;
      }

      dispatch(updateCardList("data", cardData.data));
      dispatch(updateCardList("colors", cardData.colors));
      dispatch(updateCardList("error", cardData.error));
    }
    fetchResults();
  }, [cardFormData, dispatch]);

  useEffect(() => {
    if (cardListData.data.length > 0 || cardListData.error) {
      navigate("/result");
    }
  }, [cardListData, navigate]);

  return navigate;
}

export default useFetchCards;
