import React from 'react';

// export default function CategoryButtons(props) {
//   const images = props.images;
//   const listItems = images.map(image =>
//     <div key={image} className='column-eighth row align-center'>
//       <img className='category-button cursor-pointer' src={image} onClick={props.setCategory} />
//     </div>
//   );
//   return (
//     <div className='category-row'>
//       {listItems}
//     </div>
//   );
// }

export default class CategoryButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null
    };
    this.categoryClicked = this.categoryClicked.bind(this);
  }

  categoryClicked(e) {
    this.props.setCategory(e);
    if (this.state.category !== e.target.id) {
      this.setState({
        category: e.target.id
      });
    } else {
      this.setState({
        category: null
      });
    }
  }

  render() {
    const images = this.props.images;
    const listItems = images.map(image => this.state.category === `${image}-category-button`
      ? <div key={image} className='column-eighth row align-center'>
        <img id={`${image}-category-button`} className='category-button cursor-pointer background-lighter-rose' src={`./images/${image}.png`} onClick={this.categoryClicked} />
        </div>
      : <div key={image} className='column-eighth row align-center'>
        <img id={`${image}-category-button`} className='category-button cursor-pointer' src={`./images/${image}.png`} onClick={this.categoryClicked} />
        </div>
    );
    return (
      <div className='category-row'>
        {listItems}
      </div>
    );
  }
}
