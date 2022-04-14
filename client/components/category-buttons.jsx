import React from 'react';

export default function CategoryButtons(props) {
  return (
    <div className='category-row'>
      <div className='column-eighth row align-center'>
        <img className='category-button cursor-pointer' src='./images/fruits.png' onClick={props.setCategory} />
      </div>
      <div className='column-eighth row align-center'>
        <img className='category-button cursor-pointer' src='./images/veggies.png' onClick={props.setCategory} />
      </div>
      <div className='column-eighth row align-center'>
        <img className='category-button cursor-pointer' src='./images/meat.png' onClick={props.setCategory} />
      </div>
      <div className='column-eighth row align-center'>
        <img className='category-button cursor-pointer' src='./images/freezer.png' onClick={props.setCategory} />
      </div>
      <div className='column-eighth row align-center'>
        <img className='category-button cursor-pointer' src='./images/shaker.png' onClick={props.setCategory} />
      </div>
      <div className='column-eighth row align-center'>
        <img className='category-button cursor-pointer' src='./images/other.png' onClick={props.setCategory} />
      </div>

    </div>
  );
}
