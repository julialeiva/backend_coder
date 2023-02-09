import fs, { promises as fsp } from 'fs'
import ProductManager from "./ProductManager.js";
import check from '../utils/checkers.js';

const prodManager = new ProductManager

class CartManager {
  constructor() {
    this.dbname = "carts"
    this.pathdb = './src/models/' + this.dbname + '.json'
  }
  async getDataBase() {
    if (!fs.existsSync(this.pathdb)) await fsp.writeFile(this.pathdb, '[]')
    return JSON.parse(await fsp.readFile(this.pathdb))
  }
  async createCart() {
    const cartDB = await this.getDataBase()
    const id = cartDB.length > 0 ? cartDB[cartDB.length - 1].id + 1 : 1
    cartDB.push({ id: id, products: [] })
    await fsp.writeFile(this.pathdb, JSON.stringify(cartDB))
    return id
  }
  async getCartByID(id) {
    const cid = check.id(id)
    const cartDB = await this.getDataBase()
    const cartFound = cartDB.find((item) => item.id === cid)
    return cartFound ?? []
  }
  async addItemToCart(cartid, prodid) {
    const cid = check.id(cartid);
    const pid = check.id(prodid);
    const cartDB = await this.getDataBase()

    const cartFound = cartDB.find((item) => item.id === cid)
    if (!cartFound) throw 'Carrito no encontrado.'

    const prod = await prodManager.getProductById(pid)
    if (Object.keys(prod).length <= 0) throw 'Producto no encotrado.'

    const item = cartFound.products.find(prod => { return prod.id == pid })
    item ? item.quantity++ : cartFound.products.push({ id: prod.id, quantity: 1 })
    await fsp.writeFile(this.pathdb, JSON.stringify(cartDB))
  }
}

export default CartManager