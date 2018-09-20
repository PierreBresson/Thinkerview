import {
  FETCHING_CATEGORIES,
  FETCHING_CATEGORIES_SUCCESS,
  FETCHING_CATEGORIES_ERROR,
  SELECT_CATEGORY,
  CATEGORY_MODAL_ACTION
} from "../actions/types";

const initialcategorySelected = {
  id: 0,
  name: "Tous les interviews"
};
const initialState = {
  isFetchingCategories: false,
  errorFetchingCategories: false,
  all_categories: null,
  categorySelected: initialcategorySelected,
  categoryModalOpen: false
};

export default (categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_MODAL_ACTION:
      return {
        ...state,
        categoryModalOpen: !state.categoryModalOpen
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        categorySelected: action.category
      };
    case FETCHING_CATEGORIES:
      return {
        ...state,
        isFetchingCategories: true,
        errorFetchingCategories: false
      };
    case FETCHING_CATEGORIES_SUCCESS:
      return {
        ...state,
        all_categories: [initialcategorySelected, ...action.categories],
        isFetchingCategories: false,
        errorFetchingCategories: false
      };
    case FETCHING_CATEGORIES_ERROR:
      return {
        ...state,
        errorFetchingCategories: false,
        errorFetchingCategories: true
      };
    default:
      return state;
  }
});
