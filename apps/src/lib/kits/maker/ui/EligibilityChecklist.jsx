/** @file Maker Discount Code Eligibility Checklist */
import React, {Component, PropTypes} from 'react';
import i18n from "@cdo/locale";
import Button from "@cdo/apps/templates/Button";
import ValidationStep, {Status} from '@cdo/apps/lib/ui/ValidationStep';
import DiscountCodeSchoolChoice from './DiscountCodeSchoolChoice';
import Unit6ValidationStep from './Unit6ValidationStep';
import EligibilityConfirmDialog from './EligibilityConfirmDialog';
import DiscountCodeInstructions from '@cdo/apps/lib/kits/maker/ui/DiscountCodeInstructions';

export default class EligibilityChecklist extends Component {
  static propTypes = {
    statusPD: PropTypes.oneOf(Object.values(Status)).isRequired,
    statusStudentCount: PropTypes.oneOf(Object.values(Status)).isRequired,
    unit6Intention: PropTypes.string,
    schoolId: PropTypes.string,
    schoolName: PropTypes.string,
    hasConfirmedSchool: PropTypes.bool,
    getsFullDiscount: PropTypes.bool,
    initialDiscountCode: PropTypes.string,
  };

  state = {
    statusYear: Status.UNKNOWN,
    yearChoice: null, // stores the teaching-year choice until submitted
    submitting: false,
    discountAmount: null,
    confirming: false,
    discountCode: null
  };

  constructor(props) {
    super(props);

    // If we had already submitted our intentions for unit 6, initialize component
    // state with that data
    if (props.unit6Intention) {
      this.state = {
        ...this.state,
        yearChoice: props.unit6Intention,
        statusYear: (props.unit6Intention === 'yes1718' ||
          props.unit6Intention === 'yes1819') ? Status.SUCCEEDED : Status.FAILED,
        discountAmount: props.hasConfirmedSchool ?
          (props.getsFullDiscount ? "$0" : "$97.50") : null,
        discountCode: props.initialDiscountCode,
      };
    }
  }

  handleSchoolConfirmed = (fullDiscount) => {
    this.setState({
      discountAmount: fullDiscount ? "$0" : "$97.50"
    });
  }

  handleUnit6Submitted = eligible => {
    this.setState({
      statusYear: eligible ? Status.SUCCEEDED : Status.FAILED,
    });
  }

  confirmEligibility = () => this.setState({confirming: true})

  handleCancelDialog = () => this.setState({confirming: false})

  handleSuccessDialog = discountCode => this.setState({discountCode})

  render() {
    if (this.state.discountCode) {
      return (
        <DiscountCodeInstructions
          discountCode={this.state.discountCode}
          fullDiscount={true}
        />
      );
    }

    // TODO: if we don't have full discount, we should have text saying why it's
    // not a full discount, and suggesting that you contact code.org according to
    // the spec

    return (
      <div>
        <h2>
          {i18n.eligibilityRequirements()}
        </h2>
        <div>
          {i18n.eligibilityExplanation()}
        </div>
        <ValidationStep
          stepName={i18n.eligibilityReqPD()}
          stepStatus={this.props.statusPD}
        >
          {i18n.eligibilityReqPDFail()}
        </ValidationStep>
        <ValidationStep
          stepName={i18n.eligibilityReqStudentCount()}
          stepStatus={this.props.statusStudentCount}
        >
          {i18n.eligibilityReqStudentCountFail()}
        </ValidationStep>
        <Unit6ValidationStep
          previousStepsSucceeded={this.props.statusStudentCount === Status.SUCCEEDED &&
            this.props.statusPD === Status.SUCCEEDED}
          stepStatus={this.state.statusYear}
          initialChoice={this.props.unit6Intention}
          onSubmit={this.handleUnit6Submitted}
        />
        {this.state.statusYear === Status.SUCCEEDED &&
          <DiscountCodeSchoolChoice
            initialSchoolId={this.props.schoolId}
            initialSchoolName={this.props.schoolName}
            schoolConfirmed={this.props.hasConfirmedSchool}
            onSchoolConfirmed={this.handleSchoolConfirmed}
          />
        }
        {this.state.discountAmount  &&
          <Button
            color={Button.ButtonColor.orange}
            text={i18n.getCodePrice({price: this.state.discountAmount})}
            onClick={this.confirmEligibility}
          />
        }
        {this.state.confirming &&
          <EligibilityConfirmDialog
            onCancel={this.handleCancelDialog}
            onSuccess={this.handleSuccessDialog}
          />
        }
      </div>
    );
  }
}
