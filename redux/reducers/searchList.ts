// @ts-nocheck
import * as types from '../types';
import initialState from '../initialState';

const reducer = (state = initialState, {type, payload }) => {
  let searchList = state?.searchList || [];

  if (typeof window !== 'undefined') {
    const initialStateLIST = window.localStorage.getItem(
      'SEARCH_QUERY_LIST_STORAGE'
    );
    if (initialStateLIST !== null) {
      searchList = [
        ...new Set([...searchList, ...JSON.parse(initialStateLIST)]),
      ];
    }
  }

  switch (type) {
    case types.SEARCH_LIST:
      const list = [...new Set([...searchList, payload])];
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'SEARCH_QUERY_LIST_STORAGE',
          JSON.stringify(list)
        );
      }
      return {
        searchList: list,
      };
    default:
      return {
        searchList: [...searchList],
      };
  }
};

export default reducer;
