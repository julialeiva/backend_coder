import ProductManager from "../controller/ProductManager.js"

const prodManager = new ProductManager

class ViewsManager {
  async renderHome(req, res) {
    const prods = await prodManager.getProducts()
    res.render('home', {
      hasProds: prods.length > 0,
      prods
    })
  }
  async renderProds(req, res) {
    res.render('realTimeProducts')
  }
}

export default ViewsManager