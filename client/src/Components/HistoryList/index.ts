import './styles';
import { IHistory } from '@/utils/types';
import { addComma } from '@/utils/helper';
import CategoryTag from '@/Components/CategoryTag';

// interface IListStates extends State {
//   history: IHistory;
// }

export default function HistoryList(historyList: IHistory[]) {
  return `
    ${historyList
      .map(
        (history) =>
          `
        <li class="history-list-item">
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
