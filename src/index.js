import _ from 'lodash';
import './style.css';
import '../node_modules/boxicons/css/boxicons.min.css';

const userInput = document.getElementById("userInput");
const btn = document.getElementById("btn");
const lists = document.getElementById('list');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveData=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const addTask= () =>{
    if(userInput.value != ''){
        const newTask = {
            task:`${userInput.value}`,
            completed : false,
            index : tasks.length + 1,
        }
        userInput.value='';
        tasks.push(newTask);
        saveData();
        renderTasks();
    }
}

function deleteTask(taskIndex){
    tasks.splice(taskIndex, 1);
    tasks.forEach((item, i) => {
        item.index = i + 1;
    });
    saveData();   
    renderTasks();
}
const renderTasks=()=>{
    lists.innerHTML='';
    tasks.forEach((item,index) =>{ 
        let li = document.createElement('li');
        li.classList.add('item');

        let div1 = document.createElement('div');
        let circle = document.createElement('i');
        circle.classList.add('bx','bx-circle');

        circle.addEventListener('click',function(){
            tasks[index].completed = !tasks[index].completed;
            saveData();
            renderTasks();   
        });     

        if(item.completed){
            circle.classList.add('bxs-check-circle');
            li.classList.add('linethrough');
        }else{
            circle.classList.remove('bx-check-circle');
            li.classList.remove('linethrough')
        }

        let span = document.createElement('span');
        span.setAttribute('contenteditable',true);
        span.innerText = item.task;

        span.addEventListener('blur', function () {
            tasks[index].task = span.innerText;
            saveData();
        });

        div1.append(circle);
        div1.append(span);
        
        let div2 = document.createElement('div');
        let del = document.createElement('i');
        del.classList.add('bx','bxs-trash-alt');
        del.addEventListener('click',function(){
            deleteTask(index);
        })
        div2.append(del);
        li.append(div1);
        li.append(div2);
        lists.append(li);

    })
}

userInput.addEventListener("keydown", function(event) {
    if(userInput.value != ''){
        if (event.keyCode === 13) {
            addTask();
        }
    }
});

btn.addEventListener('click',addTask);
renderTasks();

