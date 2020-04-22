'use strict';

{
  const $ = (qs) => document.querySelector(qs);

  const generateJokes = (obj) => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');

    obj.value.forEach((item) => {
      const { id, joke } = item;
      console.log(`TEST: ${id}  AND ${joke}`);

      const colEl = document.createElement('div');
      const cardEl = document.createElement('div');
      const cardBodyEl = document.createElement('div');
      const h4El = document.createElement('h4'); //id
      const cardTextEl = document.createElement('article'); //joke

      colEl.classList.add('col-xs-12', 'col-sm-6', 'col-md-4', 'mb-2');
      cardEl.classList.add('card');
      cardBodyEl.classList.add('card-body');
      h4El.classList.add('card-title'); //id
      cardTextEl.classList.add('card-text'); //joke

      h4El.textContent = id;
      cardTextEl.textContent = joke;

      rowEl.appendChild(colEl);
      colEl.appendChild(cardEl);
      cardEl.appendChild(cardBodyEl);
      cardBodyEl.appendChild(h4El);
      cardBodyEl.appendChild(cardTextEl);

      $('.chuck-norris-jokes').appendChild(rowEl);

      return colEl;
    });
  };

  module.exports = {
    generateJokes
  };
}
