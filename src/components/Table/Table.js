import React from "react";
import { HotTable } from "@handsontable/react";
import { withStyles } from "@material-ui/core/styles";
// import Checkbox from "@material-ui/core/Checkbox";
import { normalizeMixedDataValue } from "../../actions/helpers";
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
  componentDidMount = () => {
    if (
      this.hotTableComponent != undefined &&
      this.hotTableComponent.current != undefined &&
      this.hotTableComponent.current.hotInstance != undefined
    ) {
      let data = this.hotTableComponent.current.hotInstance.getData();
      this.hotTableComponent.current.hotInstance.updateSettings({
        cells: function(row, col) {
          var cellProperties = {};

          if (
            data[row][col] === "Submit new iLab request" ||
            data[row][col] === "Already moved forward by IGO"
          ) {
            cellProperties.readOnly = true;
          }
          return cellProperties;
        }
      });
    }
  };

  showError = error => {
    Swal.fire(error);
  };

  render() {
    const { classes } = this.props;
    // last column is always RecordId. Needed to set investigator decision efficiently
    let lastColumnIndex = this.props.data.columnFeatures.length - 1;
    let isAttachmentTable = this.props.data.columnHeaders.length === 3;
    let isPathologyTable =
      (this.props.data.columnHeaders.length > 3) &
      (this.props.data.columnHeaders.length < 6);
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
          stretchH={isAttachmentTable || isPathologyTable ? "none" : "all"}
          // columnSorting={
          //   isAttachmentTable
          //     ? {
          //         initialConfig: {
          //           column: 1,
          //           sortOrder: "asc"
          //         }
          //       }
          //     : {}
          // }
          stretchH={isAttachmentTable || isPathologyTable ? "none" : "all"}
          columnSorting="true"
          height="500"
          rowHeights="35"
          // afterValidate={(changes, source) => {
          //   console.log(changes.length);
          //   for (var i = changes.length - 1; i >= 0; i--) {
          //     if (i == changes.length) {
          //       this.props.registerChange();
          //     }
          //   }
          // }}

          //   if (changes) {
          //     let i = 0;
          //     if (source !== "loadData") {
          //       changes.forEach(([row, prop, oldValue, newValue]) => {
          //         i++;

          //         this.props.registerChange();
          //       });
          //     }
          //   }
          // console.log(changes);
          afterOnCellMouseDown={(event, coords, TD) => {
            if (isAttachmentTable && event.button === 0 && coords.row > -1) {
              if (coords.col === 1) {
                this.props.handleAttachmentDownload(
                  TD.firstElementChild.getAttribute("submission-id"),
                  TD.firstElementChild.getAttribute("file-name")
                );
              }
            }
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Table);
