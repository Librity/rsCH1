const express = require("express");

const server = express();

server.use(express.json());

let request_count = 0;
const projects = [];

findProjectById = (req, res, next) => {
  if (req.body.id) {
    res.locals.req_id = req.body.id;
  } else if (req.params.id) {
    res.locals.req_id = req.params.id;
  } else {
    return res.status(400).json({ error: "project id required" });
  }

  res.locals.project = projects.find(p => p.id == res.locals.req_id);

  return next();
};

checkProjectIdTaken = (req, res, next) => {
  if (res.locals.project) {
    return res
      .status(400)
      .json({ error: "id already used by another project" });
  }

  return next();
};

function checkProjectIdValid(req, res, next) {
  if (!res.locals.project) {
    return res.status(400).json({ error: "invalid id: project doesn't exist" });
  }

  return next();
}

server.use((req, res, next) => {
  request_count++;

  console.log(`${request_count} requests so far...`);

  return next();
});

server.post("/projects", findProjectById, checkProjectIdTaken, (req, res) => {
  const { title } = req.body;

  const project = { id: res.locals.req_id, title: title, tasks: [] };

  projects.push(project);

  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put(
  "/projects/:id",
  findProjectById,
  checkProjectIdValid,
  (req, res) => {
    const new_title = req.body.title;

    res.locals.project.title = new_title;

    return res.json(res.locals.project);
  }
);

server.delete(
  "/projects/:id",
  findProjectById,
  checkProjectIdValid,
  (req, res) => {
    projects.forEach((value, index, array) => {
      if (value.id == res.locals.req_id) {
        array.splice(index, 1);
      }
    });

    return res.json(res.locals.project);
  }
);

server.post(
  "/projects/:id/tasks",
  findProjectById,
  checkProjectIdValid,
  (req, res) => {
    const { title } = req.body;

    res.locals.project.tasks.push(title);

    return res.json(res.locals.project);
  }
);

server.listen(3000);