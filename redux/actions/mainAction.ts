/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import creator from './creator';

const mainAction =
  (method: 'get' | 'post', baseUrl: string, endpoint: string, actionType: string, data: any, callback = (arg: any) => {}) => (dispatch: Function): any => {
    dispatch(
      creator(actionType, {
        isLoading: true,
      }),
    );
    // @ts-ignore
    return axios[method?.toLowerCase()](baseUrl + endpoint, data)
      .then((response: any) => {
        dispatch(creator(actionType, response?.data));
        if (typeof callback === 'function') callback(response);
      })
      .catch((error: any) => {
        dispatch(
          creator(actionType, {
            resp_code: 500,
            resp_msg: 'Something went wrong',
          }),
        );
      });
  };

export { mainAction };
