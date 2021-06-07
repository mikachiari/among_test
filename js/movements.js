/* jshint esversion: 6 */

let logs;
let selected;
let astronauts;
let coordinates = [];

let start = null;

const MAX_X = 800;
const MAX_Y = 600;

const DELTA_X = 5;
const DELTA_Y = 5;
let multi_x = 0;
let multi_y = 0;

const getRandomInt = max => Math.floor(Math.random() * max);
const storeCoords = (index, x,y) => coordinates[index] = {x, y};

const add_log = text => {
  const p = document.createElement('p');
  p.textContent = text;
  logs.appendChild(p);
  logs.scrollTop = logs.scrollHeight;
};

const turn_left = el => el.classList.add('left_look');
const turn_right = el => el.classList.remove('left_look');

const get_cosmonaut = id => document.getElementById(id);

const drop_selection = () => {
  selected = get_cosmonaut('0');
  for (let i = 0; i < astronauts.length; i++) {
    astronauts.item(i).classList.remove('selected');
  }
};

const select = id => {
  drop_selection();
  multi_x = 0;
  multi_y = 0;
  selected = get_cosmonaut(id);
  selected.classList.add('selected');
};

const go_up = el => {
  multi_y = -1;
  add_log('up');
};
const go_down = el => {
  multi_y = 1;
  add_log('down');
};

const move = (timestamp) => {
  if (!start) start = timestamp;
  const progress = timestamp - start;
  if (multi_x || multi_y) {
    let x = coordinates[selected.id].x + (DELTA_X * multi_x);
    let y = coordinates[selected.id].y + (DELTA_Y * multi_y);

    x = (x > MAX_X - 100) ? MAX_X - 100 : x;
    x = (x < 0) ? 0 : x;

    y = (y > MAX_Y - 56) ? MAX_Y - 56 : y;
    y = (y < 0) ? 0 : y;

    storeCoords(selected.id, x, y);
    selected.style.left = `${x}px`;
    selected.style.top = `${y}px`;
  }
  window.requestAnimationFrame(move);
};


const go_left = el => {
  turn_left(el);
  multi_x = -1;
  add_log('left');
};

const go_right = el => {
  turn_right(el);
  multi_x = 1;
  add_log('right');
};

document.addEventListener('keydown', evt => {
  // console.log(evt);
  switch(evt.key){
    case '1': select('1'); break;
    case '2': select('2'); break;
    case 'ArrowLeft': go_left(selected); break;
    case 'ArrowRight': go_right(selected); break;
    case 'ArrowUp': go_up(selected); break;
    case 'ArrowDown': go_down(selected); break;
  }
});

document.addEventListener('keyup', evt => {
  // console.log(evt);
  switch (evt.key) {
    case 'ArrowLeft':
    case 'ArrowRight': multi_x = 0; break;
    case 'ArrowUp':
    case 'ArrowDown': multi_y = 0; break;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  selected = get_cosmonaut('0');
  logs = document.getElementsByClassName("log")[0];
  astronauts = document.getElementsByClassName('astronaut');

  for(let i=0; i<astronauts.length; i++) {
    const x = getRandomInt(MAX_X - 100);
    const y = getRandomInt(MAX_Y - 100);
    const a = astronauts.item(i);
    a.style.left = `${x}px`;
    a.style.top = `${y}px`;

    storeCoords(a.id, x, y);
  }
  window.requestAnimationFrame(move);
});