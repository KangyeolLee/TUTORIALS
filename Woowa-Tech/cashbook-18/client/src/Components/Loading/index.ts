import './styles';
import { html } from '@/utils/helper';

const Loading = () => {
  return html`
    <div class="loading-component">
      <div class="loading-wrapper">
        <div class="loading-content">
          <div>
            <div>
              <div><div></div></div>
            </div>
            <div>
              <div><div></div></div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  `;
};

export default Loading;
