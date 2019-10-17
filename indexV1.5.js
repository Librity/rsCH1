// text editor integrated w/ github client and some basic plugin functionality(shell, compile&execute, debug)
// port templeos's shell  & holyC.hc compiler into linux, with meshes & graphics in the console

const express = require("express");

const server = express();

server.use(express.json());

let projects = [
  {
    id: "3",
    title: "dsad",
    tasks: []
  }
];

function findProjectById(req, res, next) {
  if (req.body.id) {
    res.locals.req_id = req.body.id;
  } else if (req.params.id) {
    res.locals.req_id = req.params.id;
  } else {
    return res
      .status(400)
      .json({ error: "project id required" });
  }

  const res.locals.project = projects.filter(project => {
    return project.id.indexOf(searchTerm) > -1;
  });

  return next();
}

function checkProjectIdTaken(req, res, next) {
  findProjectById();
  if (res.locals.project.length != 0) {
    return res
      .status(400)
      .json({ error: "id already used by another project" });
  }

  return next();
}

function checkProjectIdValid(req, res, next) {
  findProjectById();

  if (res.locals.project.length == 0) {
    return res
      .status(400)
      .json({ error: "invalid id: project doesn't exist" });
  }

  return next();
}

server.post("/projects", checkProjectIdTaken, (req, res) => {
  const { title } = req.body;

  const project = { id: res.locals.id, title: title, tasks: [] };

  projects.push(project);

  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectIdValid, (req, res) => {
  const new_title = req.body.title;

  res.locals.project.title = new_title;

  /** 
  * We either call checkProjectIdTaken or we update the title of every
  * project with that id (not a good idea);
  *
  *var searchTerm = id;
  *projects
  *  .filter(project => {
  *    return project.id.indexOf(searchTerm) > -1;
  *  })
  *  .forEach(changeTitleARRAY);
  *
  *function changeTitleARRAY(element) {
  *  element.title = new_title;
  *}
  */
  return res.json(result);
});

server.delete("/projects/:id", checkProjectIdValid, (req, res) => {
  for (project of projects) {
    if (project.id == res.locals.id) {
      projects.splice(id, 1);
    }
  }

  return res.json(res.locals.project);
});

server.post("/projects/:id/tasks", checkProjectIdValid, (req, res) => {
  const { task } = req.body;

  rea.locals.project.task.push(task);

  return res.json(res.locals.project);
});

server.listen(3000);
