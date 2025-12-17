import express from "express"

const server = express()

// método
// ruta

// get - /tasks
// post - /register
// patch - /tasks/1

const usersFromDb = ["lista de usuarios"]

server.get("/", (req, res) => {
  res.json({ status: "ok" })
})

server.get("/users", (req, res) => {
  res.json(usersFromDb)
})

// callback -> función que se ejecuta despues de que pase algo
server.get("/tasks", (req, res) => {
  res.send("Lista de tareas modificada")
})

server.use((req, res) => {
  res.json({ status: "not found" })
})

// 65000
server.listen(1111, () => {
  console.log("✅ Conectado al puerto http://localhost:1111")
})