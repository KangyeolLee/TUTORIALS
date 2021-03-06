import Component from '@/Core/Component';
import { Props, State, CategoryModelType, CategoryType } from '@/utils/types';
import './styles';
import { asyncSetState, html, customEventEmitter } from '@/utils/helper';
import CategoryModel from '@/Model/CategoryModel';
import CategoryTag from '@/Components/CategoryTag';

interface ICategoryDropdownState extends State {
  categoryList: CategoryType[];
}

export default class CategoryDropdown extends Component<
  ICategoryDropdownState,
  Props
> {
  categoryModel!: CategoryModelType;
  $dropdownSlider!: HTMLElement;
  startX!: number;
  posX!: number;
  offsetLeft = 0;
  pressed: boolean = false;

  setup() {
    this.classIDF = 'CategoryDropdown';
    this.categoryModel = CategoryModel;
    this.categoryModel.subscribe(this.categoryModel.key, this);

    this.$state = {
      categoryList: [],
    };

    asyncSetState(this.categoryModel.getUserCategories());
  }

  template() {
    const { categoryList } = this.$state!;
    return html`
      <ul class="category-dropdown">
        ${categoryList
          .map(
            (category) => `
          <li class="dropdown-list">${CategoryTag(category)}</li>
        `
          )
          .join('')}
      </ul>
    `;
  }

  mounted() {
    this.$dropdownSlider = this.$target.querySelector(
      '.category-dropdown'
    ) as HTMLElement;
  }

  handleClickOnList(e: MouseEvent) {
    const target = (<HTMLElement>e.target).closest(
      '.dropdown-list'
    ) as HTMLElement;
    target.scrollIntoView();
    this.focusoutOtherLists();
    target.classList.add('clicked');
    const input = document.querySelector(
      'input[name="category"]'
    ) as HTMLInputElement;
    const inputbarWrapper = document.querySelector(
      '.input-bar-wrapper'
    ) as HTMLElement;
    input.value = target.innerText;
    customEventEmitter(
      'inputchangeCategory',
      { value: input.value },
      inputbarWrapper
    );
  }

  focusoutOtherLists() {
    const others = this.$target.querySelectorAll('.dropdown-list');
    others.forEach((list) => list.classList.remove('clicked'));
  }

  mouseDown(e: PointerEvent) {
    this.pressed = true;
    this.startX = e.pageX - this.$dropdownSlider.offsetLeft;
    this.$dropdownSlider.style.cursor = 'grabbing';
  }

  mouseEnter() {
    this.$dropdownSlider.style.cursor = 'grab';
  }

  mouseUp() {
    this.pressed = false;
    this.$dropdownSlider.style.cursor = 'grab';
    this.offsetLeft += this.startX - (this.posX ?? this.startX);
    const count = this.$dropdownSlider.childElementCount;
    const offsetWidth =
      this.$dropdownSlider.firstElementChild!.getBoundingClientRect().width;
    const totalWidth = count * offsetWidth;

    if (this.offsetLeft >= totalWidth / 2 - 150) {
      this.offsetLeft = totalWidth / 2 - 150;
    } else if (this.offsetLeft < 0) {
      this.offsetLeft = 0;
    }

    this.$dropdownSlider.scrollLeft = this.offsetLeft * 2;
  }

  mouseLeave() {
    this.pressed = false;
  }

  mouseMove(e: PointerEvent) {
    if (this.pressed) {
      this.posX = e.pageX;
    }
  }

  setEvent() {
    this.addEvent('pointerdown', '.category-dropdown', (e: PointerEvent) =>
      this.mouseDown(e)
    );
    this.addEvent('pointerup', '.category-dropdown', () => this.mouseUp());
    this.addEvent('pointermove', '.category-dropdown', (e: PointerEvent) =>
      this.mouseMove(e)
    );
    this.addEvent('pointerenter', '.category-dropdown', () =>
      this.mouseEnter()
    );
    this.addEvent('pointerleave', '.category-dropdown', () =>
      this.mouseLeave()
    );
    this.addEvent('click', '.dropdown-list', (e: MouseEvent) =>
      this.handleClickOnList(e)
    );
  }

  setUnmount() {
    this.categoryModel.unsubscribe(this.categoryModel.key, this);
  }
}
