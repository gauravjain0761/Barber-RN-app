import { ThunkAction } from "redux-thunk";
import { RootState } from "../helper/Types";
import { AnyAction } from "redux";
import {
  GETALLPACKAGEBYUSER,
  GET_ALL_PACKAGES,
  IS_LOADING,
} from "./dispatchTypes";
import { makeAPIRequest } from "../helper/apiGlobal";
import { GET, POST, api } from "../helper/apiConstants";
import { errorToast } from "../helper/globalFunction";

export const getAllPackageByUser =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let header = {
      "Content-Type": "application/json",
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.getAllPackageByUser + `${request?.data}`,
      headers: header,
    })
      .then((result: any) => {
        if (result.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          if (result?.data) {
            dispatch({
              type: GETALLPACKAGEBYUSER,
              payload: result?.data,
            });
          } else {
            errorToast(result.data);
          }
          if (request.onSuccess) request.onSuccess(result.data);
        }
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

export const getAllPackageByLocation =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    let header = {
      "Content-Type": "application/json",
    };
    dispatch({ type: IS_LOADING, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.allPackageByLocation,
      headers: header,
      data: request.data,
    })
      .then((result: any) => {
        if (result.status === 200) {
          dispatch({ type: IS_LOADING, payload: false });
          dispatch({
            type: GET_ALL_PACKAGES,
            payload: result?.data,
          });
        }
      })
      .catch((error: any) => {
        console.log("error", error);
        dispatch({ type: IS_LOADING, payload: false });
      });
  };
