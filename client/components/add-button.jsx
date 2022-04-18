import React from 'react';

export default function AddButton(props) {
  return (
    <a className='add-button cursor-pointer' onClick={props.openModal}>Add</a>
  );
}
