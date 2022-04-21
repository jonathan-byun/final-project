import React from 'react';

export default class RightOffcanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  render() {
    return (
      <div className="offcanvas offcanvas-end show" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="editOffCanvas">
        <div className="offcanvas-header show background-rose d-flex justify-center border-start border-secondary">
          <h5 className="offcanvas-title show updock fs-1 fw-bolder text-white text-center" id="editOffCanvas">Selection</h5>
        </div>
        <div className="offcanvas-body show background-light-beige  border-start border-secondary">
          <div className='d-flex justify-center'>
            <a className='background-blue fw-bolder text-decoration-none cursor-pointer col-md-8 rounded-pill d-flex justify-center py-3 my-3 text-white transform-hover-scale-1-2'>Edit</a>
          </div>
          <div className='d-flex justify-center w-100'>
            <a className='background-blue fw-bolder text-decoration-none cursor-pointer col-md-8 rounded-pill d-flex justify-center py-3 my-3 text-white transform-hover-scale-1-2'>Delete</a>
          </div>
          <div className='d-flex justify-center w-100'>
            <a className='background-blue fw-bolder text-decoration-none cursor-pointer col-md-8 rounded-pill d-flex justify-center py-3 my-3 text-white transform-hover-scale-1-2'>Recipize</a>
          </div>
        </div>
      </div>
    );
  }
}
