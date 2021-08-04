import './styles';
import { CategoryType, IHistory } from '@/utils/types';
import { addComma } from '@/utils/helper';
import CategoryTag from '@/Components/CategoryTag';

// interface IListStates extends State {
//   history: IHistory;
// }

export default function HistoryList(
  historyList: IHistory[],
  categoryList: CategoryType[]
) {
  return `
    ${historyList
      .map((history) => {
        const category = categoryList.filter(
          (c) => c.type === history.category
        )[0];
        return {
          ...history,
          category: {
            color: category ? category.color : '',
            id: category ? category.id : -1,
            type: history.category,
          },
        };
      })
      .map(
        (history) =>
          `
        <li class="history-list-item" data-id="${history.id}">
          <div class="tag-wrapper">${CategoryTag(history.category)}</div>
          <div class="history-text">
            <div class="history-content">${history.content}</div>
            <div class="history-payment">${history.payment}</div>
            <div class="history-price">
              ${!history.type ? '-' : ''}${addComma(history.price.toString())}원
            </div>
          </div>
        </li>
      `
      )
      .join('')}
  `;
}
