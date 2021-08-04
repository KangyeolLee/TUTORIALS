import Component from '@/Core/Component';
import './styles';
import { html } from '@/utils/helper';
import { Props, State } from '@/utils/types';

type Style = {
  attribute: string;
  value: string;
};

interface DropDownState extends State {
  dropdownList: {
    text: string;
    handler: Function;
    style?: Style[];
  }[];
}

export default class DropDown extends Component<DropDownState, Props> {
  setup() {
    this.$state = {
      dropdownList: this.$state?.dropdownList ?? [],
    };
  }

  template() {
    return html`
      <ul class="drop-down">
        ${this.$state?.dropdownList
          .map(
            (list, i) =>
              `<li data-id="${i}" class="drop-down-item" style="${list.style
                ?.map((style) => `${style.attribute}: ${style.value};`)
                .join(' ')}">${list.text}</li>`
          )
          .join('')}
      </ul>
    `;
  }

  setEvent() {
    this.$state?.dropdownList.forEach((list, i) => {
      this.addEvent(
        'click',
        `.drop-down-item[data-id="${i}"]`,
        (e: MouseEvent) => list.handler(e)
      );
    });

    document.addEventListener('click', (e: MouseEvent) => {
      const isDropDownClicked = (<HTMLElement>e.target).closest('.drop-down');
      if (!isDropDownClicked) {
        const dropdown = (<HTMLUListElement>(
          document.querySelector('.drop-down')
        )) as HTMLUListElement;
        dropdown.style.display = 'none';
        dropdown.style.opacity = '0';
      }
    });
  }
}
