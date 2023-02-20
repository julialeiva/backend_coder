import { Router } from "express"
import ProductManage from '../controller/ProductManager.js'

/* Product manager */
const productos = new ProductManage('src/models/products.json')
const realTimeProductsRouter = Router()

// await productos.verifyStaticId()

realTimeProductsRouter.get('/', async (req, res) => {
   const aux = await productos.getProducts(req.query.limit)
   res.render("home", {productos: aux})
})
realTimeProductsRouter.get('/realTimeProducts', async (req, res) => {
   const aux = await productos.getProducts(req.query.limit)
   res.render("realTimeProducts", {productos: aux})
})

export default realTimeProductsRouter