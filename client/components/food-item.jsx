import React from 'react';

export default class FoodItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: parseInt(props.quantity),
      checked: false,
      category: props.category
    };
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  toggleChecked() {
    this.setState({
      checked: !this.state.checked
    });
    this.props.showSelection();
  }

  render() {
    const imgUrl = `./images/${this.state.category}.png`;
    return (
      <div className='width-80 background-blue row'>
        <div>
          <label>
            <input type='checkbox' onClick={this.toggleChecked}/>
          </label>
        </div>
        <div>
          <img src={imgUrl}></img>
        </div>
        <div>
          {this.state.quantity}
        </div>
      </div>
    );
  }
}
