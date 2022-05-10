import React from 'react';
import Navbar from '../components/navbar';
import FavoriteRecipeItem from '../components/favorite-recipe-item';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.showFavorites = this.showFavorites.bind(this);
    this.removefromFavorite = this.removefromFavorite.bind(this);
  }

  removefromFavorite(e) {
    fetch(`/api/removefavorite/${e.target.dataset.favoriteid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.showFavorites();
      })
      .catch(err => console.error(err));
  }

  showFavorites() {
    fetch('/api/getfavorites')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.showFavorites();
  }

  render() {
    const favoriteRecipesList = this.state.items.map(result => {
      return (
        <div key={result.favoriteId}>
          <FavoriteRecipeItem uri={result.uri} favoriteid={result.favoriteId} removefromFavorite={this.removefromFavorite} />
        </div>
      );
    });
    return (
      <div>
        <Navbar />
        <div className='background-rose row justify-center min-height-100'>
          <div className='width-80 background-tan'>
            <div className='d-flex justify-content-center my-3 fs-1 karla'>
              Favorites
            </div>
            <div className='my-3'>
              {favoriteRecipesList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
