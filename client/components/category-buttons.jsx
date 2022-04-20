import React from 'react';

export default class CategoryButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null
    };
    this.categoryClicked = this.categoryClicked.bind(this);
  }

  categoryClicked(e) {
    if (this.state.category !== e.target.id) {
      this.props.setCategory(e);
      this.setState({
        category: e.target.id
      });
    } else {
      this.props.showAllItems();
      this.setState({
        category: null
      });
    }
  }

  render() {
    const images = this.props.images;
    const listItems = images.map(image => this.state.category === image
      ? <div key={image} className='column-eighth row align-center'>
        <img id={image} className='category-button cursor-pointer background-lighter-rose' src={`./images/${image}.png`} onClick={this.categoryClicked} />
        </div>
      : <div key={image} className='column-eighth row align-center'>
        <img id={image} className='category-button cursor-pointer' src={`./images/${image}.png`} onClick={this.categoryClicked} />
        </div>
    );
    return (
      <div className='category-row'>
        {listItems}
      </div>
    );
  }
}
