import React from 'react';
import Home from './pages/home';
import Inventory from './pages/inventory';
import parseRoute from './lib/parse-Route';

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
      return <Home />;
    }
    if (route.path === 'inventory') {
      return <Inventory />;
    }
  }

  render() {
    return (<Inventory />);
  }
}
