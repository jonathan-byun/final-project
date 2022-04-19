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
      name: null,
      quantity: 0,
      measurementUnit: '#',
      foodCategory: null
    };
    this.updateMeasurement = this.updateMeasurement.bind(this);
  }

  updateMeasurement(e) {
    this.setState({
      measurementUnit: e.target.textContent
    });
  }

  render() {
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
              <div className="modal-body row align-center">
                <input type="text" className="form-control" placeholder="Item name" aria-label="Item name" aria-describedby="basic-addon1" />
                <input type="text" className="form-control my-4 w-75" placeholder="Quantity" aria-label="Quantity" aria-describedby="basic-addon1" />
                <div className="dropdown w-25">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="measurementMenu" data-bs-toggle="dropdown" aria-expanded="false">
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
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss='modal'>Add</button>
              </div>
            </div>
          </div>
        </div></div>
    );
  }
}
