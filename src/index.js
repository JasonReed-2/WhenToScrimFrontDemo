import React from 'react';
import ReactDOM from 'react-dom';
import Calender from './calendar'

const startTime = 300
const endTime = 600
const jump = 15

ReactDOM.render(
  <Calender start={startTime} end={endTime} jump={jump} />,
  document.getElementById('root')
);
