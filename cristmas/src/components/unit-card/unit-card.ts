import './_unit-card.scss';

import { DOMFactory } from '../../models/dom-factory';
import { IDomWithStaticHtml } from '../../models/IWithStaticHtml';
import { IToyCard } from '../../models/IToyCard';
import { StateDriver, IUseState, IFolower } from '../../models/state-driver';

/**
 *  Builds toy card
 */
export class UnitCardView extends DOMFactory implements IDomWithStaticHtml {
  constructor(initializer: IToyCard) {
    super({
      tagName: 'div',
      className: 'unit-card',
    });

    this.htmlInit(initializer);
  }

  htmlInit(init: IToyCard): void {
    this.domNode.innerHTML = `
  <h2 class="unit-card__heading">${init.name}</h2>
  <div class="unit-card__descriptor">
    <div class="unit-card__leftpan">
      <img
        class="unit-card__toy-image"
        src="${
          'toys/' + init.num + '.png' || 'https://via.placeholder.com/95x112'
        }"
        alt="cristmas-toy"
      >
      <div class="unit-card__is-favorite ">
        <div class="ribbon">

        </div>
      </div>
    </div>
    <div class="unit-card__rigtpan">
      <ul class="unit-card__properties">
        <li class="unit-card__prop-item">
          Count : ${init.count}
        </li>
        <li class="unit-card__prop-item">
          Purchcase date : ${init.year}
        </li>
        <li class="unit-card__prop-item">
          Shape : ${init.shape}
        </li>
        <li class="unit-card__prop-item">
          Color : ${init.color}
        </li>
        <li class="unit-card__prop-item">
          Size : ${init.size}
        </li>
        <li class="unit-card__prop-item">
          Favorite : ${init.favorite}
        </li>
      </ul>
    </div>
  </div>
    `;
  }
}
