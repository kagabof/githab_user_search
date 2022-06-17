/* eslint-disable import/no-anonymous-default-export */
// @ts-nocheck
import * as types from '../types';
import initialState from '../initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SEARCH_USERS:
      return {
        ...state,
        usersList: {
          error: payload.errors,
          data: payload.errors ? null : payload,
        },
      };
    default:
      return state;
  }
};
