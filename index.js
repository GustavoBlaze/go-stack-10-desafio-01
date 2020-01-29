const express = require('express')

const server = express()

let requestCount = 0;

const projects = []

server.use(express.json())

const countRequestMiddleware = (req, res, next) => {
  console.time('Request')
  next()
  console.log(`A requisição ${++requestCount} terminou.`)
  console.timeEnd('Request')
}

const checkProjectExists = (req, res, next) => {
  if (!req.body.id || !req.body.title){
    return res.status(400).json({error: 'Os campos id e title são obrigatórios.'})
  }

  return next()
}

const checkProjectInArray = (req, res, next) => {
  const project = projects.find(element => element.id == req.params.id)
  if (!project)
    return res.status(400).json({error: 'Projeto não encontrado.'})

  // req.project = project

  return next()
}

server.use(countRequestMiddleware)

server.get('/projects', (req, res) => {
  return res.send({projects})
})

server.post('/projects', checkProjectExists, (req, res) => {
  const {id, title} = req.body;
  
  for(let i=0; i < projects.length; i++){
    if (projects[i].id == id) {
      return res.status(400).json({error: 'Um projeto com este id já existe'})
    }
  }

  projects.push({id, title, tasks: []})
  return res.send({projects})
})

server.put('/projects/:id', checkProjectInArray, (req, res) => {
  const {title} = req.body;
  const {id} = req.params;

  projects.forEach((project, index) => {
    if (project.id == id)
      projects[index] = {id, title}
  })

  return res.send({projects})
})

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
  const {id} = req.params

  projects.forEach((project, index) => {
    if (project.id == id){
      projects.splice(index, 1)
    }
  })

  return res.send()

})

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
  const {title} = req.body;
  const {id} = req.params;

  projects.forEach((project, index) => {
    if (project.id == id){
      projects[index].tasks.push(title)
    }
  })

  return res.send({projects})
})

server.listen(3000);