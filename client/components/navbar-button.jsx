import React from 'react';

export default function NavbarButton(props) {
  const hashRoute = '#' + props.name;
  return (
    <a className='cursor-pointer nav-button col' href={hashRoute}>
      {props.name}
    </a>
  );
}
