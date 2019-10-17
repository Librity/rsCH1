const express=require("express");

const server=express();

server.use(express.json());

let projects = [];

server.post("/projects", (req, res)=>{
  const { id } = req.body;
  const { title } = req.body;

  const project = { "id": id, "title": title, tasks: [] };

  projects[id].push(project);

  server.res(project);
})


server.get("/projects", (req, res)=>{
  server.res(projects);
})

server.put("/projects/:id", (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  server.res(projects[id]);
})

server.delete("/projects/:id", (req, res)=>{
  const { id } = req.params;

  projects.splice(id, 1);

  server.res([]);
})

server.post("/projects/:id/tasks", (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  server.res([projects[id]]);
})

server.listen(3000);