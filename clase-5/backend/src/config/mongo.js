import mongoose from "mongoose"

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/prompt-data")
    console.log("✅ Conectado a Mongodb con éxito")
  } catch (error) {
    console.log("❌ Error al conectarse a mongodb", error.name)
  }
}

export { connectDb }