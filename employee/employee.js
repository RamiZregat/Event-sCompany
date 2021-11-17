'use strict'

const io = require("socket.io-client")

const host="http://localhost:3040";

const employee=io.connect(host);

employee.emit('get-All-Tasks')

employee.on('sendTask',(payload)=>{
    console.log(payload.msg);
    employee.emit('received-tasks',payload)

    setTimeout(()=>{
        employee.emit('taskDone',{msg:`${payload.dp} department has finished the task 👍`,id:payload.id,dp:payload.dp})
    },1500)
})
employee.on('taskIsDone',(payload)=>{
    console.log(`Task ${payload.id} finished ✅`);

    setTimeout(()=>{
        console.log(`Great job ${payload.dp} department 👏`);
    },3000)
})
