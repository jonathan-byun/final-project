import React from 'react';
import NavbarButton from './navbar-button';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: window.innerWidth
    };
    this.updateSize = this.updateSize.bind(this);
  }

  updateSize() {
    this.setState({
      screen: window.innerWidth
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSize);
  }

  render() {
    return (
      <div className='navbar-container row justify-center'>
        <div id='navbar' className='row justify-between align-center'>
          <div className='d-flex align-center col col-md-3'>
            <img className='navbar-img col-3' src='./images/carrot.webp' />
            <a className='cursor-pointer home-button col-8' href='#'>
              My Kitchen
            </a>
          </div>
          {this.state.screen > 768
            ? <div className='row col-9 align-center'>
              <NavbarButton name='Inventory' />
              <NavbarButton name='Favorites' />
              <NavbarButton name='Shopping List' />
              <NavbarButton name='Calendar' />
            </div>
            : <div className="dropdown justify-content-right col-5">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Nav
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><NavbarButton name='Inventory' /></li>
                <li><NavbarButton name='Favorites' /></li>
                <li><NavbarButton name='Shopping List' /></li>
                <li><NavbarButton name='Calendar' /></li>
              </ul>
            </div>
          }

        </div>
      </div>
    );
  }
}
