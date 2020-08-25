import React from 'react'
import NoPayType from './NoPayType'
import SimpleAmountType from './SimpleAmountType'

class CharitySelector extends React.Component {
  // Add a contsturctor and bind
  constructor(props) {
    super(props);
    this.onCharitySelected = this.onCharitySelected.bind(this);

    // Initialize the state variable
    this.state = {selectedCharity: "none"};
  }

  onCharitySelected(event) {
    // Event handler to change the state to the selected charity
    // see the select element in the render function below.
    this.setState({selectedCharity: event.target.value});
    console.log(event.target.value);
  }

  render() {
    // Initialize the payment component to the NoPayType so no amount is field
    // is shown to the user.
    let PaymentAmountTypeComponent = NoPayType;

    if (this.state.selectedCharity != "none") {
      // If the state has changed to a type of payment, then we display
      // the SimpleAmountType component.
      PaymentAmountTypeComponent = SimpleAmountType;
    }

    return (
      <div>
        <div className="field">
          <label htmlFor="order_pay_type">Charity</label>​ 
          <select id="charity" onChange={this.onCharitySelected} name="donation[charity]">
            <option value="none">Select your favorite charity</option>​ 
            <option value="habitat">Habitat for Humanity</option>​ 
            <option value="unicef">Unicef</option>​ 
            <option value="cancer_society">American Cancer Society</option>​ 
          </select>​ 
        </div>

        <PaymentAmountTypeComponent />
      </div>
    );
  }
}
export default CharitySelector
