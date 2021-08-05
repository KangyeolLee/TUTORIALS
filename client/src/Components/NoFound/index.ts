import { box } from '@/assets';
import './styles';

export default function NoFound() {
  return `
    <div class="no-found-data">
      <img src="${box}" alt="no-data" />
      <p class="no-found-message">터...텅텅!?</p>
    </div>
  `;
}
