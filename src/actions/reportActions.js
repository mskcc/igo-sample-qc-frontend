import axios from "axios";
import Swal from "sweetalert2";

import { Config } from "../secret_config.js";
import { fillReportTables, allDecistionsMade } from "./helpers";
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
            requestId: requestId,
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
                    message: "Request not found."
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

export const POST_INVESTIGATOR_DECISION_REQUEST =
    "POST_INVESTIGATOR_DECISION_REQUEST";
export const POST_INVESTIGATOR_DECISION_FAIL =
    "POST_INVESTIGATOR_DECISION_FAIL";
export const POST_INVESTIGATOR_DECISION_SUCCESS =
    "POST_INVESTIGATOR_DECISION_SUCCESS";
export function submitInvestigatorDecision() {
    return (dispatch, getState) => {
        if (!allDecistionsMade(getState().report.tables)) {
            Swal.fire({
                title: "Not all Decisions made.",
                text:
                    "Please make a decision for each sample in every report before you submit to IGO.",

                type: "info",
                animation: false,
                confirmButtonColor: "#007cba",
                confirmButtonText: "Dismiss"
            });
            // } else {
            //     dispatch({
            //         type: POST_INVESTIGATOR_DECISION_REQUEST,
            //         loading: true,
            //         loadingMessage: "Request found. Checking QC Tables..."
            //     });

            //     // let data = await fillReportTables(response.data)
            //     return axios
            //         .post(Config.API_ROOT + "/getQcReportSamples", {
            //             data: {
            //                 request: requestId,
            //                 samples: getState().report.request.samples
            //             }
            //         })
            //         .then(response => {
            //             dispatch({
            //                 type: POST_INVESTIGATOR_DECISION_SUCCESS,
            //                 loading: false,
            //                 payload: fillReportTables(response.data)
            //             });
            //         })

            //         .catch(error => {
            //             return dispatch({
            //                 type: POST_INVESTIGATOR_DECISION_FAIL,
            //                 error: error,

            //                 loading: false
            //             });
            //         });
        }
    };
}

export const UPDATE_REPORT_SHOWN = "UPDATE_REPORT_SHOWN";
export function updateReportShown(report) {
    return {
        type: UPDATE_REPORT_SHOWN,
        payload: report
    };
}
