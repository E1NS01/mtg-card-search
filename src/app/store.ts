import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardFormReducer from "../reducers/cardFormReducer";
import cardListReducer from "../reducers/cardListReducer";

const rootReducer = combineReducers({
  cardForm: cardFormReducer,
  cardList: cardListReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
