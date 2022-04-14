import React from 'react';
import Navbar from '../components/navbar';
import AddButton from '../components/add-button';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {

  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='background-tan row justify-center'>
          <div className='width-80'>
            <div className='row justify-center align-center fira'><h1 className='header'>Inventory</h1> <AddButton openModal={this.openModal} /></div>
          </div>
        </div>
      </div>

    );
  }
}
