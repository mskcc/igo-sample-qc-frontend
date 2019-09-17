// import { Config } from "../secret_config.js";

export const fillReportTables = reportList => {
    let tables = {};
    let dnaReport = reportList.dnaReportSamples;
    let rnaReport = reportList.rnaReportSamples;
    let libraryReport = reportList.libraryReportSamples;

    if (dnaReport.data) {
        tables["DNA Report"] = dnaReport;
    }
    if (rnaReport.data) {
        tables["RNA Report"] = rnaReport;
    }
    if (libraryReport.data) {
        tables["Library Report"] = libraryReport;
    }

    return tables;
};
