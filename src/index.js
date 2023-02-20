import express from "express";
import { engine } from "express-handlebars";
import cartRouter from "./routes/cartRouter.js";
import productsRouter from "./routes/productsRouter.js";
import * as path from "path"
import {__dirname} from './path.js'
import { Server } from "socket.io";
import ProductManager from "./controller/ProductManager.js";
import realTimeProductsRouter from "./routes/realTimeProductsRouter.js"

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
app.set("views", path.resolve(__dirname, "./views")) //`${__dirname}/views`

io.on("connection", socket => {
  socket.on('msgCliente', info => { // Captura de info de cliente
     console.log(info)
  })
  socket.emit('msgServer', 'Servidor conectado')
})

//Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/carts', cartRouter) //API
app.use('/api/productos', productsRouter) //API
app.use('/', realTimeProductsRouter)