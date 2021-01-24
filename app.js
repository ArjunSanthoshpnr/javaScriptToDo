var taskList = document.querySelectorAll('.task');

var addCloseBtn = function (list) {
    var i;
    for(i = 0; i<list.length; i++) {
        var span = document.createElement("span");
        var text = document.createTextNode("\u00d7");
        span.appendChild(text);
        list[i].appendChild(span);
    }
}

var closeTaskList = function(list) {
    var i;
    for(i = 0; i<list.length; i++) {
        list[i].children[1].onclick = function() {
            this.parentElement.style.display = 'none';
        }
    }
}

var strikeTaskList = function(list) {
    var i;
    for(i = 0; i<list.length; i++) {
        list[i].children[0].onclick = function() {
            if(this.style.textDecoration === 'line-through') {
                this.style.textDecoration = 'none';
            }
            else {
                this.style.textDecoration = "line-through";
            } 
        }
    }
}
var readTask = function() {
    var text = document.getElementById('addInput').value;
    addTask(text);
}
var addTask = function(inputText='', strike='none') {
    var text = inputText;
    var div = document.createElement("div");
    var p = document.createElement("p");
    var t = document.createTextNode(text);
    p.appendChild(t);
    div.appendChild(p);
    div.classList.add("task");
    if (text === '') {
        alert("Empty task!");
    }
    else {
        if(strike == '' || strike == 'none')
            p.style.textDecoration = 'none';
        else
            p.style.textDecoration = 'line-through';

        document.getElementById("block").appendChild(div);
            
    }
    document.getElementById("addInput").value = "";
    addCloseBtn([div]);
    closeTaskList([div]);
    strikeTaskList([div]);
}

var storeTask = function () {
    var list = document.querySelectorAll('.task');
    var text, i, obj=[];
    for(i = 0; i<list.length; i++) {
        if(list[i].style.display !== 'none'){
            text = list[i].children[0].innerText;
            decoration = list[i].children[0].style.textDecoration;
            obj.push({task: text, strike: decoration});
        }
    }
    var stringObject = JSON.stringify(obj);
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('taskArray', stringObject);
    }
    else{
        console.log('does not support local storage.');
    }  
}

var loadTask = function () {
    if (typeof(Storage) !== "undefined") {
        var text = localStorage.getItem('taskArray');
        var taskArray = JSON.parse(text);
    }
    else {
        console.log('does not support local storage.');
    }
    for(i in taskArray){
        addTask(taskArray[i].task, taskArray[i].strike);
    }
}

var input = document.getElementById("addInput");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("add").click();
    }
});
loadTask();

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
    storeTask();
});
