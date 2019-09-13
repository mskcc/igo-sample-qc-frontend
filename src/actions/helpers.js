// import { Config } from "../secret_config.js";

export const fillReportTables = reportList => {
    let tables = {}
    let dnaReport = reportList.dnaReportSamples;
    let rnaReport = reportList.rnaReportSamples;
    let libraryReport = reportList.libraryReportSamples;
    
    if (dnaReport.length > 0 ) {tables["DNA Report"]= dnaReport}
    if (rnaReport.length > 0 ) {tables["RNA Report"] = rnaReport}
    if (libraryReport.length > 0 ) {tables["Library Report"] = libraryReport}
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
    console.log(tables)
    return tables;
};
