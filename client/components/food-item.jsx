import React from 'react';

export default class FoodItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockedItemId: props.stockedItemId,
      name: props.name,
      quantity: parseInt(props.quantity),
      checked: false,
      category: props.category,
      measurement: props.measurement
    };
    this.toggleChecked = this.toggleChecked.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  toggleChecked(e) {
    this.setState({
      checked: !this.state.checked
    });
    this.props.showSelection();
  }

  changeQuantity(e) {
    let updatedQuantity = { quantity: this.state.quantity - 1 };
    if (e.target.id === 'plus-button' || e.target.className === 'fas fa-plus fa-xl') {
      updatedQuantity = { quantity: this.state.quantity + 1 };
    }
    if (updatedQuantity.quantity < 0) {
      return;
    }
    fetch(`/api/stockedItemQuantity/${this.state.stockedItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedQuantity)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          quantity: Number(data.quantity)
        });
      });
  }

  render() {
    const imgUrl = `./images/${this.state.category}.png`;
    let containerDivClass = 'width-80 row align-center border-radius-2rem margin-1rem justify-between';
    this.state.checked ? (containerDivClass += ' background-light-beige border-solid border-color-green') : (containerDivClass += ' background-beige');
    return (
      <div className={containerDivClass}>
        <div className='width-100 cursor-pointer row my-3'>
          <div className='row align-center padding-1rem col-md' onClick={this.toggleChecked}>
            <div className='col-md-2'>
              <img className='food-item-img' src={imgUrl}></img>
            </div>
            <div className='food-item-name no-select col-md-2'>
              {this.state.name}
            </div>
          </div>
          <div className='row align-center col-md-5 space-around'>
            <div id='minus-button' className='rounded-circle background-green cursor-pointer col-md-2' onClick={this.changeQuantity} >
              <i className="fas fa-minus fa-xl row justify-center py-4"></i>
            </div>
            <div className='food-item-quantity fira col-md-8 row justify-center align-center'>
              <div className='col-md'>
                {this.state.quantity}
              </div>
              <div className='food-item-measurement fira col-md'>
                {this.state.measurement}
              </div>
            </div>
            <div className='rounded-circle background-green cursor-pointer col-md-2 ' onClick={this.changeQuantity}>
              <i id='plus-button' className="fas fa-plus fa-xl row justify-center py-4"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
