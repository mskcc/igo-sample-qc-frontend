import React from "react";
import { HotTable } from "@handsontable/react";
import { withStyles } from "@material-ui/core/styles";
// import Checkbox from "@material-ui/core/Checkbox";
import Swal from "sweetalert2";

const styles = theme => ({
    container: {
        width: "100%",
        overflowX: "auto"
    }
});

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

    render() {
        const {
            classes
            // handleClick,
            // handleReceipt,
            // handleDelete
        } = this.props;
        console.log(this.props.data)
        return (
            <div className={classes.container}>
                <HotTable
                    licenseKey="non-commercial-and-evaluation"
                    id="hot"
                    ref={this.hotTableComponent}
                    data={this.props.data.data}
                    columns={this.props.data.columnFeatures}
                    colHeaders={this.props.data.columnHeaders}
                    rowHeaders={true}
                    className="htCenter"
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
