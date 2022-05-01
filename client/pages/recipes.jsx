import React from 'react';
import Navbar from '../components/navbar';
import RecipeItem from '../components/recipe-item';

export default class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchItems: []
    };
    this.getRecipe = this.getRecipe.bind(this);
  }

  getRecipe() {
    fetch('https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=d5d20c06&app_key=549162c7a149851b2151a7de9ad9ee1d')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data.hits
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const recipeItemList = this.state.items.map(recipeObject => <RecipeItem key={recipeObject.recipe.label} recipe={recipeObject} />);
    return (<div>
      <Navbar />
      <div className='background-rose row justify-center min-height-100'>
        <div className='width-80 background-tan'>
          {this.state.items > 0 &&
            { recipeItemList }
          }
        </div>
      </div>
    </div>
    );
  }
}
