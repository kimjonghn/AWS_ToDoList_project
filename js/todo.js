class TodoEvent{
  static #instance = null;
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new TodoEvent();
    }
    return this.#instance;
  }
  todolist = null;

  addEventAddTodoClick(){
    const addTodoButton = document.querySelector(".addBtn")
    addTodoButton.onclick = () => {
      this.TodoList();
      const TodoInput = document.querySelector(".addTxt")
      TodoInput.value = "";
      
    }
  }
  TodoList(){
    const listBoxList = document.querySelector(".listBox_container")
    const todoInput = document.querySelector(".addTxt");

    listBoxList.innerHTML += `
    <div class="listBox_list">
      <label class="listBox_content">
        <input type="checkbox" class="check-list">
          ${todoInput.value}
        <button class="delBtn">x</button>
      </label>
    </div> 
    `;

  }
}


