import React from 'react';
import Navbar from '../components/navbar';
import CalendarBar from '../components/calendar-bar';
import PlannedItem from '../components/planned-item';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      day: ''
    };
    this.getPlanned = this.getPlanned.bind(this);
    this.setDay = this.setDay.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateDay = this.updateDay.bind(this);
  }

  updateDay(e) {
    const day = e.target.innerText;
    if (day === this.state.day) {
      this.getPlanned();
      this.setState({
        day: ''
      });
      return;
    }
    this.setDay(day);
    this.setState({
      day: e.target.innerText
    });
  }

  getPlanned() {
    fetch('/api/planned')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      })
      .catch(err => console.error(err));
  }

  setDay(day) {
    fetch(`/api/plannedAt/${day}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getPlanned();
  }

  deleteItem(e) {
    const id = e.target.dataset.plannedid;
    fetch(`/api/plannedAt/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        this.getPlanned();
        this.setState({
          day: ''
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const itemList = this.state.items.map(item => {
      return (
        <div key={item.plannedRecipeId}>
          <PlannedItem plannedId={item.plannedRecipeId} uri={item.recipeUri} deleteItem={this.deleteItem} />
        </div>
      );
    });
    return (
      <div>
        <Navbar />
        <div className='background-rose row justify-center min-height-100'>
          <div className='width-80 background-tan'>
            <CalendarBar day={this.state.day} updateDay={this.updateDay} getPlanned={this.getPlanned} setDay={this.setDay} />
            {itemList}
          </div>
        </div>
      </div>
    );
  }
}
