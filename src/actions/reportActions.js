import axios from "axios";
import Swal from "sweetalert2";
import FileSaver from "file-saver";
import XLSX from "xlsx";

import { Config } from "../secret_config.js";
import { fillReportTables, generateDecisionSubmitData } from "./helpers";
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
    return (dispatch, getState) => {
        dispatch({
            type: GET_REQUEST_REQUEST,
            requestId: requestId,
            loading: true,
            loadingMessage: "Fetching Request..."
        });
        let username = getState().user.username;
        let userRole = getState().user.role;
        return axios
            .get(Config.API_ROOT + "/getRequestSamples", {
                params: {
                    request_id: requestId,
                    username: username,
                    role: userRole
                }
            })
            .then(response => {
                return dispatch({
                    type: GET_REQUEST_SUCCESS,
                    payload: response.data,
                    message: "reset"
                });
            })

            .catch(error => {
                if (error.response && error.response.status === 404) {
                    return dispatch({
                        type: GET_REQUEST_FAIL,

                        message: "reset"
                    });
                } else {
                    return dispatch({
                        type: GET_REQUEST_FAIL,

                        message: "reset"
                    });
                }
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
                let tables = fillReportTables(response.data);
                dispatch({
                    type: GET_REPORT_SUCCESS,
                    message: "reset",
                    payload: tables
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

export const GET_PENDING_REQUEST = "GET_PENDING_REQUEST";
export const GET_PENDING_FAIL = "GET_PENDING_FAIL";
export const GET_PENDING_SUCCESS = "GET_PENDING_SUCCESS";
export function getPending() {
    return (dispatch, getState) => {
        dispatch({
            type: GET_PENDING_REQUEST,
            loading: true,
            loadingMessage: "Submitting..."
        });

        // let data = await fillReportTables(response.data)
        return axios
            .get(Config.API_ROOT + "/getPending", {})
            .then(response => {
                console.log(response);
                dispatch({
                    type: GET_PENDING_SUCCESS,
                    pending: response.data,
                    message: "reset"
                });
            })

            .catch(error => {
                return dispatch({
                    type: GET_PENDING_FAIL,
                    error: error,
                    message: "Submission failed."
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
        dispatch({
            type: POST_INVESTIGATOR_DECISION_REQUEST,
            loading: true,
            loadingMessage: "Submitting..."
        });
        let decisions = generateDecisionSubmitData(getState().report.tables);
        let request_id = getState().report.request.requestId;
        let username = getState().user.username;

        // let data = await fillReportTables(response.data)
        return axios
            .post(Config.API_ROOT + "/setQCInvestigatorDecision", {
                decisions,
                username,
                request_id
            })
            .then(response => {
                dispatch({
                    type: POST_INVESTIGATOR_DECISION_SUCCESS,
                    message: "Submitted!"
                });
            })

            .catch(error => {
                return dispatch({
                    type: POST_INVESTIGATOR_DECISION_FAIL,
                    error: error,
                    message: "Submission failed."
                });
            });
    };
}

export const ATTACHMENT_DOWNLOAD_REQUEST = "ATTACHMENT_DOWNLOAD_REQUEST";
export const ATTACHMENT_DOWNLOAD_FAIL = "ATTACHMENT_DOWNLOAD_FAIL";
export const ATTACHMENT_DOWNLOAD_SUCCESS = "ATTACHMENT_DOWNLOAD_SUCCESS";
export function downloadAttachment(coords) {
    return (dispatch, getState) => {
        let attachmentRecordId = getState().report.tables["Attachments"].data[
            coords.row
        ].recordId;

        let fileName = getState().report.tables["Attachments"].data[coords.row]
            .fileName;
        dispatch({
            type: ATTACHMENT_DOWNLOAD_REQUEST,
            loading: true,
            loadingMessage: "Fetching your data.."
        });

        // // let data = await fillReportTables(response.data)
        return axios
            .get(Config.API_ROOT + "/downloadAttachment", {
                params: {
                    recordId: attachmentRecordId,
                    fileName: fileName
                },
                responseType: "blob"
            })
            .then(response => {
                dispatch({
                    type: ATTACHMENT_DOWNLOAD_SUCCESS,
                    message: "reset",
                    file: response.data,
                    fileName: fileName
                });
            })

            .catch(error => {
                return dispatch({
                    type: ATTACHMENT_DOWNLOAD_FAIL,
                    error: error,

                    loading: false
                });
            });
    };
}

export const REPORT_DOWNLOAD_REQUEST = "REPORT_DOWNLOAD_REQUEST";
export const REPORT_DOWNLOAD_FAIL = "REPORT_DOWNLOAD_FAIL";
export const REPORT_DOWNLOAD_SUCCESS = "REPORT_DOWNLOAD_SUCCESS";
export function downloadReport(reportShown, request) {
    return (dispatch, getState) => {
        let tableToExport = getState().report.tables[reportShown];
        let fileName =
            request.requestId + "_" + reportShown.replace(" ", "_") + ".xlsx";

        // remove html from table data
        let clonedReport = JSON.stringify(tableToExport.data);
        clonedReport = clonedReport.replace(/<\/?[^>]+>/gi, "");
        clonedReport = clonedReport.replace(/otherSampleId/gi, "sampleName");
        clonedReport = clonedReport.replace(/sampleId/gi, "igoId");
        clonedReport = JSON.parse(clonedReport);
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(clonedReport);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array"
        });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
}

export const UPDATE_REPORT_SHOWN = "UPDATE_REPORT_SHOWN";
export function updateReportShown(report) {
    return {
        type: UPDATE_REPORT_SHOWN,
        payload: report
    };
}

export const SHOW_PENDING = "SHOW_PENDING";
export function showPending(ownProps) {
    return {
        type: SHOW_PENDING,
        payload: "report"
    };
}

export const REGISTER_GRID_CHANGE = "REGISTER_GRID_CHANGE";
export function registerChange(report) {
    return {
        type: REGISTER_GRID_CHANGE
    };
}
