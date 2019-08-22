import React, { Component } from "react";
import PropTypes from "prop-types";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
import { commentActions } from "../actions";
import { Redirect } from "react-router-dom";

import { CommentArea } from "../components/Comments";
// import { Dialog } from '../../components'
// import UploadFormContainer from './UploadFormContainer'
// import UploadGridContainer from './UploadGridContainer'

export class CommentContainer extends Component {
  // handleFormSubmit = formValues => {
  //   this.props.getColumns(formValues);
  // };
  // handleGridSubmit = formValues => {
  //   this.props.addGridToBankedSample(this.props);
  // };

  componentDidMount() {
    this.props.getComments();
  }

  addComment = comment => {
    this.props.addComment({
      author: "username",
      date: new Date().getTime() / 1000,
      content: comment
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
