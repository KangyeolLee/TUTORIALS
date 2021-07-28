import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import TodoModel from '@/Model/TodoModel';
import TodoController from '@/Controller/TodoController';
import { Props, State } from '@/utils/types';

interface TodoState<T> extends State {
  todos: Array<T>;
}

export default class Home extends Component<TodoState<string>, Props> {
  model: any;
  controller: any;

  setup() {
    this.model = TodoModel;
    this.controller = TodoController;
    this.model.subscribe('todo', 'HOME', this);
    this.$state = {
      todos: [...this.model.todos],
    };
  }

  template() {
    const { todos } = this.$state!;

    return html`
      <div class="class-test" id="id-test">
        <div class="title-wrapper">
          <h1>ToDoList Test With Model-View Observer Pattern</h1>
        </div>
        <div class="button-area">
          <span class="add-data">todo 추가</div>
        </div>
        <div class="todo-render">
          ${todos
            ?.map(
              (todo) => `
          <div>${todo}</div>
        `
            )
            .join('')}
        </div>
        <div>${todos.length}</div>
        <div class="component"></div>
      </div>
    `;
  }

  handleClick() {
    this.model.addTodo('todo', 'test');
  }

  setEvent() {
    this.addEvent('click', '.add-data', this.handleClick.bind(this));
  }
}
