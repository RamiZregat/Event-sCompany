"use strict";
require("dotenv").config();
const PORT = process.env.PORT || 3040;
const io = require("socket.io")(PORT);

const msgQueue = {
  tasks: {},
  tasksDone: {},
};

io.on("connection", (socket) => {
  socket.on("newTask", (payload) => {
    console.log("The manager added new task 📑");
    msgQueue.tasks[payload.id] = { msg: payload.msg, dp: payload.dp };

    socket.emit("taskAdded");
    io.emit("sendTask", payload);
  });

  socket.on("received-tasks", (payload) => {
    // console.log(msgQueue.tasks);
    delete msgQueue.tasks[payload.id];
    // console.log(msgQueue.tasks);
  });

  socket.on("taskDone", (payload) => {
    console.log(`Employee finished task ${payload.id} 🥳`);
    msgQueue.tasksDone[payload.id] = { msg: payload.msg, dp: payload.dp };
    socket.emit("taskIsDone", payload);
    io.emit("sendTaskDone", payload);
  });

  socket.on("received-tasksDone", (payload) => {
    delete msgQueue.tasksDone[payload.id];
  });

  socket.on("get-All-Tasks", () => {
    Object.keys(msgQueue.tasks).forEach((id) => {
      socket.emit("sendTask", {
        msg: msgQueue.tasks[id].msg,
        id: id,
        dp: msgQueue.tasks[id].dp,
      });
    });
  });
  socket.on("get-All-TaskDone", () => {
    Object.keys(msgQueue.tasksDone).forEach((id) => {
      socket.emit("sendTask", {
        msg: msgQueue.tasksDone[id].msg,
        id: id,
        dp: msgQueue.tasks[id].dp,
      });
    });
  });
});
