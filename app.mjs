import moment from 'moment'
import * as readline from "readline";

// Stores the list of items, readline interface, and current input
var toDo = [
    ["Make a To-Do List", false]
];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var choice = "";

// This function allows me to return inputs even with the asynchronous code. 
function getInput(prompt) {
    return new Promise((resolve) =>{
        rl.question(prompt, (input) => {
            choice = input;
            resolve(choice); 
        });
    });
}

// Displays each item on the list.
function displayToDo(){
    var i = 1;
    console.log("Task List: ")
    toDo.forEach(function(item){
        console.log(i + ". " + item[0]);
        if (item[1] == true){
            console.log("Completed!");
        }
        i++;
    });
}

// Renames a task based on index. 
async function renameTask(){
    displayToDo();
    var i = await getInput("What is the number of the task you'd like to rename? ");
    choice = await getInput("What would you like to rename this task? ");
    toDo[i-1][0] = choice;
}

// Adds a task to the end of the list. 
async function addTask(){
    displayToDo();
    var addedItem = ["", false];
    choice = await getInput("Input the task you need: ");            
    addedItem[0] = choice;
    toDo.push(addedItem);
}

// Removes a task at a certain index. 
async function removeTask(){
    displayToDo();
    choice = await getInput("What is the number of the task you'd like to remove? ");
    toDo.splice(choice-1, 1);
}

// Either marks a task as complete, or removes the mark if it was already marked as complete
async function completeTask(){
    displayToDo();
    choice = await getInput("What is the number of the task you'd like to mark the complete (or remove the mark)? ")
    if (toDo[choice-1][1] == false){
        toDo[choice-1][1] = true;
    }
    else{
        toDo[choice-1][1] = false;
    }  
}

// The main recursive loop 
async function toDoLoop(){
    // Displays the current date after formatting it. 
    var currentDate = moment(new Date()).format('LLL');
    console.log("\nCurrent Date: " + currentDate + "\n");
    // Displays the To-do list 
    displayToDo();
    // Displays the options
    console.log("\nWelcome to your To-Do List. Choose an option:\n");
    console.log("1. Add Task");
    console.log("2. Remove Task");
    console.log("3. Complete Task");
    console.log("4. Rename Task");
    console.log("5. Quit");
    // Get the user input 
    const answer = await getInput("Enter the Number 1-4, or what you want to do: ");
    // Switch Case based on the input. Everything but Quit or an error calls the loop again
    switch(answer){
        case "1":
        case "Add":
            await addTask();
            toDoLoop();
            break;
        case "2":
        case "Remove":
            await removeTask();
            toDoLoop();
            break;
        case "3":
        case "Complete":
            await completeTask();
            toDoLoop();
            break;
        case "4":
        case "Rename":
            await renameTask();
            toDoLoop();
            break;
        case "5":
        case "Quit":
            console.log("Thank you for using the To-Do List!");
            rl.close();
            break;
        default:
            console.log("Error");
            rl.close();
            break;
    }
}

// The actual start of the program, calling the To-Do loop for the first time. 
toDoLoop();