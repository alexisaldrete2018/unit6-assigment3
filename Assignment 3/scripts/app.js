const iconImportant = "iImportant fas fa-star";
const iconNonImportant = "iImportant far fa-star";

let icon = $("#iImportant");
let formSection = $("#form");
let hideFormButton = $('#hideFormButton');
let submitButton = $("#submitTaskButton");
let clearTasksButton = $("#clearTasksButton");

let important = false;
let formHidden = false;
let total = 0;

function toggleImportant(){
    if(!important){
        icon.removeClass(iconNonImportant).addClass(iconImportant);
        important = true;
    } else {
        icon.removeClass(iconImportant).addClass(iconNonImportant);
        important = false;
    } 
}

function toggleForm(){
    if(!formHidden){
        formSection.hide();
        formHidden = true;
        $("#hideFormButton").text("< Show Form ");
    } else {
        formSection.show();
        formHidden = false;
        $("#hideFormButton").text(" Hide Form >");
    }
}

function submitTask(){
    let title = $("#inputTitle").val();
    let description = $("#inputDescription").val();
    let icon = important;
    let date = $("#date").val();
    let location = $("#inputLocation").val();
    let invites = $("#inputInvites").val();
    let color = $("#inputColor").val();
    let frequency = $("#inputFrequency").val();
    let status = $("#inputStatus").val();
    let importance = ""

    

    let task = new Task(important, title, description, date, location, invites, color, frequency, status);
    displayTask(task);
    clearForm();

    $.ajax({
        type: "post",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function(res){
            console.log("Task saved", res);
        },
        error: function(errorDetails){
            console.log("Save failed", errorDetails);
        }
    });
}

function displayTask(task){
    let taskStatus = getStatusText(task.status);
    let taskFrequency = getFrequencyText(task.frequency);
    let iconSyntax = "";
    let importance = "";

    if(task.important){
        iconSyntax = '<i id="iImportant" class="iImportant fas fa-star"></i>';
        importance = "important";
    } else {
        iconSyntax = '<i id="iImportant" class="iImportant far fa-star"></i>';
        importance = "normal";
    }

    let syntax = `
    <div class="task-item ${importance}">

        <div class="info-0">
           ${iconSyntax}
        </div>

        <div class="info-1">
            <h5> ${task.title}</h5>
            <br>
            <p class="bold">Description: </p><p> ${task.description}</p>
        </div>

        <div class="info-2">
            <label class="bold">Due Date: </label><label> ${task.dueDate }</label>
            <br>
            <label class="bold">Location: </label><label> ${task.location }</label>
        </div>

        <div class="info-3">
            <p class="bold">Invites:</p><p> ${task.invites}</p>
        </div>

        <div class="info-4">
            <p class="bold">Frequency:</p><p> ${taskFrequency}</p>
            <p class="bold">Status:</p><p> ${taskStatus}</p>
        </div>
    </div>
    `;
    $("#list").append(syntax);
}

function getFrequencyText(frequency){
    switch(frequency){
        case "0":
            return "One Time";
        case "1":
            return "Daily";
        case "2":
            return "Weekly";
        case "3":
            return "Monthly";       
    }
}

function getStatusText(status){
    switch(status){
        case "1":
            return "Pending";
        case "2":
            return "In Progress";
        case "3":
            return "Paused";
        case "4":
            return "Completed";
        case "5":
            return "Abandoned";            
    }
}

function clearForm(){
    $("input").val("");
    $("text").val("");
    $("select").val(0);
    $("#inputColor").val("#ffffff");
    // important = false;
}

function fetchTasks(){
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        contentType: "application/json",
        
        success: function(res){
            let data = JSON.parse(res);
            for (let i = 0; i < data.length; i++) {
                let task = data[i];

                if(task.name == "Alexis"){
                    displayTask(task);
                    total +=1;
                }
            }


        },
        error: function(errorDetails){
            console.log("Error retrieving data", errorDetails);
        }
    });
}

function clearAllTasks(){
    $.ajax({
        type: "DELETE",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Alexis",
        
        success: function(){
            location.reload();
        },
        error: function(err){
            console.log("Error clearing tasks", err);
        },
    });
}

function init(){
    console.log("initialized");
    // assign events
    icon.click(toggleImportant);
    hideFormButton.click(toggleForm);
    submitButton.click(submitTask);
    clearTasksButton.click(clearAllTasks);

    // load data
    fetchTasks();
}

window.onload = init;