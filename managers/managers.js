"use strict";

const io = require("socket.io-client");

const host = "http://localhost:3040";

const manager = io.connect(host);

const faker = require("faker");

const number = faker.datatype.number();

const tasksArr = [
  { department: "Web Development", task: "E-Commerce app refactoring" },
  { department: "Accounting", task: "Salary destributing" },
  { department: "Human Resources", task: "CVs separation for .net developer" },
  { department: "ALL", task: "Meeting after 1 hour" },
  { department: "Scurity", task: "Secure the camera room " },
  { department: "Android Development", task: "Delivery app refactoring" },
  { department: "Quality Assurance ", task: "Test website quality" },
];
let taskIndex = Math.floor(Math.random() * 10);

while (taskIndex > tasksArr.length - 1) {

  taskIndex = Math.floor(Math.random() * 10);
  
}
const department=tasksArr[taskIndex].department

manager.emit('get-All-TaskDone')

manager.emit("newTask", { msg: `New task ${tasksArr[taskIndex].task} number ${number} for ${department} department added 📑`, id:number,dp:department});

manager.on("taskAdded", () => {
  console.log("Task Added 📑");
});

manager.on('sendTaskDone',(payload)=>{
console.log(payload.msg);
manager.emit('received-tasksDone',payload)
})