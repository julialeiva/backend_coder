import express from "express";
import cartRouter from "./routes/cartRouter.js";
import productsRouter from "./routes/productsRouter.js";


//Configuration
const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Static
app.use(express.static('public'));

//Routes
app.use('/api/carts', cartRouter)
app.use('/api/products', productsRouter)

//Server
app.listen(PORT, () => {
  console.log(`\n\tServidor encendido y escuchando en el puerto ${PORT}.\n\tVisita http://localhost:${PORT}`);
})