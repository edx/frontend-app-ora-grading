import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Card, Button } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import { selectors, thunkActions } from 'data/redux';

import CriterionContainer from 'containers/CriterionContainer';
import RubricFeedback from './RubricFeedback';
import messages from './messages';

import './Rubric.scss';

/**
 * <Rubric />
 */
export class Rubric extends React.Component {
  constructor(props) {
    super(props);

    this.submitGradeHandler = this.submitGradeHandler.bind(this);
  }

  submitGradeHandler() {
    this.props.submitGrade();
  }

  render() {
    const { isGrading, criteriaIndices } = this.props;
    return (
      <Card className="grading-rubric-card">
        <Card.Body className="grading-rubric-body">
          <h3><FormattedMessage {...messages.rubric} /></h3>
          <hr className="m-2.5" />
          {criteriaIndices.map((index) => (
            <CriterionContainer
              isGrading={isGrading}
              key={index}
              orderNum={index}
            />
          ))}
          <hr />
          <RubricFeedback />
        </Card.Body>
        {isGrading && (
          <div className="grading-rubric-footer">
            <Button onClick={this.submitGradeHandler}>
              <FormattedMessage {...messages.submitGrade} />
            </Button>
          </div>
        )}
      </Card>
    );
  }
}
Rubric.defaultProps = {
  criteriaIndices: [],
};
Rubric.propTypes = {
  isGrading: PropTypes.bool.isRequired,
  criteriaIndices: PropTypes.arrayOf(PropTypes.number),
  submitGrade: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  isGrading: selectors.app.isGrading(state),
  criteriaIndices: selectors.app.rubric.criteriaIndices(state),
});

export const mapDispatchToProps = {
  submitGrade: thunkActions.grading.submitGrade,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rubric);
