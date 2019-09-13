import React, { Component } from "react";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { commentActions } from "../actions";

import { CommentArea } from "../components/Comments";

export class CommentContainer extends Component {

  componentDidMount() {
    this.props.getComments(this.props.request);
  }

  addComment = comment => {
    this.props.addComment({
      comment
    });
  };

  render() {
    return (
      <React.Fragment>
        <CommentArea
          comments={this.props.comments}
          addComment={this.addComment}
        />
      </React.Fragment>
    );
  }
}

CommentContainer.defaultProps = {
  comments: {}
};

const mapStateToProps = state => ({
  comments: state.communication.comments
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
