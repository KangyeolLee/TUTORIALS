import { CategoryCardsType, HistoryModelType, IHistory } from '@/utils/types';
import HistoryModel from '@/Model/HistoryModel';
import { asyncSetState } from '@/utils/helper';

const PERCENTAGE = 100;
const CIRCLEDEGREE = 360;

class ChartController {
  historyModel!: HistoryModelType;

  constructor() {
    this.historyModel = HistoryModel;
  }

  filterHistoryCardByCategory(historyCards: IHistory[], type: number) {
    const typedHistoryCards = historyCards.filter(
      (history) => history.type === type
    );

    const priceAmount = typedHistoryCards.reduce((acc, cur) => {
      return acc + Number(cur.price);
    }, 0);

    const categoryCards = typedHistoryCards.reduce(
      (acc: CategoryCardsType, history) => {
        if (!acc[history.category]) {
          acc[history.category] = { price: 0, percent: 0 };
          acc[history.category].price += +history.price;
          return acc;
        }

        acc[history.category].price += +history.price;
        return acc;
      },
      {}
    );

    Object.entries(categoryCards).forEach((card) => {
      const [key, value] = card;
      categoryCards[key].percent = Math.round(
        (value.price / priceAmount) * 100
      );
    });

    const categories = Object.entries(categoryCards)
      .map((card) => card)
      .sort((a, b) => b[1].percent - a[1].percent)
      .map((card) => card[0]);

    return { categories, categoryCards };
  }

  filterHistoryCardBySelectedCategory(
    historyCards: IHistory[],
    type: number,
    selectedCategory: string
  ) {
    const typedHistoryCards = historyCards.filter(
      (history) =>
        history.type === type && history.category === selectedCategory
    );

    asyncSetState(
      this.historyModel.getHistoryCardForCategory(
        selectedCategory,
        typedHistoryCards
      )
    );
  }

  makeDonutChart(
    categories: string[],
    categoryCards: CategoryCardsType,
    $svg: HTMLElement
  ) {
    let totalPercentage = 0;
    const startAngle = -90;
    const radius = 30;
    const cx = 50,
      cy = 50;
    const strokeWidth = 15;
    const dashArray = 2 * Math.PI * radius;
    const speedMs = 650;

    categories.forEach((category) => {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );

      const dashOffset =
        dashArray - (dashArray * categoryCards[category].percent) / PERCENTAGE;
      const currentDuration =
        (speedMs * categoryCards[category].percent) / PERCENTAGE;
      const delay = (speedMs * totalPercentage) / PERCENTAGE;
      const angle = (totalPercentage * CIRCLEDEGREE) / PERCENTAGE + startAngle;

      circle.setAttribute('r', radius.toString());
      circle.setAttribute('cx', cx.toString());
      circle.setAttribute('cy', cy.toString());
      circle.setAttribute('fill', 'transparent');
      circle.setAttribute(
        'stroke',
        '#' + Math.round(Math.random() * 0xfff).toString(16)
        // 색깔 카테고리에서 받아와야 함!!
      );
      circle.setAttribute('stroke-width', strokeWidth.toString());
      circle.setAttribute('stroke-dasharray', dashArray.toString());
      circle.setAttribute('stroke-dashoffset', dashArray.toString());
      circle.style.transition =
        'stroke-dashoffset ' + currentDuration + 'ms linear ' + delay + 'ms';
      circle.setAttribute(
        'transform',
        'rotate(' + angle + ' ' + cx + ' ' + cy + ')'
      );
      $svg?.append(circle);
      totalPercentage += categoryCards[category].percent;
      setTimeout(function () {
        circle.setAttribute('stroke-dashoffset', dashOffset.toString());
      }, 100);
    });
  }
}

export default new ChartController();
