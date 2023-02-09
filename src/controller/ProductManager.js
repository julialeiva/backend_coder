import fs, { promises as fsp } from 'fs'
import check from '../utils/checkers.js';

class ProductManager {
  constructor() {
    this.dbname = "products"
    this.pathdb = `./src/models/${this.dbname}.json`
  }

  async getDataBase() {
    if (!fs.existsSync(this.pathdb)) await fsp.writeFile(this.pathdb, "[]")
    return JSON.parse(await fsp.readFile(this.pathdb))
  }

  // Funciones para las consultas
  async getProducts() {
    const dbprod = await this.getDataBase()
    return dbprod
  }
  async getProductById(pid) {
    const id = check.id(pid)
    const dbprod = await this.getDataBase()
    const prodFound = dbprod.find((item) => { return item.id === id })
    return prodFound ?? {}
  }

  async addProduct({ title, description, code, price, status, stock, category, thumbnail }) {
    const data = { title: check.title(title), description: check.description(description), code: check.code(code), price: check.price(price), status: check.status(status), stock: check.stock(stock), category: check.category(category), thumbnail: check.thumbnail(thumbnail) }
    const dbprod = await this.getDataBase()
    const id = dbprod.length > 0 ? dbprod[dbprod.length - 1].id + 1 : 1
    dbprod.push({ id, ...data })
    await fsp.writeFile(this.pathdb, JSON.stringify(dbprod,null,2))
    return "Producto creado"
  }

  async updateProduct(pid, { title, description, code, price, status, stock, category, thumbnail }) {
    const dbprod = await this.getDataBase()
    dbprod.forEach(item => {
      if (item.id === pid) {
        if (title) item.title = check.title(title)
        if (description) item.description = check.description(description)
        if (code) item.code = check.code(code)
        if (price) item.price = check.price(price)
        if (status) item.status = check.status(status)
        if (stock) item.stock = check.stock(stock)
        if (category) item.category = check.category(category)
        if (thumbnail) item.thumbnail = check.thumbnail(thumbnail)
      }
    });
    await fsp.writeFile(this.pathdb, JSON.stringify(dbprod,null,2))
  }
  async deleteProduct(pid) {
    const id = check.id(pid)
    const dbprod = await this.getDataBase()
    const newData = dbprod.filter((item) => { return item.id !== id })
    await fsp.writeFile(this.pathdb, JSON.stringify(newData))
  }
}

export default ProductManager






