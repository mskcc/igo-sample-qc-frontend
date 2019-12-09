import React, { Component } from "react";

import Swal from "sweetalert2";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { communicationActions } from "../../actions";
import {
  cleanAndFilterRecipients,
  allIntialCommentsSent
} from "../../actions/helpers";

import { CommentArea, CommentEditorArea } from "../../components/Comments";

export class CommentContainer extends Component {
  componentDidMount() {
    console.log(this.props.history);
    this.props.getComments();
  }

  // addInitialComment = (comment, reports) => {
  //   console.log(reports);
  //   var keys = Object.keys(reports);

  //   var filteredReports = keys.filter(function(key) {
  //     return reports[key];
  //   });
  //   this.props.addInitialComment(comment, filteredReports);
  // };

  handleInitialComment = (comment, reports) => {
    var keys = Object.keys(reports);

    // array of all selected reports
    var filteredReports = keys.filter(function(key) {
      return reports[key];
    });
    let recipients = cleanAndFilterRecipients(this.props.recipients);

    let recipientString = recipients.join();

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
        "<div class='swal-comment-review'> <strong>Add to:</strong>" +
        reportString +
        "<br><strong>Send to:</strong><br>" +
        recipientString +
        "<br><strong>Content:</strong><br>" +
        " </div>",
      input: "textarea",
      inputValue: commentString.replace(/<br>/gi, "\n"),
      type: "warning",
      showCancelButton: true,
      animation: false,
      confirmButtonColor: "#007cba",
      cancelButtonColor: "#df4602",
      confirmButtonText: "Send Notification",
      cancelButtonText: "Back to Edit"
    }).then(result => {
      if (result.value) {
        return this.props.addInitialComment(
          result.value.replace(/\n/gi, "<br>"),
          filteredReports,
          recipients
        );
      } else {
        return true;
      }
    });
  };

  addCommentToAllReports = comment => {
    if (this.isValid(comment)) {
      let reportsWithComments = Object.keys(this.props.comments);
      let reportsPresent = Object.keys(this.props.report.tables);
      if (allIntialCommentsSent(reportsWithComments, reportsPresent)) {
        this.props.addCommentToAllReports(
          comment.replace(/\n/gi, "<br>"),
          Object.keys(this.props.report.tables)
        );
      } else {
        Swal.fire({
          title: "Not all intial comments sent.",
          text:
            "You can only comment on all reports at once if IGO has sent out " +
            "intial notifications for every report present in this request.",
          type: "info",
          animation: false,
          confirmButtonColor: "#007cba",
          confirmButtonText: "Dismiss"
        });
      }
    } else {
      this.showMrnError();
    }
  };

  addComment = comment => {
    if (this.isValid(comment)) {
      this.props.addComment(
        comment.replace(/\n/gi, "<br>"),
        this.props.report.reportShown
      );
    } else {
      this.showMrnError();
    }
  };

  isValid = comment => {
    var r = /(\s[1-9]{8}\s|.*[1-9]{8}$|^[1-9]{8}\s.*)/g;

    var matches = comment.match(r);
    if (matches) {
      return false;
    }
    // r = /^\d{8}$/g;

    // matches = comment.match(r);
    // if (matches) {
    //   return false;
    // }
    return true;
  };

  showMrnError = () => {
    Swal.fire({
      title: "Comment Invalid",
      text:
        "We detected an 8 digit number in your comment. Please delete any MRNs or other PHI and re-submit." +
        "This webapp is not PHI secure and submitting PHI would violate MSK policy.",

      type: "warning",
      animation: false,
      confirmButtonColor: "#007cba",
      confirmButtonText: "Dismiss"
    });
  };

  handleRecipientSubmit = recipients => {
    this.props.setRecipients(recipients);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.report.reportShown &&
        this.props.comments &&
        this.props.report.reportShown.includes("Report") &&
        this.props.comments[this.props.report.reportShown] &&
        this.props.comments[this.props.report.reportShown].comments.length >
          0 ? (
          <CommentArea
            currentReportShown={this.props.report.reportShown}
            numOfReports={
              Object.keys(this.props.report.tables).filter(commentReport =>
                commentReport.includes("Report")
              ).length
            }
            comments={
              this.props.comments[this.props.report.reportShown].comments
            }
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
              comments={this.props.comments}
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
  communication: state.communication,
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
