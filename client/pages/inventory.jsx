import React from 'react';
import Navbar from '../components/navbar';
import AddButton from '../components/add-button';
import CategoryButtons from '../components/category-buttons';
import FoodItem from '../components/food-item';
import RightOffcanvas from '../components/right-offcanvas';
import RecipeItem from '../components/recipe-item';

export default class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: [],
      results: [],
      loading: true,
      error: false
    };

    this.setCategory = this.setCategory.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.showAllItems = this.showAllItems.bind(this);
    this.resetSelected = this.resetSelected.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
    this.resetResults = this.resetResults.bind(this);
    this.addToShop = this.addToShop.bind(this);
  }

  resetResults() {
    this.setState({
      selected: [],
      results: []
    });
    window.scrollTo(0, 0);
  }

  searchRecipes() {
    const searchArray = [];
    for (let i = 0; i < this.state.selected.length; i++) {
      const chosen = this.state.items.find(object => object.stockedItemId === this.state.selected[i]);
      if (chosen !== undefined) {
        searchArray.push(chosen.name);
      }
    }
    let searchString = '';
    for (let i = 0; i < searchArray.length; i++) {
      if (i === 0) {
        searchString = searchArray[i];
      } else {
        searchString = searchString + '%20' + searchArray[i];
      }
    }
    fetch('/api/getEdamam/')
      .then(res => res.json())
      .then(data => {
        const edamamApiId = data.id;
        const edamamApiKey = data.key;
        fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=${edamamApiId}&app_key=${edamamApiKey}`)
          .then(res => res.json())
          .then(data => {
            this.setState({
              results: data.hits
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  resetSelected() {
    this.setState({
      selected: []
    });
  }

  setCategory(e) {
    const category = e.target.id;
    fetch(`/api/itemsInCategory/${category}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      })
      .catch(err => console.error(err));
  }

  showAllItems() {
    fetch('/api/stockedItems')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data,
          loading: false
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

  editSelected() {
    fetch(`/api/stockedItemDetails/${this.state.selected[0]}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
      .catch(err => console.error(err));
  }

  addToShop() {
    const requestBody = {
      idArray: this.state.selected
    };
    fetch('/api/addToShop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(res => res.json())
      .then(data => {
        this.resetSelected();
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.showAllItems();
  }

  render() {
    const recipeItemList = this.state.results.map(recipeObject => <RecipeItem key={recipeObject.recipe.label} recipe={recipeObject} />);
    const items = this.state.items;
    const itemsList = items.map(item => this.state.selected.includes(item.stockedItemId)
      ? <div key={item.stockedItemId} className='row justify-center'>
        <div className='width-80 row align-center border-radius-2rem margin-1rem justify-between background-light-beige border-solid border-color-green'>
          <FoodItem loading={this.state.loading} stockedItemId={item.stockedItemId} name={item.name} category={item.foodCategory} quantity={item.quantity} measurement={item.measurementUnit} updateSelected={this.updateSelected} />
        </div>
      </div>
      : <div key={item.stockedItemId} className='row justify-center'>
        <div className='width-80 row align-center border-radius-2rem margin-1rem justify-between background-beige'>
          <FoodItem loading={this.state.loading} stockedItemId={item.stockedItemId} name={item.name} category={item.foodCategory} quantity={item.quantity} measurement={item.measurementUnit} updateSelected={this.updateSelected} />
        </div>
      </div>
    );
    const categoryButtonsArray = (['fruits', 'veggies', 'meat', 'freezer', 'shaker', 'other']);
    return (
      <div>
        <Navbar />
        <div className='background-rose row justify-center min-height-100'>
          <div className='width-80 background-tan'>
            {this.state.results.length > 1
              ? <div>
                <div className='d-flex justify-content-center align-center'>
                  <h1 className='header col-md-4'>Anything Good?</h1>
                  <a onClick={this.resetResults} className='background-blue p-3 rounded-pill cursor-pointer transform-hover-scale-1-2 text-decoration-none fira fw-bolder back-button'>Back</a>
                </div>
                {recipeItemList}
              </div>
              : <div>
                {this.state.loading
                  ? <div className='d-flex justify-content-center w-100'><div className="lds-dual-ring"></div></div>
                  : <div>
                    <div className='d-flex justify-center align-center fira'>
                      <h1 className='header col-2'>Inventory</h1> <AddButton images={categoryButtonsArray} showAllItems={this.showAllItems} />
                    </div>
                    <div className='row justify-center'>
                      <CategoryButtons images={categoryButtonsArray} setCategory={this.setCategory} showAllItems={this.showAllItems} />
                    </div>
                    {this.state.selected.length > 0 && <RightOffcanvas numberSelected={this.state.selected} images={categoryButtonsArray} resetSelected={this.resetSelected} showAllItems={this.showAllItems} searchRecipes={this.searchRecipes} addToShop={this.addToShop} />}
                    {itemsList}
                  </div>
                }</div>}
          </div>
        </div>
      </div>

    );
  }
}
