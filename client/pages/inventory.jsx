import React from 'react';
import Navbar from '../components/navbar';
import AddButton from '../components/add-button';
import CategoryButtons from '../components/category-buttons';
import FoodItem from '../components/food-item';
export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.openModal = this.openModal.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.showSelection = this.showSelection.bind(this);
  }

  openModal() {

  }

  setCategory(e) {
    // when cateogry is clicked fetch items in category and set state items
  }

  showSelection() {

  }

  render() {
    const categoryButtonsArray = (['fruits', 'veggies', 'meat', 'freezer', 'shaker', 'other']);
    return (
      <div>
        <Navbar />
        <div className='background-rose row justify-center'>
          <div className='width-80 background-tan'>
            <div className='row justify-center align-center fira'><h1 className='header'>Inventory</h1> <AddButton openModal={this.openModal} /></div>
            <div className='row justify-center'>
              <CategoryButtons images = {categoryButtonsArray} setCategory={this.setCategory} />
            </div>
            <div className='row justify-center'>
              <FoodItem category='fruits' quantity='8' showSelection={this.showSelection}/>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
