import React from 'react';
import Navbar from '../components/navbar';
import AddButton from '../components/add-button';
import CategoryButtons from '../components/category-buttons';
import FoodItem from '../components/food-item';
import RightOffcanvas from '../components/right-offcanvas';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: []
    };

    this.setCategory = this.setCategory.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.showAllItems = this.showAllItems.bind(this);
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

  updateSelected(e) {
    const id = Number(e.target.closest('div[id]').id);
    if (this.state.selected.indexOf(id) === -1) {
      this.setState(state => ({
        selected: [...state.selected, id]
      }));
      return;
    }
    const copy = this.state.selected.concat();
    copy.splice(this.state.selected.indexOf(id), 1);
    this.setState({
      selected: copy
    });
  }

  componentDidMount() {
    this.showAllItems();
  }

  render() {
    const items = this.state.items;
    const itemsList = items.map(item => this.state.selected.includes(item.stockedItemId)
      ? <div key={item.stockedItemId} className='row justify-center'>
          <div className='width-80 row align-center border-radius-2rem margin-1rem justify-between background-light-beige border-solid border-color-green'>
            <FoodItem stockedItemId={item.stockedItemId} name={item.name} category={item.foodCategory} quantity={item.quantity} measurement={item.measurementUnit} updateSelected={this.updateSelected} />
          </div>
        </div>
      : <div key={item.stockedItemId} className='row justify-center'>
          <div className='width-80 row align-center border-radius-2rem margin-1rem justify-between background-beige'>
            <FoodItem stockedItemId={item.stockedItemId} name={item.name} category={item.foodCategory} quantity={item.quantity} measurement={item.measurementUnit} updateSelected={this.updateSelected} />
          </div>
        </div>
    );
    const categoryButtonsArray = (['fruits', 'veggies', 'meat', 'freezer', 'shaker', 'other']);
    return (
      <div>
        <Navbar />
        <div className='background-rose row justify-center min-height-100'>
          <div className='width-80 background-tan'>
            <div className='row justify-center align-center fira'><h1 className='header col-md-2'>Inventory</h1> <AddButton images={categoryButtonsArray} showAllItems={this.showAllItems} /></div>
            <div className='row justify-center'>
              <CategoryButtons images={categoryButtonsArray} setCategory={this.setCategory} showAllItems={this.showAllItems} />
            </div>
            {this.state.selected.length > 0 && <RightOffcanvas />}
            {itemsList}
          </div>
        </div>
      </div>

    );
  }
}
