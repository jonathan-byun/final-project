import React from 'react';
import Inventory from './pages/inventory';
import parseRoute from './lib/parse-route';
import Favorites from './pages/favorites';
import ShoppingList from './pages/shopping-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    window.onhashchange = e => this.setState({
      route: parseRoute(window.location.hash)
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Inventory />;
    }
    if (route.path === 'Inventory') {
      return <Inventory />;
    }
    if (route.path === 'Favorites') {
      return <Favorites />;
    }
    if (route.path === 'Shopping%20List') {
      return <ShoppingList />;
    }
    return <Inventory />;
  }

  render() {
    return (
      <>{ this.renderPage() }</>
    );
  }
}
