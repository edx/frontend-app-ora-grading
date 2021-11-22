import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FullscreenModal,
  Row,
  Col,
} from '@edx/paragon';

import { selectors, actions } from 'data/redux';

import ResponseDisplay from 'containers/ResponseDisplay';
import Rubric from 'containers/Rubric';

import ReviewActions from 'containers/ReviewActions';

import './ReviewModal.scss';

/**
 * <ReviewModal />
 */
export class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.setShowReview(false);
  }

  render() {
    if (this.props.response === null) {
      return null;
    }
    return (
      <FullscreenModal
        title={this.props.oraName}
        isOpen={this.props.isOpen}
        beforeBodyNode={<ReviewActions />}
        onClose={this.onClose}
        className="review-modal"
        modalBodyClassName="review-modal-body"
      >
        <div className="content-block">
          <Row className="flex-nowrap">
            <Col><ResponseDisplay /></Col>
            { this.props.showRubric && <Rubric /> }
          </Row>
        </div>
      </FullscreenModal>
    );
  }
}
ReviewModal.defaultProps = {
  response: null,
};
ReviewModal.propTypes = {
  oraName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    text: PropTypes.node,
  }),
  setShowReview: PropTypes.func.isRequired,
  showRubric: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => ({
  isOpen: selectors.app.showReview(state),
  oraName: selectors.app.ora.name(state),
  response: selectors.grading.selected.response(state),
  showRubric: selectors.app.showRubric(state),
});

export const mapDispatchToProps = {
  setShowReview: actions.app.setShowReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewModal);
