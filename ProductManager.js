import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "productos.txt";
  }

  static id = 0;

  writeProducts = async (productos) => {
    await fs.writeFile(this.path, JSON.stringify(productos), (error) => {
      if (error) throw error;
    });
  };

  readProducts = async () => {
    let productos = await fs.readFile(this.path, "utf-8");
    return JSON.parse(productos);
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    ProductManager.id++;
    this.products.push({
      ...newProduct,
      id: ProductManager.id,
    });

    await this.writeProducts(this.products);
  };

  getProducts = async () => {
    let productos = await this.readProducts();
    console.log(productos);
  };

  exist = async (id) => {
    let productsAll = await this.readProducts();
    return productsAll.find((product) => product.id === id);
  };

  getProductsById = async (id) => {
    (await this.exist(id))
      ? console.log(await this.exist(id))
      : console.log("Producto no encontrado");
  };

  updateProduct = async ({ id, ...product }) => {
    if ((await this.deleteProducts(id)) === false) {
      console.log("El producto que intenta modificar no existe");
    } else {
      let prod = await this.readProducts();
      let modifiedProducts = [
        {
          id: id,
          ...product,
        },
        ...prod,
      ];
      await this.writeProducts(modifiedProducts);
      console.log("Producto modificado");
    }
  };
  deleteProducts = async (id) => {
    if (await this.exist(id)) {
      let products = await this.readProducts();
      let filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
    } else {
      console.log("Producto no encontrado");
      return false;
    }
  };
}

const productos = new ProductManager();

//Llamamos a getproducts tiene que traer array vacío
// 
// Agregamos dos productos y deben agregarse sin repetirse
// productos.addProduct({"producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc1234", 25})
// productos.addProduct({"producto prueba 2", "Este es otro producto prueba", 200, "Sin imagen", "abc1234", 25})

// //Consultamos un Producto por su ID si el ID no existe debe dar error
// productos.getProductsById(2);
// productos.getProductsById(3);

//Actualizamos un Producto existente sin que se modifique el id
// productos.updateProduct({
//   title: "producto prueba",
//   description: "Este es un producto prueba",
//   price: 400,
//   thumbnail: "Sin imagen",
//   code: "abc123",
//   stock: 25,
//   id: 1,
// });

//eliminamos un Producto por su ID
// productos.deleteProducts(2);
