import React from 'react';
import NavbarButton from './navbar-button';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className='navbar-container row justify-center'>
        <div id='navbar' className='row justify-between align-center'>
          <div className='row align-center'>
            <img className='navbar-img' src='./images/carrot.png' />
            <a className='cursor-pointer home-button' href='#'>
              My Kitchen
            </a>
          </div>
          <div className='row'>
            <NavbarButton name='Inventory' />
            <NavbarButton name='Recipes' />
            <NavbarButton name='Favorites' />
            <NavbarButton name='Shopping List' />
            <NavbarButton name='Calendar' />
          </div>
        </div>
      </div>
    );
  }
}