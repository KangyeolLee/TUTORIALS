import './styles';
import Component from '@/Core/Component';
import { Props, State } from '@/utils/types';
import { html } from '@/utils/helper';
import { apiLogout } from '@/api/auth';
import { $router } from '@/Core/Router';
import CategoryIcon from '@/Components/CategoryIcon';

interface UserState extends State {
  user: {
    id: number;
    githubUser: string;
  };
}

export default class User extends Component<UserState, Props> {
  template() {
    return html`
      <div class="user">
        <section class="content-box user-info">
          <span class="github-user">${this.$state!.user.githubUser}</span>
          <button class="logout-btn">로그아웃</button>
        </section>
        <section class="content-box user-payments">
          <section class="content-box-title user-category-title">
            <span class="title">카테고리</span>
            <span class="edit-button">편집</span>
          </section>
          <ul class="user-payments-icons">
            ${CategoryIcon(1)}${CategoryIcon(1)}${CategoryIcon(
              1
            )}${CategoryIcon(1)}${CategoryIcon(1)}${CategoryIcon(
              1
            )}${CategoryIcon(1)}
          </ul>
        </section>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.logout-btn', this.handleLogOut);
    this.addEvent('dblclick', '.user-payments', this.handleDoubleClick);
    this.addEvent('click', '.user-payments', this.handleClick);
  }

  async handleLogOut() {
    const res = await apiLogout();
    $router.push('/main');
  }

  handleClick(e: Event) {
    const target = e.target as HTMLElement;
    const deleteIcon = target.closest<HTMLDivElement>('.delete-icon');
    if (!deleteIcon) return;

    const categoryNode = deleteIcon.parentElement as HTMLElement;
    categoryNode.remove();

    // TODO category delete => 삭제된 카테고리 '미분류'로 설정
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
      console.log(editedText);
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
