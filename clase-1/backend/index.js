import express from "express"
import fs from "node:fs"
import cors from "cors"

const PORT = 3000

const tasks = JSON.parse(fs.readFileSync("./db/tasks.json"))

const server = express()
server.use(cors())

server.get("/tasks", (req, res) => {
  res.json(tasks)
})

server.listen(PORT, () => {
  console.log(`Servidor en escucha en http://localhost:${PORT}`)
})