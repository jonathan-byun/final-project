import React from 'react';
import Navbar from '../components/navbar';
import FavoriteRecipeItem from '../components/favorite-recipe-item';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      showModal: false,
      itemForPlan: 0,
      day: 'Mon'
    };
    this.showFavorites = this.showFavorites.bind(this);
    this.removefromFavorite = this.removefromFavorite.bind(this);
    this.prepForPlan = this.prepForPlan.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateDay = this.updateDay.bind(this);
    this.addToPlanned = this.addToPlanned.bind(this);
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

  prepForPlan(e) {
    this.setState({
      showModal: true,
      itemForPlan: e.target.dataset.favoriteid
    });
  }

  addToPlanned() {
    const request = {
      favoritedRecipeId: this.state.itemForPlan,
      dayOfWeek: this.state.day
    };
    fetch('/api/addToCalendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  closeModal(e) {
    if (e.target.className === 'modal d-block' || e.target.className === 'btn-close' || e.target.className === 'btn btn-secondary' || e.target.className === 'btn btn-primary') {
      this.setState({
        showModal: false
      });
    }
  }

  updateDay(e) {
    this.setState({
      day: e.target.name
    });
  }

  componentDidMount() {
    this.showFavorites();
  }

  render() {
    const favoriteRecipesList = this.state.items.map(result => {
      return (
        <div key={result.favoriteId}>
          <FavoriteRecipeItem prep={this.prepForPlan} uri={result.uri} favoriteid={result.favoriteId} removefromFavorite={this.removefromFavorite} />
        </div>
      );
    });

    const daysArray = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    const daysList = daysArray.map(day => {
      return (
        <li key={day}><a className='dropdown-item cursor-pointer' name={day}>{day}</a></li>
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
        {this.state.showModal &&
          <div>
            <div className='modal-background-fade' >
            </div>
            <div onClick={this.closeModal} className="modal d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">What Day?</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                  </div>
                  <div className="modal-body d-flex justify-content-center">
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {this.state.day}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" onClick={this.updateDay}>
                        {daysList}
                      </ul>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" aria-hidden="true" onClick={this.addToPlanned} >Plan!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
