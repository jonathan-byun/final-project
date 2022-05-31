import React from 'react';

export default class PlannedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      name: '',
      imgUrl: '',
      ingredients: [],
      recipeUrl: '',
      macros: [],
      loading: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/getEdamam')
      .then(res => res.json())
      .then(data => {
        const edamamApiId = data.id;
        const edamamApiKey = data.key;
        fetch(`https://api.edamam.com/api/recipes/v2/${this.props.uri}?type=public&app_id=${edamamApiId}&app_key=${edamamApiKey}`, {
          headers: { 'Access-Control-Allow-Origin': 'https://api.edamam.com/' }
        })
          .then(res => res.json())
          .then(data => {
            const recipe = data.recipe;
            const macro = recipe.totalNutrients;
            this.setState({
              name: recipe.label,
              imgUrl: recipe.image,
              ingredients: recipe.ingredients,
              recipeUrl: recipe.url,
              calories: recipe.calories,
              macros: [macro.CHOCDF, macro.CHOLE, macro.FAT, macro.PROCNT, macro.NA],
              yield: recipe.yield,
              loading: false
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  render() {
    const ingredientsList = this.state.ingredients.map(ingredient => {
      return (
        <li key={ingredient.food}>{ingredient.text}</li>
      );
    });

    const ingredients =
      <div className='my-3'>
        <h3 className='d-flex justify-content-center'>
          Ingredients
        </h3>
        <div>
          {ingredientsList}
        </div>
      </div>;

    const macrosList = this.state.macros.map(value =>
      <div key={value.label}>
        {value.label} : {value.quantity / this.state.yield} {value.unit}
      </div>
    );

    const macros =
      <div className='my-3'>
        <h3 className='d-flex justify-content-center'>
          Macros per serving
        </h3>
        Calories : {this.state.calories / this.state.yield}
        {macrosList}
      </div>;

    const urlButton =
      <div buttontype='url' className='d-flex justify-content-center my-2'>
        <a className='background-green p-3 rounded-pill cursor-pointer transform-hover-scale-1-2 text-decoration-none fira fw-bolder' href={this.state.recipeUrl} target="_blank" rel="noopener noreferrer">Make it!</a>
      </div>;

    const unplanButton =
      <div buttontype='favorite' className='d-flex justify-content-center my-2'>
        <a onClick={this.props.deleteItem} data-plannedid={this.props.plannedId} className='background-blue p-3 rounded-pill cursor-pointer transform-hover-scale-1-2 text-decoration-none fira fw-bolder text-black'>Remove</a>
      </div>;

    return (
      <div>
        <div className='row justify-center'>
          <div className='width-80 d-flex align-center border-radius-2rem mt-1 background-beige cursor-pointer' onClick={this.handleClick}>
            {this.state.loading
              ? <div className='d-flex justify-content-center w-100'><div className="lds-dual-ring"></div></div>
              : <div className='d-flex align-center h-100 py-4 justify-content-center'>
                <div className='col-md-2'>
                  <img className='rounded w-100 h-100' src={this.state.imgUrl}></img>
                </div>
                <h1 className='no-select d-flex justify-content-center mx-4 col-md'>
                  {this.state.name}
                </h1>
              </div>
            }
          </div>
        </div>
        {this.state.clicked &&
          <div className='d-flex justify-content-center'>
            <div className='w-75 background-light-beige border border-top-0 border-secondary p-3'>
              {ingredients}
              {macros}
              {urlButton}
              {unplanButton}
            </div>
          </div>
        }
      </div>
    );
  }
}
