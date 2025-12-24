// punto de entrada
// archivo que ejecuta servicios

import express from "express"
import cors from "cors"
import { connectDb, getDbStatus } from "./config/mongo.js"
import { taskRouter } from "./routes/taskRouter.js"

const server = express()
server.use(cors())
server.use(express.json())

server.get("/", (req, res) => {
  const db = getDbStatus()

  if (db.state === 1) {
    return res.status(200).json({
      success: true,
      message: "API Tasks funcionando correctamente",
      database: db.status
    })
  }

  return res.status(503).json({
    success: false,
    message: "API disponible pero la base de datos no está conectada",
    database: db.status
  })
})

server.use("/tasks", taskRouter)

server.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "Ruta no encontrada",
      path: req.originalUrl,
      method: req.method
    }
  })
})

server.listen(1111, () => {
  console.log("✅ Conectado al puerto http://localhost:1111")
  connectDb()
})