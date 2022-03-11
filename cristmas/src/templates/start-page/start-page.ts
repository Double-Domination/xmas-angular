import './_start-page.scss';

import { DOMFactory } from '../../models/dom-factory';
import { RangeFilterView } from '../../components/range-filter/range-filter';
import { FilterByCountView } from '../../components/count-filter/count-filter';
import { FilterByValueView } from '../../components/value-filter/value-filter';
import { FilterBySortView } from '../../components/sort-filter/sort-filter';
import { ToysDesc } from '../../components/toys-desc/toys-desc';

// interface IStartPageInit {
//   // recivedRoutes: Array<string>;
//   page: string;
// }

/**
 *  Builds start page
 */
export class StartPage extends DOMFactory {
  // navigationRow: HTMLElement;
  constructor(/* initializer: IStartPageInit */) {
    super({
      tagName: 'div',
      className: 'start-page',
    });

    //filters row
    const filtersRow = new DOMFactory({
      className: 'filter-row',
    });
    filtersRow.renderElement(this.domNode);

    // filter by values
    const filtersGroupByValueBlock = new RangeFilterView({
      filterHeader: 'По значению',
    });
    filtersGroupByValueBlock.renderElement(filtersRow.domNode);

    const filterByFormBlock = new FilterByValueView({
      filterHeading: 'Форма',
      filterId: 'id-filter-shape',
      filterStateContainer: 'filterByShape',
      datafilters: ['шар', 'колокольчик', 'шишка', 'снежинка', 'фигурка'],
    });
    filterByFormBlock.renderElement(filtersGroupByValueBlock.domNode);

    //colors filter
    const filterByColorBlock = new FilterByValueView({
      filterHeading: 'Цвет',
      filterId: 'id-filter-color',
      filterStateContainer: 'filterByColor',
      datafilters: ['белый', 'желтый', 'красный', 'синий', 'зелёный'],
    });
    filterByColorBlock.renderElement(filtersGroupByValueBlock.domNode);

    //size filter
    const filterBySizeBlock = new FilterByValueView({
      filterHeading: 'Размер',
      filterId: 'id-filter-size',
      filterStateContainer: 'filterBySize',
      datafilters: ['большой', 'средний', 'малый'],
    });
    filterBySizeBlock.renderElement(filtersGroupByValueBlock.domNode);

    //favorites filter
    const filterByFavoritesBlock = new FilterByValueView({
      filterHeading: 'Только избранные',
      filterId: 'id-filter-favorites',
      filterStateContainer: 'filterByFavorites',
      datafilters: ['избранные'],
    });
    filterByFavoritesBlock.renderElement(filtersGroupByValueBlock.domNode);

    //  filter by range
    const filtersByRangeBlock = new RangeFilterView({
      filterHeader: 'Выборка по количеству',
    });
    filtersByRangeBlock.renderElement(filtersRow.domNode);

    // count filters block
    const countFilterBlock = new FilterByCountView({
      filterHeading: 'Сортировать по количеству игрушек',
      filterId: 'id-count-filter',
      filterStateContainer: 'filterByCount',
      initMinValue: 1,
      initMaxValue: 12,
    });
    countFilterBlock.renderElement(filtersByRangeBlock.domNode);

    //year filters block
    const yearFilterBlock = new FilterByCountView({
      filterHeading: 'Сортировать по годам',
      filterId: 'id-year-filter',
      filterStateContainer: 'filterByYear',
      initMinValue: 1940,
      initMaxValue: 2022,
    });
    yearFilterBlock.renderElement(filtersByRangeBlock.domNode);

    //filter by sorting
    const filtersGroupBySorting = new RangeFilterView({
      filterHeader: 'Сортировка',
    });
    filtersGroupBySorting.renderElement(filtersRow.domNode);

    //filters component
    const sortFilterBlock = new FilterBySortView({
      filterHeading: 'сортировка',
      filterId: 'id-sort-filter',
      filterStateContainer: 'filterBySort',
      defaultSort: 'sort-value-descend',
    });
    sortFilterBlock.renderElement(filtersGroupBySorting.domNode);

    //toys desc
    const toysDescBlock = new ToysDesc();
    toysDescBlock.renderElement(this.domNode);
  }
}
