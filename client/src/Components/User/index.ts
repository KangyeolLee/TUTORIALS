import './styles';
import Component from '@/Core/Component';
import { CategoryModelType, CategoryType, Props, State } from '@/utils/types';
import { asyncSetState, html } from '@/utils/helper';
import { apiLogout } from '@/api/auth';
import { $router } from '@/Core/Router';
import CategoryIcon from '@/Components/CategoryIcon';
import CategoryModel from '@/Model/CategoryModel';
import { svgIcons } from '@/assets/svgIcons';

interface UserState extends State {
  user: {
    id: number;
    githubUser: string;
  };
  categoryList?: CategoryType[];
}

export default class User extends Component<UserState, Props> {
  categoryModel!: CategoryModelType;

  async setup() {
    this.categoryModel = CategoryModel;
    this.categoryModel.subscribe(this.categoryModel.key, this);

    asyncSetState(this.categoryModel.getUserCategories());
  }

  template() {
    console.log(this.$state);
    return html`
      <div class="user">
        <section class="content-box user-info">
          <span class="github-user">${this.$state!.user.githubUser}</span>
          <button class="logout-btn">로그아웃</button>
        </section>
        <section class="content-box user-payments">
          <section class="content-box-title user-category-title">
            <span class="title">카테고리</span>
            <span class="add-button">${svgIcons.add}</span>
          </section>
          <ul class="user-payments-icons">
            ${!this.$state?.categoryList
              ? ''
              : this.$state?.categoryList
                  .map((category) => CategoryIcon(category))
                  .join('')}
          </ul>
        </section>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.logout-btn', this.handleLogOut);
    this.addEvent('dblclick', '.user-payments', this.handleDoubleClick);
    this.addEvent('click', '.user-payments', this.handleClick.bind(this));
  }

  async handleLogOut() {
    const res = await apiLogout();
    $router.push('/main');
  }

  handleDeleteCategory(target: HTMLElement) {
    const id = Number(
      target.closest<HTMLDivElement>('.category-icon')?.dataset.id
    );

    // TODO category delete => 삭제된 카테고리 '미분류'로 설정
    asyncSetState(this.categoryModel.deleteUserCategories(id));
  }

  handleAddCategory(target: HTMLElement) {
    const isEditing = this.$target.querySelector(
      '.category-icon[data-id="-1"]'
    );
    if (isEditing) return;

    const randomColor = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
    const paymentsIcon = this.$target.querySelector(
      '.user-payments-icons'
    ) as HTMLElement;
    const icon = document.createElement('div');
    icon.innerHTML = CategoryIcon({ color: randomColor, type: '', id: -1 });
    const newCategory = icon.firstElementChild as HTMLElement;
    paymentsIcon.append(newCategory);

    const categoryType = newCategory.querySelector(
      '.category-type'
    ) as HTMLDivElement;

    categoryType.contentEditable = 'true';
    const selection = window.getSelection() as Selection;
    const range = document.createRange();
    range.collapse(true);
    range.setStart(newCategory as Node, 0);
    range.setEnd(newCategory as Node, 1);
    selection.removeAllRanges();
    selection.addRange(range);

    // blur: focus가 해제될 때(버블링 X)
    categoryType.addEventListener(
      'blur',
      function handleBlur() {
        categoryType.removeEventListener('blur', handleBlur);
        categoryType.removeAttribute('contentEditable');

        const editedText = categoryType.textContent as string;

        if (editedText.length === 0) {
          newCategory.remove();
          return;
        }
        // TODO category update
        console.log(editedText);

        asyncSetState(
          this.categoryModel.createUserCategories(editedText, randomColor)
        );
      }.bind(this)
    );

    categoryType.addEventListener(
      'keydown',
      function (e: KeyboardEvent) {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          categoryType.blur();
        }
      }.bind(this)
    );
  }

  handleClick(e: Event) {
    const target = e.target as HTMLElement;
    const deleteIcon = target.closest<HTMLDivElement>('.delete-icon');
    const addButton = target.closest<HTMLDivElement>('.add-button');
    if (deleteIcon) {
      this.handleDeleteCategory(target);
      return;
    }
    if (addButton) {
      this.handleAddCategory(target);
      return;
    }
  }

  handleDoubleClick(e: Event) {
    const target = e.target as HTMLElement;
    const categoryType = target.closest<HTMLDivElement>('.category-type');
    if (!categoryType) return;

    // 카테고리 수정
    categoryType.contentEditable = 'true';
    const prevText = categoryType.textContent as string;
    const curNode = categoryType.firstChild as Node;

    const sel = window.getSelection() as Selection; // 현재 커서 selection 정보
    const range = document.createRange(); // 새로운 range로 설정할 변수
    range.setStart(curNode, 0);
    range.setEnd(curNode, prevText.length);
    sel.removeAllRanges(); // 이전 Range를 삭제하고
    sel.addRange(range); // 새로 생성

    // blur: focus가 해제될 때(버블링 X)
    categoryType.addEventListener('blur', function handleBlur() {
      categoryType.removeEventListener('blur', handleBlur);
      categoryType.removeAttribute('contentEditable');

      const editedText = categoryType.textContent as string;

      if (editedText.length === 0 || editedText === prevText) {
        categoryType.innerHTML = prevText;
        return;
      }
      // TODO category update
    });

    categoryType.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        categoryType.blur();
      } else if (e.key === 'Escape') {
        categoryType.innerHTML = prevText;
        categoryType.blur();
      }
    });
  }
}
