// los controladores se encargan de la lógica de negocio
// input -> process -> output

import { Task } from "../models/tasks.model.js"

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.json({ success: true, data: tasks })
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}

const getTask = async (req, res) => {
  try {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "ID inválido"
      })
    }

    const foundTask = await Task.findById(id)

    if (!foundTask) {
      return res.status(404).json({ success: false, error: "Tarea no encontrada" })
    }

    res.json(foundTask)
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}

const addNewTask = async (req, res) => {
  try {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ success: false, error: "Error en la petición, data invalida" })
    }

    const userId = "6949b05e6b3ce914189494f2"
    const newTask = new Task({ text, userId })
    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { done } = req.body

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "ID inválido"
      })
    }

    if (done === undefined || typeof done !== "boolean") {
      return res.status(400).json({ success: false, error: "Error, done debe ser booleano" })
    }

    const updatedTask = await Task.findByIdAndUpdate(id, { done }, { new: true })

    if (!updatedTask) {
      return res.status(404).json({ success: false, error: "Tarea no encontrada" })
    }

    res.json(updatedTask)
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "ID inválido"
      })
    }

    const deletedTask = await Task.findByIdAndDelete(id)

    if (!deletedTask) {
      return res.status(404).json({ success: false, error: "Tarea no encontrada" })
    }

    res.json({ success: true, data: { id: deletedTask._id } })
  } catch (e) {
    res.status(500).json({ success: false, error: e.message })
  }
}

export { getAllTasks, getTask, addNewTask, updateTask, deleteTask }