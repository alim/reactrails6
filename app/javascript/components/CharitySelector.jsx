import React from 'react'

class CharitySelector extends React.Component {
  render() {
    return (
      <div className="field">
        <label htmlFor="order_pay_type">Charity</label>​ 
        <select id="charity" name="donation[charity]">
          <option value="">Select your favorite charity</option>​ 
          <option value="habitat">Habitat for Humanity</option>​ 
          <option value="unicef">Unicef</option>​ 
          <option value="cancer_society">American Cancer Society</option>​ 
        </select>​ 
      </div>
    );
  }
}
export default CharitySelector
