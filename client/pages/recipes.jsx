import React from 'react';
import Navbar from '../components/navbar';

export default class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  render() {
    return (
      <Navbar />
    );
  }
}
