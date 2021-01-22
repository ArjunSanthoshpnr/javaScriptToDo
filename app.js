var taskList = document.querySelectorAll('.task');


var getTaskList = function (list) {
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
var addTask = function() {
    var text = document.getElementById("addInput").value;
    console.log(text);
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
        document.getElementById("block").appendChild(div);
    }
    document.getElementById("addInput").value = "";
    getTaskList([div]);
    closeTaskList([div]);
    strikeTaskList([div]);
}

var input = document.getElementById("addInput");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("add").click();
    }
});
getTaskList(taskList);
closeTaskList(taskList);
strikeTaskList(taskList);