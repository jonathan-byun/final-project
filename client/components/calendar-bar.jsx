import React from 'react';

export default function CalendarBar(props) {
  const daysArray = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const daysList = daysArray.map(day => day === props.day
    ? <div onClick={props.updateDay} key={day} className='col d-flex justify-content-center mx-2 my-1 py-3 cursor-pointer hover-green background-lighter-rose'>
      {day}
    </div>
    : <div onClick={props.updateDay} key={day} className='col d-flex justify-content-center mx-2 my-1 py-3 cursor-pointer hover-green'>
      {day}
    </div>
  );
  return (
    <div className='d-flex rounded-pill background-rose my-5 mx-3 px-4'>
      {daysList}
    </div>
  );
}
