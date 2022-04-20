import React from 'react';

// export default function AddButton(props) {
//   return (
//     <a className='add-button cursor-pointer col-md-1 text-align-center' onClick={props.openModal}>Add</a>
//   );
// }

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: 0,
      measurementUnit: '#',
      foodCategory: 'fruits'
    };
    this.updateMeasurement = this.updateMeasurement.bind(this);
    this.categoryClicked = this.categoryClicked.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  updateMeasurement(e) {
    this.setState({
      measurementUnit: e.target.textContent
    });
  }

  updateName(e) {
    this.setState({
      name: e.target.value
    });
  }

  updateQuantity(e) {
    this.setState({
      quantity: e.target.value
    });
  }

  categoryClicked(e) {
    this.setState({
      foodCategory: e.target.id
    });
  }

  submitItem(e) {
  }

  render() {
    const images = this.props.images;
    const listItems = images.map(image => this.state.foodCategory === image
      ? <div key={image} className='col-md-3  mx-2 '>
        <img id={image} className='add-category-button cursor-pointer border-blue w-75' src={`./images/${image}.png`} onClick={this.categoryClicked} />
      </div>
      : <div key={image} className='col-md-3  mx-2'>
        <img id={image} className='add-category-button cursor-pointer w-75 p-1' src={`./images/${image}.png`} onClick={this.categoryClicked} />
      </div>
    );
    let goodToSubmit = true;
    if (Number.isNaN(Number(this.state.quantity)) || this.state.name === '') {
      goodToSubmit = false;
    }
    return (
      <div className='col-md-1'>
        <a className='add-button cursor-pointer text-align-center' data-bs-toggle="modal" data-bs-target="#exampleModal">Add</a>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">New Item</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body row align-center justify-center">
                <input type="text" value={this.state.name} className="form-control" placeholder="Item name" aria-label="Item name" aria-describedby="basic-addon1" onChange={this.updateName}/>
                <input type="text" value={this.state.quantity} className="form-control my-4 w-75" placeholder="Quantity" aria-label="Quantity" aria-describedby="basic-addon1" onChange={this.updateQuantity} />
                <div className="dropdown w-25">
                  <button className="btn btn-secondary dropdown-toggle w-100" type="button" id="measurementMenu" data-bs-toggle="dropdown" aria-expanded="false">
                    {this.state.measurementUnit}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="measurementMenu" onClick={this.updateMeasurement}>
                    <li><a className="dropdown-item cursor-pointer" >#</a></li>
                    <li><a className="dropdown-item cursor-pointer" >%</a></li>
                    <li><a className="dropdown-item cursor-pointer" >Grams</a></li>
                    <li><a className="dropdown-item cursor-pointer" >Lbs</a></li>
                    <li><a className="dropdown-item cursor-pointer" >Cups</a></li>
                    <li><a className="dropdown-item cursor-pointer" >mL</a></li>
                  </ul>
                </div>
                <div className='d-flex flex-wrap justify-center'>
                  {listItems}
                </div>
              </div>
              <div className="modal-footer d-flex justify-between">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {goodToSubmit
                  ? <button type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={this.submitItem} >Add</button>
                  : <button type="button" className="btn btn-primary">Add</button>
                }
              </div>
            </div>
          </div>
        </div></div>
    );
  }
}
