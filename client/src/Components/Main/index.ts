import Component from '@/Core/Component';
import './styles';
import { Props, State } from '@/utils/types';
import { html } from '@/utils/helper';
import { histories } from '@/assets/dummy';
import List from '@/Components/List';

export default class Main extends Component<State, Props> {
  template() {
    return html`
    <section class="history-day-card">
      <div class="history-date">
        <div class="date">${'7월 15일'}${' 목'}</div>
        <div class="total">${'수입 1,000원'}</div>
      </div>
      <li class="history-list">
        <div class="category-tag" data-id="${7}">${'생활'}</div>
        <div class="history-text">
          <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
          <div class="history-payment">${'현대카드'}</div>
          <div class="history-price">${'-10,900원'}</div>
        <div>
      </li>
      <li class="history-list">
        <div class="category-tag" data-id="${2}">${'생활'}</div>
        <div class="history-text">
          <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
          <div class="history-payment">${'현대카드'}</div>
          <div class="history-price">${'-10,900원'}</div>
        <div>
      </li>
      <li class="history-list">
        <div class="category-tag" data-id="${3}">${'생활'}</div>
        <div class="history-text">
          <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
          <div class="history-payment">${'현대카드'}</div>
          <div class="history-price">${'-10,900원'}</div>
        <div>
      </li>
      <li class="history-list">
        <div class="category-tag" data-id="${4}">${'생활'}</div>
        <div class="history-text">
          <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
          <div class="history-payment">${'현대카드'}</div>
          <div class="history-price">${'-10,900원'}</div>
        <div>
      </li>
      <section class="history-day-card">
        <div class="history-date">
          <div class="date">${'7월 15일'}${'목'}</div>
          <div class="total">${'수입 1,000원'}</div>
        </div>
        <li class="history-list">
          <div class="category-tag" data-id="${5}">${'생활'}</div>
          <div class="history-text">
            <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
            <div class="history-payment">${'현대카드'}</div>
            <div class="history-price">${'-10,900원'}</div>
          <div>
        </li>
        <li class="history-list">
          <div class="category-tag" data-id="${1}">${'생활'}</div>
          <div class="history-text">
            <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
            <div class="history-payment">${'현대카드'}</div>
            <div class="history-price">${'-10,900원'}</div>
          <div>
        </li>
      </section>
      <section class="history-day-card">
        <div class="history-date">
          <div class="date">${'7월 15일'}${'목'}</div>
          <div class="total">${'수입 1,000원'}</div>
        </div>
        <li class="history-list">
          <div class="category-tag" data-id="${10}">${'생활'}</div>
          <div class="history-text">
            <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
            <div class="history-payment">${'현대카드'}</div>
            <div class="history-price">${'-10,900원'}</div>
          <div>
        </li>
      </section>
      <section class="history-day-card">
        <div class="history-date">
          <div class="date">${'7월 15일'}${'목'}</div>
          <div class="total">${'수입 1,000원'}</div>
        </div>
        <li class="history-list">
          <div class="category-tag" data-id="${1}">${'생활'}</div>
          <div class="history-text">
            <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
            <div class="history-payment">${'현대카드'}</div>
            <div class="history-price">${'-10,900원'}</div>
          <div>
        </li>
      </section>
      <section class="history-day-card">
        <div class="history-date">
          <div class="date">${'7월 15일'}${'목'}</div>
          <div class="total">${'수입 1,000원'}</div>
        </div>
        <li class="history-list">
          <div class="category-tag" data-id="${1}">${'생활'}</div>
          <div class="history-text">
            <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
            <div class="history-payment">${'현대카드'}</div>
            <div class="history-price">${'-10,900원'}</div>
          <div>
        </li>
        <li class="history-list">
          <div class="category-tag" data-id="${9}">${'생활'}</div>
          <div class="history-text">
            <div class="history-content">${'스트리밍서비스 정기 결제'}</div>
            <div class="history-payment">${'현대카드'}</div>
            <div class="history-price">${'-10,900원'}</div>
          <div>
        </li>
      </section>
    `;
  }
}
