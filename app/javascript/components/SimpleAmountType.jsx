import React from 'react'

class SimpleAmountType extends React.Component {
  render() {
    return(
      <div className="field">
        <label>Amount: </label>
        <input type="text" name="donation[amount]"></input>
      </div>
    );
  }
}

export default SimpleAmountType
