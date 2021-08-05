import Component from '@/Core/Component';
import './styles';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';

type Style = {
  attribute: string;
  value: string;
};

interface DropDownState extends State {
  handler: Function;
  dropdownList: {
    text: string;
    type: string;
    style?: Style[];
  }[];
}

export default class DropDown extends Component<DropDownState, Props> {
  setup() {
    this.$state = {
      handler: this.$state?.handler ?? (() => {}),
      dropdownList: this.$state?.dropdownList ?? [],
    };
  }

  template() {
    return html`
      <ul class="drop-down">
        ${this.$state?.dropdownList
          .map(
            (list, i) =>
              `<li data-id="${i}" data-type="${
                list.type
              }" class="drop-down-item" style="${list.style
                ?.map((style) => `${style.attribute}: ${style.value};`)
                .join(' ')}">${list.text}</li>`
          )
          .join('')}
      </ul>
    `;
  }

  setEvent() {
    this.addEvent('click', '.drop-down', this.$state!.handler);
    this.addEvent('click', '.drop-down', this.toggleDropdown.bind(this));
  }

  toggleDropdown() {
    const dropdown = (<HTMLUListElement>(
      document.querySelector('.drop-down')
    )) as HTMLUListElement;
    dropdown.style.display = 'none';
    dropdown.style.opacity = '0';
  }
}
