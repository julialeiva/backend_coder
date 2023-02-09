import { Router } from "express";
import CartManager from "../controller/CartManager.js";

const cartRouter = Router()
const cartManager = new CartManager

cartRouter.route('/')
  .post(async (req, res) => {
    try {
      const id = await cartManager.createCart()
      res.status(201).send(`Carro creado satisfactoriamente, Cart ID: ${id}`)
    } catch (error) {
      res.status(400).send(`Ha ocurrido un error al crear un nuevo carrito de compra, proceso ha sido cancelada. ${error}`)
    }
  })

cartRouter.route('/:cid')
  .get(async (req, res) => {
    try {
      const cart = await cartManager.getCartByID(parseInt(req.params.cid))
      res.status(200).send(cart.products ?? [])
    } catch (error) {
      res.status(400).send(`Ha ocurrido un error al consultar el carrito "${req.params.cid}". ${error}`)
    }
  })

cartRouter.route('/:cid/product/:pid')
  .post(async (req, res) => {
    const params = req.params
    try {
      await cartManager.addItemToCart(parseInt(params.cid), parseInt(params.pid))
      res.status(200).send(`Producto agregado satisfactoriamente al carrito ${parseInt(params.cid)}`)
    } catch (error) {
      res.status(400).send(`'Ha ocurrido un erro al intentar agregar un producto al carrito, el proceso fue cancelado. ${error}`)
    }
  })

export default cartRouter