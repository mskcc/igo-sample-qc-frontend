import { Config } from "../config.js";

export const fillReportTables = reportList => {
    let gridDna = { columnFeatures: [], columnHeaders: [], rows: [] };
    let gridRna = { columnFeatures: [], columnHeaders: [], rows: [] };
    let gridLibrary = { columnFeatures: [], columnHeaders: [], rows: [] };

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
    let tables = { gridDna, gridRna, gridLibrary };
    return tables;
};
