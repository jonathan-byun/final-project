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
    this.showAllItems = this.showAllItems.bind(this);
  }

  openModal() {

  }

  setCategory(e) {
    const category = e.target.id;
    fetch(`/api/itemsInCategory/${category}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      });
  }

  showAllItems() {
    fetch('/api/stockedItems')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      });
  }

  showSelection() {

  }

  componentDidMount() {
    fetch('/api/stockedItems')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      });
  }

  render() {
    const items = this.state.items;
    const itemsList = items.map(item =>
      <div key={item.stockedItemId} className='row justify-center'>
        <FoodItem stockedItemId={item.stockedItemId} name={item.name} category={item.foodCategory} quantity={item.quantity} measurement={item.measurementUnit} showSelection={this.showSelection} />
      </div>
    );
    const categoryButtonsArray = (['fruits', 'veggies', 'meat', 'freezer', 'shaker', 'other']);
    return (
      <div>
        <Navbar />
        <div className='background-rose row justify-center height-100vh'>
          <div className='width-80 background-tan'>
            <div className='row justify-center align-center fira'><h1 className='header col-md-2'>Inventory</h1> <AddButton openModal={this.openModal} images={categoryButtonsArray} /></div>
            <div className='row justify-center'>
              <CategoryButtons images={categoryButtonsArray} setCategory={this.setCategory} showAllItems={this.showAllItems} />
            </div>
            {itemsList}
          </div>
        </div>
      </div>

    );
  }
}
