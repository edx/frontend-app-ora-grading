import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import { feedbackRequirement } from 'data/services/lms/constants';
import { actions, selectors } from 'data/redux';
import messages from './messages';

/**
 * <CriterionFeedback />
 */
export class CriterionFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.setValue({
      value: event.target.value,
      orderNum: this.props.orderNum,
    });
  }

  translate = (msg) => this.props.intl.formatMessage(msg);

  render() {
    const {
      config, isGrading, value, valueIsInvalid,
    } = this.props;
    if (config === feedbackRequirement.disabled) {
      return null;
    }
    return (
      <Form.Group isInvalid={this.feedbackIsInvalid}>
        <Form.Control
          as="input"
          className="criterion-feedback feedback-input"
          floatingLabel={this.translate(
            isGrading ? messages.addComments : messages.comments,
          )}
          value={value}
          onChange={this.onChange}
          disabled={!isGrading}
        />
        {valueIsInvalid && (
          <Form.Control.Feedback type="invalid" className="feedback-error-msg">
            {this.translate(messages.criterionFeedbackError)}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
}

CriterionFeedback.defaultProps = {
  value: '',
};

CriterionFeedback.propTypes = {
  orderNum: PropTypes.number.isRequired,
  isGrading: PropTypes.bool.isRequired,
  // injected
  intl: intlShape.isRequired,
  // redux
  config: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string,
  valueIsInvalid: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state, { orderNum }) => ({
  config: selectors.app.rubric.criterionFeedbackConfig(state, { orderNum }),
  value: selectors.grading.selected.criterionFeedback(state, { orderNum }),
  valueIsInvalid: selectors.grading.selected.criterionFeedbackIsInvalid(state, { orderNum }),
});

export const mapDispatchToProps = {
  setValue: actions.grading.setCriterionFeedback,
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CriterionFeedback),
);
