
class ToDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('')) || [];
        this.loadTasks();
        
        this.addEventListener();
        this.tam;
    }

    addEventListener(){
        document.getElementById('addTask').addEventListener('keypress', event => {
            if(event.keyCode === 13 ){
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });
    }

    completeTodo(index) {
      this.tasks[index].isComplete = !this.tasks[index].isComplete;
      this.loadTasks()
    }
    deleteTodo(event, id) {
        event.preventDefault();

        this.tam = this.tasks.splice(id, 1);
        this.loadTasks();
        
        var btn = document.createElement("button");
        btn.innerHTML = "undo";
        document.body.appendChild(btn);
        
        btn.setAttribute("onclick", "toDo.unDo()");
        btn.setAttribute("style", " margin-left: 50%");
        btn.className="btn btn-success"
        setTimeout(function() {
            btn.remove();
        }, 5000);
    }
        
    unDo() {
        this.tasks.push(this.tam[0]);
        this.loadTasks();
    }


    addTask(task){
        let newTask = {
            task, isComplete:false
        }
        let parentDiv = document.getElementById('addTask').parentElement;
        if(task === ''){
            // parentDiv.classList.add('has-error');
            alert('You must write something!')
        }else{
            // parentDiv.classList.remove('has-error');
            this.tasks.push(newTask);
            this.loadTasks()
        }
    }
    calculate(){
        let sum = this.tasks.length;
        let resultActive = this.tasks.filter(element => element.isComplete === true);
        let percent = (resultActive.length/ sum)* 100;
        console.log(percent);
        
        document.getElementById("progress").style.width = percent +"%"
    }

    updateToDo(event, index) {
        event.preventDefault();
        let displaybtn = document.getElementById(index);
        this.tasks[index].isComplete = false;
        displaybtn.disabled = false;
        displaybtn.focus();

    }


    saveEdit(event, index) {
        event.preventDefault();
        let valueEdit = document.getElementById(index).value;
        this.tasks[index].task = valueEdit;
        this.tasks[index].isComplete = false;
        this.loadTasks();
    }
   
    addTaskClick(){
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }
    
    removeComplete(){
        this.tasks = this.tasks.filter(t => !t.isComplete)
        this.loadTasks();  
    }
   
    selecCompleted(){
        let resultFiter = this.tasks.filter(element => element.isComplete === true);
        if (resultFiter.length > 0) {
            let taskHtml = resultFiter.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
            document.getElementById('taskList').innerHTML = taskHtml;
        }else{
            alert("Khong co ket qua")
        }
    }
    selecActive(){
        let resultActive = this.tasks.filter(element => element.isComplete === false);

        if (resultActive.length > 0) {
            let taskHtml = resultActive.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
            document.getElementById('taskList').innerHTML = taskHtml;
        }else{
            alert("Khong co ket qua")
        }
    }
  
    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.completeTodo(${index})" value="" class="" ${task.isComplete ? 'checked' : ''}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete ? 'complete' : ''}" >
                <input type="text" class="form-control" id="${index}"disabled style="border:none;background: white" value="${task.task}">
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <a class="icon" href=""  onClick="toDo.deleteTodo(event, ${index})"><i class="fa fa-trash" ></i> </i></a>
                <a class="icon" href=""  onClick="toDo.updateToDo(event, ${index})"><i class="fa fa-pencil" ></i></i></a>
                <a class="icon" href=""  onClick="toDo.saveEdit(event, ${index})"></i><i class="fa fa-check" ></i></i></a>
                </div>
            </div>
            </li>
        `;
    }

    loadTasks() {
        let taskHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = taskHtml;
        localStorage.setItem('', JSON.stringify(this.tasks));
        this.calculate()
    }
}

 let toDo;
window.addEventListener("load", () => {
      toDo = new ToDoClass();
});