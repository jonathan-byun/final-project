import React from 'react';

export default class RightOffcanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: 0,
      measurementUnit: '#',
      foodCategory: 'fruits'
    };
    this.updateItemDetails = this.updateItemDetails.bind(this);
    this.updateMeasurementUnit = this.updateMeasurementUnit.bind(this);
    this.categoryClicked = this.categoryClicked.bind(this);
    this.updateStatevalue = this.updateStatevalue.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  submitEdit() {
    const editPatchRequest = {
      name: this.state.name,
      quantity: this.state.quantity,
      measurementUnit: this.state.measurementUnit,
      foodCategory: this.state.foodCategory
    };
    fetch(`/api/stockedItemDetails/${this.props.numberSelected[0]}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editPatchRequest)
    })
      .then(res => res.json())
      .then(data => this.props.showAllItems())
      .catch(err => console.error(err));
  }

  deleteItem() {

  }

  updateItemDetails(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  updateMeasurementUnit(e) {
    this.setState({
      measurementUnit: e.target.name
    });
  }

  categoryClicked(e) {
    this.setState({
      foodCategory: e.target.id
    });
  }

  updateStatevalue() {
    fetch(`/api/stockedItemAt/${this.props.numberSelected[0]}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          name: data.name,
          quantity: data.quantity,
          measurementUnit: data.measurementUnit,
          foodCategory: data.foodCategory
        });
      })
      .catch(err => console.error(err));
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
    const measurements = ['#', '%', 'Grams', 'Lbs', 'Cups', 'mL'];
    const measurementsList = measurements.map(measurement =>
      <li key={measurement} ><a className="dropdown-item cursor-pointer" name={measurement} >{measurement}</a></li>
    );
    return (
      <div>
        <div className="offcanvas offcanvas-end show visible" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="editOffCanvas">
          <div className="offcanvas-header show background-rose d-flex justify-center border-start border-secondary">
            <h5 className="offcanvas-title show updock fs-1 fw-bolder text-white text-center" id="editOffCanvas">Selection</h5>
          </div>
          <div className="offcanvas-body show background-light-beige  border-start border-secondary">
            {this.props.numberSelected.length < 2 && <div className='d-flex justify-center'>
              <a data-bs-toggle="modal" data-bs-target="#editModal" onClick={this.updateStatevalue} className='background-blue fw-bolder text-decoration-none cursor-pointer col-md-8 rounded-pill d-flex justify-center py-3 my-3 text-white transform-hover-scale-1-2'>Edit</a>
            </div>}
            <div className='d-flex justify-center'>
              <a className='background-blue fw-bolder text-decoration-none cursor-pointer col-md-8 rounded-pill d-flex justify-center py-3 my-3 text-white transform-hover-scale-1-2'>Add to Shop</a>
            </div>
            <div className='d-flex justify-center w-100'>
              <a className='background-blue fw-bolder text-decoration-none cursor-pointer col-md-8 rounded-pill d-flex justify-center py-3 my-3 text-white transform-hover-scale-1-2'>Delete</a>
            </div>
            <div className='d-flex justify-center w-100'>
              <a className='background-blue fw-bolder text-decoration-none cursor-pointer col-md-8 rounded-pill d-flex justify-center py-3 my-3 text-white transform-hover-scale-1-2'>Recipize</a>
            </div>
          </div>
        </div>
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Item</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body row align-center justify-center">
                <input type="text" value={this.state.name} className="form-control" placeholder="Item name" aria-label="Item name" aria-describedby="basic-addon1" name="name" onChange={this.updateItemDetails} />
                <input type="text" value={this.state.quantity} className="form-control my-4 w-75" placeholder="Quantity" aria-label="Quantity" aria-describedby="basic-addon1" name="quantity" onChange={this.updateItemDetails} />
                <div className="dropdown w-25">
                  <button className="btn btn-secondary dropdown-toggle w-100" type="button" id="measurementMenu" data-bs-toggle="dropdown" aria-expanded="false">
                    {this.state.measurementUnit}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="measurementMenu" onClick={this.updateMeasurementUnit}>
                    {measurementsList}
                  </ul>
                </div>
                <div className='d-flex flex-wrap justify-center'>
                  {listItems}
                </div>
              </div>
              <div className="modal-footer d-flex justify-between">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {goodToSubmit
                  ? <button type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={this.submitEdit} >Add</button>
                  : <button type="button" className="btn btn-primary">Add</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
