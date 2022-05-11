import React from 'react';
import Navbar from '../components/navbar';
import CategoryButtons from '../components/category-buttons';
import ShoppingRightOffcanvas from '../components/shopping-right-offcanvas';
import AddToShop from '../components/add-to-shop-button';
import ShoppingListItem from '../components/shopping-list-item';

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: []
    };
    this.showAllItems = this.showAllItems.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }

  componentDidMount() {
    this.showAllItems();
  }

  showAllItems() {
    fetch('/api/neededItems')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      })
      .catch(err => console.error(err));
  }

  setCategory(e) {
    const category = e.target.id;
    fetch(`/api/itemsNeededInCategory/${category}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      })
      .catch(err => console.error(err));
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

  render() {
    const categoryButtonsArray = (['fruits', 'veggies', 'meat', 'freezer', 'shaker', 'other']);
    const items = this.state.items;
    const itemsList = items.map(item => this.state.selected.includes(item.neededItemId)
      ? <div key={item.neededItemId} className='row justify-center'>
        <div className='width-80 row align-center border-radius-2rem margin-1rem justify-between background-light-beige border-solid border-color-green'>
          <ShoppingListItem foodItem={item} updateSelected={this.updateSelected} />
        </div>
      </div>
      : <div key={item.neededItemId} className='row justify-center'>
        <div className='width-80 row align-center border-radius-2rem margin-1rem justify-between background-beige'>
          <ShoppingListItem foodItem={item} updateSelected={this.updateSelected}/>
        </div>
      </div>
    );
    return (
      <div>
        <Navbar />
        <div className='background-rose row justify-center min-height-100'>
          <div className='width-80 background-tan'>
          <div>
                <div className='row justify-center align-center fira'>
                  <h1 className='header col-md-2'>Shopping List</h1> <AddToShop showAllItems={this.showAllItems} />
                </div>
                <div className='row justify-center'>
                  <CategoryButtons images={categoryButtonsArray} setCategory={this.setCategory} showAllItems={this.showAllItems} />
                </div>
                {this.state.selected.length > 0 && <ShoppingRightOffcanvas numberSelected={this.state.selected} images={categoryButtonsArray} resetSelected={this.resetSelected} showAllItems={this.showAllItems} searchRecipes={this.searchRecipes} />}
                {itemsList}
              </div>
          </div>
        </div>
      </div>
    );
  }
}
