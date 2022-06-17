/* eslint-disable import/no-anonymous-default-export */
// @ts-nocheck
import * as types from '../types';
import initialState from '../initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.USER_REPO:
      return {
        userRepo: {
          error: payload.errors,
          data: payload.errors ? null : payload,
        },
      };
    default:
      return state;
  }
};
