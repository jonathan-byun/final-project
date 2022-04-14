import React from 'react';

export default function CategoryButtons(props) {
  return (
    <div className='category-row'>
      <div className='column-sixth'>
        <img className='width-100' src='./images/fruits.png' onClick={props.setCategory} />
      </div>
      <div className='column-sixth'>
        <img className='width-100' src='./images/fruits.png' onClick={props.setCategory} />
      </div>
      <div className='column-sixth'>
        <img className='width-100' src='./images/fruits.png' onClick={props.setCategory} />
      </div>
      <div className='column-sixth'>
        <img className='width-100' src='./images/fruits.png' onClick={props.setCategory} />
      </div>
      <div className='column-sixth'>
        <img className='width-100' src='./images/fruits.png' onClick={props.setCategory} />
      </div>
      <div className='column-sixth'>
        <img className='width-100' src='./images/fruits.png' onClick={props.setCategory} />
      </div>
    </div>
  );
}
