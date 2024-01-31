const newTaskForm = document.getElementById('new-task-form')
const newTaskInput = document.getElementById('new-task-input')
const taskTemplate = document.getElementById('task-template')
const btnAll =document.querySelector('.task-action')
const taskContainer =document.querySelector('.task-list')
const taskCount =document.querySelector('.task-count')
const clearCompleted =document.querySelector('.clearAll')
const btns=btnAll.querySelectorAll('button')

const toggleBtn =document.getElementById('toggle')
const LOCAL_STORAGE_LIST_KEY = "task.lists";

let tasks= JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
newTaskForm.addEventListener('submit',function(e){
    e.preventDefault()
    const taskName = newTaskInput.value.trim();
	if (taskName == null || taskName === "") return;
    const task = createTask(taskName);
    tasks.push(task)
    
    clearElement(taskContainer)
    saveAndRender()
    newTaskInput.value=''
})

toggleBtn.addEventListener('click',function(){
    document.body.classList.toggle('dark')
})
function createTask(taskName){
    return { id: Date.now().toString(), name: taskName, complete: false };
}
function saveAndRender(){
    save()
    render(tasks)
    btnFocus(document.getElementById('all'))
}
function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(tasks))
}
function render(tasks){
    
    for(let i=tasks.length-1;i>=0;i--){
        const taskElement = document.importNode(taskTemplate.content,true)
        const checkbox= taskElement.querySelector('input')
        checkbox.id=tasks[i].id   
        checkbox.checked= tasks[i].complete
        const label=taskElement.querySelector('label')
        label.htmlFor = tasks[i].id
        label.append(tasks[i].name)
        taskContainer.appendChild(taskElement)
        const draggables = document.querySelectorAll(".task");
        draggables.forEach((draggable) => {
            draggable.addEventListener("dragstart", () => {
                draggable.classList.add("dragging");
            });
            draggable.addEventListener("dragend", () => {
                draggable.classList.remove("dragging");
            });
        });
    }

    if(tasks.length == 0){
        const p =document.createElement('p')
        p.className='empty'
        p.innerHTML = 'No task'
        taskContainer.appendChild(p)
    }
    renderTaskCount()

}
taskContainer.addEventListener('click',(e)=>{
    if(e.target.tagName.toLowerCase()==='input'){
        const selectedTask = tasks.find(task=> task.id ===e.target.id)
        selectedTask.complete=e.target.checked
        save()
        renderTaskCount()
    }
    if(e.target.tagName.toLowerCase() === 'img'){
        const removeId=e.target.parentElement.previousElementSibling.htmlFor
        tasks = tasks.filter(task=> task.id !== removeId)
        clearElement(taskContainer)
        saveAndRender()
        renderTaskCount()
    }  
})
taskContainer.addEventListener('dragover',(e)=>{
    e.preventDefault()
    const afterElement = getDragAfterElement(taskContainer, e.clientY);
    const draggable = document.querySelector(".dragging");
    taskContainer.appendChild(draggable);
		if (afterElement == null) {
			taskContainer.appendChild(draggable);
		} else {
			taskContainer.insertBefore(draggable, afterElement);
		}
})
function getDragAfterElement(container, y) {
	const draggableElements = [
		...container.querySelectorAll(".task:not(.dragging)")
	];

	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}

function renderTaskCount(){
    const incompleteTask = tasks.filter(task=>!task.complete).length
    const taskString = incompleteTask <= 1 ? 'task' : 'tasks'
    taskCount.innerHTML = `${incompleteTask} ${taskString} left`
}
function btnFocus(ele){
    btnAll.querySelectorAll('button').forEach(btn=>{
        btn.classList.remove('active')
    })
    ele.classList.add('active')
}
btns.forEach(btn=>{
    btn.addEventListener('click',function(e){
        clearElement(taskContainer)
       btnFocus(e.target)
        let newTask;
        if(e.target.id==='all'){
            render(tasks)
        }
        else if(e.target.id === 'active'){
           newTask= tasks.filter(task=>{
            return task.complete === false
           })
        }else if(e.target.id === 'completed'){
         newTask= tasks.filter(task=>{
                
             return task.complete === true
            })
         }
         render(newTask)
    })

})
function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}
clearCompleted.addEventListener('click',function(e){
    tasks = tasks.filter(task=> !task.complete)
    save()
    render(tasks)
    btnFocus(document.getElementById('all'))
})
render(tasks)