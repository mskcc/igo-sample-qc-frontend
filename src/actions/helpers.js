// import { Config } from "../secret_config.js";

export const fillReportTables = reportList => {
    let tables = {};
    console.log(reportList);
    let dnaReport = reportList.dnaReportSamples;
    let rnaReport = reportList.rnaReportSamples;
    let libraryReport = reportList.libraryReportSamples;

    if (dnaReport.data.length > 0) {
        tables["DNA Report"] = {
            data: dnaReport.data,
            columnHeaders: Object.keys(dnaReport.columnFeatures).map(a =>dnaReport.columnFeatures[a].columnHeader)
        };
    }
    if (rnaReport.data.length > 0) {
        tables["RNA Report"] = {
            data: rnaReport.data,
            columnHeaders: Object.keys(rnaReport.columnFeatures).map(a => rnaReport.columnFeatures[a].columnHeader)
        };
    }
    if (libraryReport.data.length > 0) {
        tables["Library Report"] = {
            data: libraryReport.data,
            columnHeaders: Object.keys(libraryReport.columnFeatures).map(a => libraryReport.columnFeatures[a].columnHeader)
        };
    }
    // let gridDna = { columnFeatures: [], columnHeaders: [], rows: [] };
    // let gridRna = { columnFeatures: [], columnHeaders: [], rows: [] };
    // let gridLibrary = { columnFeatures: [], columnHeaders: [], rows: [] };

    // grid.columnFeatures = generateColumnFeatures(responseColumns, formValues)
    // grid.columnHeaders = grid.columnFeatures.map(
    //   a =>
    //     '<span class="' +
    //     a.className +
    //     '" title="' +
    //     a.tooltip +
    //     '">' +
    //     a.columnHeader +
    //     '</span>'
    // )

    // grid.rows = generateRows(
    //   grid.columnFeatures,
    //   formValues,
    //   formValues.number_of_samples
    // )

    // grid.hiddenColumns = hideColumns(grid.columnFeatures, userRole)
    console.log(tables);
    return tables;
};
