import express from "express";
import { engine } from "express-handlebars";
import cartRouter from "./routes/cartRouter.js";
import productsRouter from "./routes/productsRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import * as path from "path"
import { __dirname } from './utils/path.js'
import { Server } from "socket.io";
import ProductManager from "./controller/ProductManager.js";

const prodManager = new ProductManager

//Configuration
const app = express()
const PORT = 8080

//Server
const server = app.listen(PORT, () => {
  console.log(`\n\tServidor encendido y escuchando en el puerto ${PORT}.\n\tVisita http://localhost:${PORT}`);
})

const io = new Server(server);

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "../views"))

io.on('connection', (e) => {
  e.on('getProListUpdated', async () => {
    const prods = await prodManager.getProducts()
    e.emit('proListUpdated', JSON.stringify(prods))
  })
  e.on('addProd', async (data) => {
    try {
      await prodManager.addProduct(JSON.parse(data))
      const prods = await prodManager.getProducts()
      socket.emit('proListUpdated', JSON.stringify(prods))
      socket.emit('addProdRes', JSON.stringify({ isOk: true, msg: `Producto agregado satisfactoriamente.` }))
    } catch (error) {
      socket.emit('addProdFRes', JSON.stringify({ isOk: false, msg: `Hubo un error al agregar un producto.`, valid: [] }))
    }
  })
  e.on('rmProd', async (id) => {
    try {
      await prodManager.deleteProduct(id)
      const prods = await prodManager.getProducts()
      socket.emit('proListUpdated', JSON.stringify(prods))
      socket.emit('rmProdError', JSON.stringify({ isOk: true, msg: `Producto eliminado satisfactoriamente.` }))
    } catch (error) {
      socket.emit('rmProdError', JSON.stringify({ isOk: false, msg: `Hubo un error al agregar un producto.` }))
    }
  })
  return e
})

//Routes
app.use('/static', express.static(path.join(__dirname + '/public'))) //Static
app.use('/', viewsRouter) //Views
app.use('/api/carts', cartRouter) //API
app.use('/api/products', productsRouter) //API