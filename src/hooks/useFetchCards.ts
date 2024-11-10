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
      const data = await getCards(cardFormData);
      dispatch(updateCardList("data", data.data));
      dispatch(updateCardList("colors", data.colors));
    }
    fetchResults();
  }, [cardFormData, dispatch]);

  useEffect(() => {
    if (cardListData.data.length > 0) {
      navigate("/result");
    }
  }, [cardListData, navigate]);

  return navigate;
}

export default useFetchCards;
