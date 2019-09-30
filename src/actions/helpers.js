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

//  checks wether investigator made decisions for each sample
//  defaults to true and returns false as soon as it finds an empty value
export const allDecisionsMade = tables => {
    let result = true;
    for (let table in tables) {
        for (var j = 0; j < tables[table].data.length; j++) {
            if (
                tables[table].data[j].investigatorDecision != null &&
                tables[table].data[j].investigatorDecision !== ""
            ) {
                result = true;
                continue;
            } else {
                return false;
            }
        }
    }
    return result;
};

// assemble decision object [{datatype:"report",samples: [{"RecordId" : recordId, "InvestigatorDecision": decision}]}]
export const generateSubmitData = tables => {
    let submitData = [];
    let i = 0;
    for (let table in tables) {
        let dataType = "";
        if (table === "DNA Report") {
            dataType = "qcReportDna";
        }
        if (table === "RNA Report") {
            dataType = "qcReportRna";
        }
        if (table === "Library Report") {
            dataType = "qcReportLibrary";
        }
        submitData[i] = { dataType: dataType, samples: [] };

        for (var j = 0; j < tables[table].data.length; j++) {
            submitData[i].samples.push({
                recordId: tables[table].data[j].recordId,
                investigatorDecision: tables[table].data[j].investigatorDecision
            });
        }
        i++;
    }
    console.log(submitData);
    return submitData;
};
