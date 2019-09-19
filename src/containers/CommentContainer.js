import React, { Component } from "react";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { commentActions } from "../actions";

import { CommentArea, CommentEditor } from "../components/Comments";

export class CommentContainer extends Component {
  componentDidMount() {
    this.props.getComments(this.props.request.requestId);
  }

  addComment = comment => {
    this.props.addComment({
      comment
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.comments.length > 0 ? (
          <CommentArea
            comments={this.props.comments}
            addComment={this.addComment}
          />
        ) : (
          <CommentEditor
            addComment={this.addComment}
            request={this.props.request}
          />
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
  request: state.report.request
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
