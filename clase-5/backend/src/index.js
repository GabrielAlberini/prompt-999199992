import express from "express"
import cors from "cors"
import { connectDb } from "./config/mongo.js"
import { Task } from "./models/tasks.model.js"

const server = express()
server.use(cors())
server.use(express.json())

server.get("/", (req, res) => {
  res.json({ status: "ok" })
})

// GET - Obtener todas las tareas
server.get("/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 })
  res.send(tasks)
})

// GET - Obtener una tarea por ID
server.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id)
  res.send(task)
})

// POST - Crear una nueva tarea
server.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body)
  const savedTask = await newTask.save()
  res.status(201).send(savedTask)
})

// PATCH - Actualizar el estado done de una tarea
server.patch("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { done: req.body.done },
    { new: true }
  )
  res.send(updatedTask)
})

// DELETE - Eliminar una tarea
server.delete("/tasks/:id", async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id)
  res.send(deletedTask)
})

server.use((req, res) => {
  res.json({ status: "not found" })
})

server.listen(1111, () => {
  console.log("✅ Conectado al puerto http://localhost:1111")
  connectDb()
})