import axios from "axios";

import { Config } from "../secret_config.js";
import { fillReportTables } from "./helpers";
// Add a request interceptor
axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem("access_token");
        if (token && !config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },

    error => {
        return Promise.reject(error);
    }
);
// Add a response interceptor
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export const GET_REQUEST_REQUEST = "GET_REQUEST_REQUEST";
export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export function getRequest(requestId) {
    return dispatch => {
        dispatch({
            type: GET_REQUEST_REQUEST,
            loading: true,
            loadingMessage: "Fetching Request..."
        });
        return axios
            .get(Config.API_ROOT + "/getRequestSamples", {
                params: {
                    request_id: requestId
                }
            })
            .then(response => {
                return dispatch({
                    type: GET_REQUEST_SUCCESS,
                    // loading: false, //keep loading as another action will be triggered
                    message: response.data.message,
                    payload: response.data
                });
            })

            .catch(error => {
                return dispatch({
                    type: GET_REQUEST_FAIL,
                    error: error
                });
            });
    };
}

export const GET_REPORT_REQUEST = "GET_REPORT_REQUEST";
export const GET_REPORT_FAIL = "GET_REPORT_FAIL";
export const GET_REPORT_SUCCESS = "GET_REPORT_SUCCESS";
export function getQcReports(requestId, otherSampleIds) {
    return (dispatch, getState) => {
        dispatch({
            type: GET_REPORT_REQUEST,
            loading: true,
            loadingMessage: "Request found. Checking QC Tables..."
        });

        // let data = await fillReportTables(response.data)
        return axios
            .post(Config.API_ROOT + "/getQcReportSamples", {
                data: {
                    request: requestId,
                    samples: getState().report.request.samples
                }
            })
            .then(response => {
                dispatch({
                    type: GET_REPORT_SUCCESS,
                    loading: false,
                    payload: fillReportTables(response.data)
                });
            })

            .catch(error => {
                return dispatch({
                    type: GET_REPORT_FAIL,
                    error: error,

                    loading: false
                });
            });
    };
}
