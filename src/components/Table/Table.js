import React from "react";
import { HotTable } from "@handsontable/react";
import { withStyles } from "@material-ui/core/styles";
// import Checkbox from "@material-ui/core/Checkbox";
import Swal from "sweetalert2";

const styles = theme => ({
  container: {
    width: "100%",
    overflowX: "auto",
    display: "grid"
  }
});

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.hotTableComponent = React.createRef();
  }

  showError = error => {
    Swal.fire(error);
  };

  render() {
    const {
      classes
      // handleClick,
      // handleReceipt,
      // handleDelete
    } = this.props;
    // last column is always RecordId. Needed to set investigator decision efficiently
    let lastColumnIndex = this.props.data.columnFeatures.length - 1;
    let isAttachmentTable = this.props.data.columnHeaders.length === 3;
    return (
      <div className={classes.container}>
        <HotTable
          licenseKey="non-commercial-and-evaluation"
          id="hot"
          ref={this.hotTableComponent}
          data={this.props.data.data}
          columns={this.props.data.columnFeatures}
          colHeaders={this.props.data.columnHeaders}
          hiddenColumns={{
            columns: [lastColumnIndex],
            indicators: false
          }}
          rowHeaders={true}
          // className="htCenter"
          stretchH={isAttachmentTable ? "none" : "all"}
          columnSorting="true"
          height="500"
          rowHeights="35"
          afterValidate={(changes, source) => {
            this.props.registerChange();
          }}
          afterOnCellMouseDown={(event, coords, TD) => {
            if (isAttachmentTable && event.button === 0 && coords.row > -1) {
              if (coords.col === 1) {
                this.props.handleAttachmentDownload(coords);
              }
            }
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Table);
