import React, { Component } from "react";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { commentActions } from "../actions";

import { CommentArea, CommentEditor } from "../components/Comments";

export class CommentContainer extends Component {
  componentDidMount() {
    this.props.getComments();
  }

  addInitialComment = (comment, reports) => {
    var keys = Object.keys(reports);

    var filteredReports = keys.filter(function(key) {
      return reports[key];
    });
    this.props.addComment(comment, filteredReports);
  };

  addCommentToAllReports = comment => {
    this.props.addComment(comment, "all");
  };

  addComment = comment => {
    this.props.addComment(comment, this.props.report.reportShown);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.report.reportShown &&
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
          this.props.report.tables && (
            <CommentEditor
              currentReportShown={this.props.report.reportShown}
              addInitialComment={this.addInitialComment}
              request={this.props.report.request}
              tables={this.props.report.tables}
            />
          )
        )}
      </React.Fragment>
    );
  }
}

CommentContainer.defaultProps = {
  comments: {}
};

const mapStateToProps = state => ({
  comments: state.communication.comments,
  report: state.report,
  user: state.user
});

export default withLocalize(
  connect(
    mapStateToProps,
    {
      // ...uploadGridActions,
      ...commentActions
    }
  )(CommentContainer)
);
