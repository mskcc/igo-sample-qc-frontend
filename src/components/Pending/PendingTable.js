import React from "react";
import { HotTable } from "@handsontable/react";
import { withStyles } from "@material-ui/core/styles";
// import Checkbox from "@material-ui/core/Checkbox";
import Swal from "sweetalert2";

const styles = theme => ({
  container: {
    width: "80vw",
    overflowX: "auto",
    margin: "3em auto"
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
          className="pending"
          filters="true"
          columnSorting="true"
            stretchH="all"
          height="100vh"
          afterOnCellMouseDown={(event, coords, TD) => {
            if (event.button === 0 && coords.row > -1) {
              if (coords.col === 4) {
                this.props.showPending(
                  this.hotTableComponent.current.hotInstance.getCell(
                    coords.row,
                    0
                  ).textContent
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
