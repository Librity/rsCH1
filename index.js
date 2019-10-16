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

function checkProjectIdTaken(req, res, next) {
  const searchTerm = req.body.id;

  const results = projects.filter(project => {
    return project.id.indexOf(searchTerm) > -1;
  });

  if (results.length != 0) {
    return res
      .status(400)
      .json({ error: "id already used by another project" });
  }

  return next();
}

server.post("/projects", checkProjectIdTaken, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const project = { id: id, title: title, tasks: [] };

  projects.push(project);

  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const searchTerm = req.params.id;
  const new_title = req.body.title;

  const result = projects.filter(project => {
    return project.id.indexOf(searchTerm) > -1;
  })[0];
  result.title = new_title;

  // // We either call checkProjectIdTaken or we update the title of every
  // // project with that id (not a good idea);
  // var searchTerm = id;
  // projects
  //   .filter(project => {
  //     return project.id.indexOf(searchTerm) > -1;
  //   })
  //   .forEach(changeTitleARRAY);

  // function changeTitleARRAY(element) {
  //   element.title = new_title;
  // }

  return res.json(result);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.json([]);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  return res.json([projects[id]]);
});

server.listen(3000);
