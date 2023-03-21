class TodoEvent{
  static #instance = null;
  static getInstance(){
    if(this.#instance == null){
      this.#instance = new TodoEvent();
    }
    return this.#instance;
  }
  //클릭으로 실행
  addEventAddTodoClick(){
    const addTodoButton = document.querySelector(".addBtn");
    addTodoButton.onclick = () => {
      TodoService.getInstance().addTodo();
      const TodoInput = document.querySelector(".addTxt");
      TodoInput.value = "";
      
    }
    // TodoService.getInstance().listCount();
  }
  //엔터로 실행
  addEventAddTodoKeyUp(){
    const todoInput = document.querySelector(".addTxt");
    todoInput.onkeyup = () => {
      if(window.event.keyCode == 13){
        const addTodoButton = document.querySelector(".addBtn");
        addTodoButton.click();
      }
    }
    // TodoService.getInstance().listCount();
  }
  // 체크박스 클릭
  addEventCheckBoxClick() {
    const checkLists = document.querySelectorAll(".check-list");
    const listBoxContents = document.querySelectorAll(".listContent");
    checkLists.forEach((checkList, index) => {
      checkList.onchange = () => {
        if(checkLists[index].checked){
          listBoxContents[index].style.textDecoration = 'line-through';
          listBoxContents[index].style.textDecorationColor = 'black';
          listBoxContents[index].style.color = "red";
          
          // TodoService.getInstance().todoList[index].checkLine = checkList[index].listBoxContents;
          TodoService.getInstance().todoList[index].checkBox = checkLists[index].checked;
        }else{
          listBoxContents[index].style.textDecoration = 'none';
          listBoxContents[index].style.color = "white";
          TodoService.getInstance().todoList[index].checkBox = checkLists[index].checked;
        }
        TodoService.getInstance().updateLocalStorage();
      }
    });
    // TodoService.getInstance().listCount();
  }

  //삭제
  deleteCheckList(){
    const delBtns = document.querySelectorAll(".delBtn");
    // const listBoxLists = document.querySelectorAll(".listBox_list");

    delBtns.forEach((delBtn, index) => {
      delBtn.onclick = () => {
        TodoService.getInstance().todoList.splice(index, 1);
        TodoService.getInstance().updateLocalStorage();
      }
    });
  }

}


class TodoService{
  static #instance = null;  
  static getInstance() {
    if(this.#instance == null) {
        this.#instance = new TodoService();
    }
    return this.#instance;
  }

  todoList = null;

  constructor() {
    if(localStorage.getItem("todoList") == null) {
        this.todoList = new Array();
    }else {
        this.todoList = JSON.parse(localStorage.getItem("todoList"));
    }
  }

  listCount(){
    beforListArray = null;
    afterListArray = null;

    const listCounts = document.querySelector(".listBox_list");

    listCounts.forEach((listCheck, index) => {

      if(listCheck[index].checked == false){
        beforListArray.push(listCounts[index])
      }else{
        afterListArray.push(listCounts[index])
      }    
    });
  }
  
  updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    this.loadTodoList();
  }
  
  addTodo() {
    const todoInput = document.querySelector(".addTxt");
    
    const todoObj = {
        todoContent: todoInput.value,
        checkBox: false
        // checkLine: false
    }

    this.todoList.push(todoObj);
    this.updateLocalStorage();
}

loadTodoList() {
    const todoContentList = document.querySelector(".listBox_container");
    todoContentList.innerHTML = ``;

    this.todoList.forEach(todoObj => {
      todoContentList.innerHTML += `
      <div class="listBox_list">
        <label class="listBox_content">
          <input type="checkbox" class="check-list" ${todoObj.checkBox ? "checked" : ""}>
            <div class = "listContent">${todoObj.todoContent}</div>
          <button class="delBtn">x</button>
        </label>
      </div> 
      `;
    });
    TodoEvent.getInstance().addEventCheckBoxClick();
    TodoEvent.getInstance().deleteCheckList();
    
  }
}

