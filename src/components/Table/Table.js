import React from "react";
import { HotTable } from "@handsontable/react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Swal from "sweetalert2";

const styles = theme => ({
    container: {
        width: "100%",
        overflowX: "auto"
    }
});

const columnFeatures = [
    { data: "id", name: "id" },
    { data: "title", name: "title" },
    { data: "count", type: "numeric" },
    {
        data: "move_forward",
        type: "checkbox"
    },
    { data: "comment" }
];

const columnHeaders = ["id", "title", "count", "Continue?", "Comment"];

const data = [
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 0, title: "row1", count: 20, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 1, title: "row1", count: 40, move_forward: false, comment: "" },
    { id: 2, title: "row1", count: 60, move_forward: false, comment: "" }
];

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.hotTableComponent = React.createRef();
    }

    getErrorMsg = () => {
        for (let i = 0; i < "numberToAdd"; i++) {}
    };
    showError = error => {
        console.log(error);
        Swal.fire(error);
    };

    componentDidMount= () => {
        console.log('where are you')
    }

    render() {
        const {
            classes
            // handleClick,
            // handleReceipt,
            // handleDelete
        } = this.props;
        return (
            <div className={classes.container}>
                <HotTable
                    licenseKey="non-commercial-and-evaluation"
                    id="hot"
                    ref={this.hotTableComponent}
                    data={this.props.data}
                    columns={columnFeatures}
                    colHeaders={columnHeaders}
                    rowHeaders={true}
                    className="htCenter"
                    // columns={this.props.user.submissionsTable.columnFeatures}
                    stretchH="all"
                    filters="true"
                    columnSorting="true"
                    height="500"
                />
            </div>
        );
    }
}

export default withStyles(styles)(Table);
