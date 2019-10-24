// import { Config } from "../secret_config.js";

export const fillReportTables = reportList => {
    let tables = {};
    let dnaReport = reportList.dnaReportSamples;
    let rnaReport = reportList.rnaReportSamples;
    let libraryReport = reportList.libraryReportSamples;
    let pathologyReport = reportList.pathologyReportSamples;
    let attachments = reportList.attachments;

    if (dnaReport.data) {
        tables["DNA Report"] = dnaReport;
    }
    if (rnaReport.data) {
        tables["RNA Report"] = rnaReport;
    }
    if (libraryReport.data) {
        tables["Library Report"] = libraryReport;
    }
    if (pathologyReport.data) {
        tables["Pathology Report"] = pathologyReport;
    }

    if (attachments.data) {
        tables["Attachments"] = attachments;
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
export const generateDecisionSubmitData = tables => {
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
    // console.log(submitData);
    return submitData;
};

export const cleanAndFilterRecipients = stateRecipients => {
    let recipients = Object.values(stateRecipients);
    //  clear out empty ones

    // split comma separated ones and filter out empty ones
    let filteredRecipients = [];
    for (var i = recipients.length - 1; i >= 0; i--) {
        if (recipients[i]) {
            let recipient = recipients[i].replace(/;/gi, ",");
            if (recipient.includes(",")) {
                filteredRecipients = filteredRecipients.concat(
                    recipient.split(",")
                );
            } else {
                filteredRecipients.push(recipient);
            }
        }
    }

    let uniqueRecipients = new Set(filteredRecipients);
    uniqueRecipients = Array.from(uniqueRecipients);
    console.log(uniqueRecipients);
    return uniqueRecipients;
};

// determines wether all initial comments have been sent out, only then users
// can reply to all reports present
export const allIntialCommentsSent = (reportsWithComments, tablesPresent) => {
    // filter both objects for elements that have "report" in their name (attachments don't have comments)
    reportsWithComments = reportsWithComments.filter(commentReport =>
        commentReport.includes("Report")
    );
    tablesPresent = tablesPresent.filter(tableReport =>
        tableReport.includes("Report")
    );

    return reportsWithComments.length === tablesPresent.length;
};
