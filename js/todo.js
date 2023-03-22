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
    checkLists.forEach((checkList, index) => {

      checkList.onchange = () => {

        if(checkLists[index].checked){
          TodoService.getInstance().todoList[index].checkBox = checkLists[index].checked;
        }else{
          TodoService.getInstance().todoList[index].checkBox = checkLists[index].checked;
        }

        TodoService.getInstance().updateLocalStorage();
      }
    });
  }
  //전체선택
  addEventAllCheckBoxClick(){
    const allCheck = document.querySelector(".allSelect");
    allCheck.onclick = () => {
      TodoService.getInstance().todoList.forEach(todoObj => {
        todoObj.checkBox = allCheck.checked;
      })
      
      TodoService.getInstance().updateLocalStorage();

    }
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
  // 선택삭제
  selectDelete(){
    const allDel = document.querySelector(".selectDel");
    allDel.onclick = () => {
        TodoService.getInstance().todoList.forEach(todoObj => {
          if(!todoObj.checkBox){
            
          }
        });
      }
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
  
  updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    this.loadTodoList();
  }
  
  addTodo() {
    const todoInput = document.querySelector(".addTxt");
    
    const todoObj = {
        todoContent: todoInput.value,
        checkBox: false
    }

    this.todoList.push(todoObj);
    this.updateLocalStorage();
}
//all체크박스 
getCheckAllStatus() {
  const allCheck = document.querySelector(".allSelect");
  for(let todoObj of this.todoList) {
    if(!todoObj.checkBox) {
      allCheck.checked = false;
      return;
    }else if(todoObj.checkBox){
      allCheck.checked = true;
    }
  }if(this.todoList == ""){
    allCheck.checked = false;
  }
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
    TodoEvent.getInstance().selectDelete();
    TodoEvent.getInstance().addEventAllCheckBoxClick();
    this.getCheckAllStatus();
    this.getCountList();
  }

  getCountList(){
    let ProceedingCount = 0;
    let completeCount = 0;

    for(let todoObj of this.todoList){
      if(todoObj.checkBox){
        completeCount++;
      }else{
        ProceedingCount++;
      }
    }
    const searchBox = document.querySelector(".searchBox");
    searchBox.innerHTML = `
      <input type="button" class="searchBtn btn-all" value="전체 : ${this.todoList.length}">
      <input type="button" class="searchBtn btn-before" value="진행중 : ${ProceedingCount}">
      <input type="button" class="searchBtn btn-after" value="완료 : ${completeCount}">
    `
  }
  

}

