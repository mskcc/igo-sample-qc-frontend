import React, { Component } from "react";

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
        {this.props.report.reportShown &&
        this.props.report.reportShown.includes("Report") &&
        this.props.comments[this.props.report.reportShown] &&
        this.props.comments[this.props.report.reportShown].length > 0 > 0 ? (
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
