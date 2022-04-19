import React from 'react';

export default function AddButton(props) {
  return (
    <a className='add-button cursor-pointer col-md-1 text-align-center' onClick={props.openModal}>Add</a>
  );
}
