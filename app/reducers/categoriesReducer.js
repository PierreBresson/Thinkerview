import {
  FETCHING_CATEGORIES,
  FETCHING_CATEGORIES_SUCCESS,
  FETCHING_CATEGORIES_ERROR,
  SELECT_CATEGORY
} from "../actions/types";

const initialcategorySelected = {
  id: 0,
  name: "Toutes les interviews"
};
const initialState = {
  isFetchingCategories: false,
  errorFetchingCategories: false,
  all_categories: null,
  categorySelected: initialcategorySelected
};

export default (categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
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
        all_categories: action.categories,
        isFetchingCategories: false,
        errorFetchingCategories: false
      };
    case FETCHING_CATEGORIES_ERROR:
      return {
        ...state,
        ...initialState,
        isFetchingCategories: false,
        errorFetchingCategories: true
      };
    default:
      return state;
  }
});
