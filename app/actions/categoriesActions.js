import {
  FETCHING_CATEGORIES,
  FETCHING_CATEGORIES_SUCCESS,
  FETCHING_CATEGORIES_ERROR,
  SELECT_CATEGORY,
  CATEGORY_MODAL_ACTION
} from "./types";
import getAllCategories from "../services/api/getAllCategories";

export const categoryModalAction = () => {
  return {
    type: CATEGORY_MODAL_ACTION
  };
};

export const selectCategory = category => {
  return {
    type: SELECT_CATEGORY,
    category
  };
};

export const getCategories = () => {
  return {
    type: FETCHING_CATEGORIES
  };
};

export const getCategoriesSuccess = categories => {
  return {
    type: FETCHING_CATEGORIES_SUCCESS,
    categories
  };
};

export const getCategoriesFailure = err => {
  return {
    type: FETCHING_CATEGORIES_ERROR,
    err
  };
};

export const categoriesFetcher = () => {
  return (dispatch, getState) => {
    dispatch(getCategories());
    getAllCategories()
      .then(res => {
        dispatch(getCategoriesSuccess(res));
      })
      .catch(err => {
        dispatch(getCategoriesFailure(err));
      });
  };
};
