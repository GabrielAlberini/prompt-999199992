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

server.use((req, res) => {
  res.json({ status: "not found" })
})


server.listen(1111, () => {
  console.log("✅ Conectado al puerto http://localhost:1111")
})