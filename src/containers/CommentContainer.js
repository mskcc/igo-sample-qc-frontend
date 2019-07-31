import React, { Component } from "react";
import PropTypes from "prop-types";

import { withLocalize } from "react-localize-redux";
import { connect } from "react-redux";
// import { uploadGridActions, userActions } from '../../actions'
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
    // this.props.refreshToken();
  }

  render() {
    return (
      <React.Fragment>
        <CommentArea
          comments={[
            { author: "username", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ", date: "1564558358" },
            { author: "username2", content: "dsadad", date: "1564558358" },
            { author: "username", content: "dsadad", date: "1564558358" },
            { author: "username2", content: "dsadad", date: "1564558358" },
            { author: "username2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", date: "1564558358" },
            { author: "username", content: "dsadad", date: "1564558358" }
          ]}
        />
      </React.Fragment>
    );
  }
}

CommentContainer.defaultProps = {
  grid: {}
};

const mapStateToProps = state => ({
  // grid: state.upload.grid
});

export default withLocalize(
  connect(
    mapStateToProps,
    {
      // ...uploadGridActions,
      // ...userActions,
    }
  )(CommentContainer)
);
