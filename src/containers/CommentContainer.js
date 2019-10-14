import React, { Component } from "react";

import Swal from "sweetalert2";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { communicationActions } from "../actions";

import { CommentArea, CommentEditorArea } from "../components/Comments";

export class CommentContainer extends Component {
  componentDidMount() {
    this.props.getComments();
  }

  addInitialComment = (comment, reports) => {
    console.log(reports);
    var keys = Object.keys(reports);

    var filteredReports = keys.filter(function(key) {
      return reports[key];
    });
    this.props.addInitialComment(comment, filteredReports);
  };

  handleInitialComment = (comment, reports) => {
    console.log(reports);
    var keys = Object.keys(reports);

    var filteredReports = keys.filter(function(key) {
      return reports[key];
    });

    let recipients = Object.values(this.props.recipients);
    var filteredRecipients = recipients.filter(function(obj) {
      return obj != null;
    });

    console.log(filteredRecipients);
    let recipientString = Object.values(filteredRecipients).join();
    recipientString = recipientString.replace(/,/gi, ", ");

    let reportString = Object.values(filteredReports).join(", ");

    let commentString = comment.replace(/\./gi, ".<br> ");
    commentString = commentString.replace(/,IGO/gi, ",<br>IGO");
    // commentString = commentString.replace(
    //   /Please reply here if you have any questions or comments./gi,
    //   "Please visit https://igo.mskcc.org/sample-qc to ask any questions or submit your decisions.  "
    // );

    Swal.fire({
      title: "Review",
      html:
        "<div class='swal-comment-review'><strong>Add to:</strong>" +
        reportString +
        "<br><strong>Send to:</strong><br>" +
        recipientString +
        "<br><strong>Content:</strong><br>" +
        commentString +
        " </div>",
      type: "warning",
      showCancelButton: true,
      animation: false,
      confirmButtonColor: "#007cba",
      cancelButtonColor: "#df4602",
      confirmButtonText: "Send Notification",
      cancelButtonText: "Back to Edit"
    }).then(result => {
      if (result.value) {
        return this.props.addInitialComment(commentString, filteredReports, filteredRecipients);
      } else {
        return true;
      }
    });

  };

  addCommentToAllReports = comment => {
    this.props.addComment(comment, "all");
  };

  addComment = comment => {
    this.props.addComment(comment, this.props.report.reportShown);
  };
  handleRecipientSubmit = recipients => {
    this.props.setRecipients(recipients);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.report.reportShown && this.props.comments &&
        this.props.report.reportShown.includes("Report") &&
        this.props.comments[this.props.report.reportShown] &&
        this.props.comments[this.props.report.reportShown].length > 0 ? (
          <CommentArea
            currentReportShown={this.props.report.reportShown}
            numOfReports={Object.keys(this.props.report.tables).length}
            comments={this.props.comments[this.props.report.reportShown]}
            currentUser={this.props.user.username}
            addComment={this.addComment}
            addCommentToAllReports={this.addCommentToAllReports}
          />
        ) : (
          this.props.report.reportShown &&
          this.props.report.reportShown.includes("Report") &&
          this.props.report.tables && (
            <CommentEditorArea
              recipe={
                this.props.report.tables[this.props.report.reportShown].data[0]
                  .recipe
              }
              currentReportShown={this.props.report.reportShown}
              addInitialComment={this.addInitialComment}
              handleInitialComment={this.handleInitialComment}
              request={this.props.report.request}
              recipients={this.props.recipients}
              tables={this.props.report.tables}
              handleRecipientSubmit={this.handleRecipientSubmit}
            />
          )
        )}
      </React.Fragment>
    );
  }
}

CommentContainer.defaultProps = {
  comments: {},
  recipients: {}
};

const mapStateToProps = state => ({
  comments: state.communication.comments,
  report: state.report,
  recipients: state.communication.recipients,
  user: state.user
});

export default withLocalize(
  connect(
    mapStateToProps,
    {
      // ...uploadGridActions,
      ...communicationActions
    }
  )(CommentContainer)
);
