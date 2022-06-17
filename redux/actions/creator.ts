/* eslint-disable import/no-anonymous-default-export */
import * as types from '../types';


export default (actionType: string, payload: any) => ({
  // @ts-ignore
  type: types[actionType],
  payload,
});
