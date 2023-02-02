import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();
app.use(express.urlencoded({extended : true}));

const productos = new ProductManager();
const readProducts = productos.readProducts();

app.get("/productos", async (req, res) => {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit)
});

app.get("/productos/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let getProductsById = allProducts.find (function (product) {
            return product.id === id;
        })
    res.send(getProductsById)
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log("Ejecutandose puerto 8080")
});

server.on("error", (error) => {
    console.log("Error del servidor")
});