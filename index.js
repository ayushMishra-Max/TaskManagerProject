//Hiding the suggestion if the local storage is not empty
var suggestion = document.getElementById("suggestion");
if (localStorage.length === 0) {
  suggestion.style.display = "block";
} else {
  suggestion.style.display = "none";
}
//Displaying the add task box
var contact_bg = document.getElementById("contact_bg");
var upload = document.getElementById("upload");
var close = document.getElementById("close");
var add = document.getElementById("add");
upload.onclick = function () {
  contact_bg.style.display = "block";
  close.onclick = function () {
    contact_bg.style.display = "none";
  };
};
//store the task in local storage
add.onclick = function () {
  var c_name = document.getElementById("c_name").value;
  var c_num = document.getElementById("c_num").value;
  var task_obj = { taskName: c_name, taskDis: c_num };
  var task_txt = JSON.stringify(task_obj);
  if (c_name != "" && c_num != "") {
    // localStorage.setItem(c_name,task_txt);
    localStorage.setItem(c_name, task_txt);
    var contact_bg = document.getElementById("contact_bg");
    contact_bg.style.display = "none";
    setTimeout(function () {
      window.location.reload(true);
    }, 200);
  } else {
    alert("please enter the task name and task discription");
  }
};
// function to present the task box dynamically

function all_contacts() {
  var i;
  for (i = 0; i < localStorage.length; i++) {
    var all_keys = localStorage.key(i);
    var json_tx = localStorage.getItem(all_keys);
    var obj = JSON.parse(json_tx);
    var contact_box = document.createElement("DIV");
    contact_box.setAttribute("id", "task_box");
    var name_p = document.createElement("P");
    name_p.setAttribute("class", "task_name");
    var line = document.createElement("HR");
    line.setAttribute("color", "purple");
    line.setAttribute("width", "97%");
    line.setAttribute("size", "1");
    var num_p = document.createElement("P");
    num_p.setAttribute("id", "task_dic");

    name_p.innerHTML += "" + obj.taskName;
    num_p.innerHTML += "" + obj.taskDis;

    contact_box.appendChild(name_p);
    contact_box.appendChild(line);

    contact_box.appendChild(num_p);
    var tool = document.createElement("DIV");
    tool.setAttribute("id", "tool");
    var del_i = document.createElement("I");
    del_i.setAttribute("id", "trash");
    del_i.className = "fas fa-trash del";
    tool.appendChild(del_i);
    contact_box.appendChild(tool);

    var all_contact_box = document.getElementById("all_task");
    all_contact_box.appendChild(contact_box);
  }
}

all_contacts();

//devlope the search functionality
var search = document.getElementById("task");
search.oninput = function () {
  var all_task_name = document.getElementsByClassName("task_name");
  var i;
  for (i = 0; i < all_task_name.length; i++) {
    if (
      all_task_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase())
    ) {
      all_task_name[i].parentElement.style.display = "block";
    } else {
      all_task_name[i].parentElement.style.display = "none";
    }
  }
};
//devlope the delete functionality

var del = document.getElementsByClassName("del");
var i;
for (i = 0; i < del.length; i++) {
  del[i].onclick = function () {
    var parent = this.parentElement.parentElement;
    var p_ele = parent.getElementsByClassName("task_name")[0];
    username = p_ele.innerHTML;
    localStorage.removeItem(username);
    parent.className = "animate__animated animate__bounceOut";

    setTimeout(function () {
      parent.remove();
    }, 1000);
  };
}
