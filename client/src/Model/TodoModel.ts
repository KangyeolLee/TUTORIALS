import Observable from '@/Core/Observable';

class TodoModel extends Observable {
  private todos: string[];

  constructor() {
    super();
    this.todos = ['initial'];
  }

  addTodo(key: string, todo: string) {
    const nextTodos = { todos: [...this.todos, todo] };
    this.todos = [...this.todos, todo];
    this.notify(key, nextTodos);
  }
}

export default new TodoModel();
