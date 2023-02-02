import { promises as fs } from "fs";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./doc/productos.txt";
  };

  static id = 0;

  writeProducts = async (productos) => {
    await fs.writeFile(this.path, JSON.stringify(productos), (error) => {
      if (error) throw error;
    });
  };

  readProducts = async () => {
    let allProducts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(allProducts);
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
        if(this.exist(code) == code){
            console.error("El producto ya existe");
            return;
        }
        if(title === "" || description === "" || price === "" || thumbnail === "" || code === "" || stock === ""){
            console.error("Debe brindar todos los parametros");
            return;
        }
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
    let productsAll = await this.readProducts();
    console.log(productsAll);
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
};



// Agregamos 10 productos
// productos.addProduct("Café con leche", "Café con leche caliente", 250, "Sin imagen", "123", 5);
// productos.addProduct("Ice Coffe", "Café con leche frío", 250, "Sin imagen", "1234", 3);
// productos.addProduct("Jugo de Naranja","Jugo de Naranja exprimido 300 cc",250, "Sin imagen", "12345", 7);
// productos.addProduct("Sueño en Sandwich", "Tortita raspada con jamón y queso caliente", 300, "Sin imagen", "343", 10);
// productos.addProduct("Medialuna", "Medialuna dulce clásica", 150, "Sin imagen", "3456", 4);
// productos.addProduct("Chocotorta", "Porción de chocotorta", 500, "Sin imangen", "5425", 9);
// productos.addProduct("Yogo", "Yogurt griego con granola, frutas y miel", 500, "Sin imagen", "1326", 2);
// productos.addProduct("Tarta de coco", "Porción de tarta de coco con dulce de leche", 400, "Sin imagen", "4357", 3);
// productos.addProduct("Submarino", "Tazón de leche caliente con barra de chocolate", 350, "Sin imagen", "4528", 5);
// productos.addProduct("Ensalada de Fruta", "Tazón de frutas", 500, "Sin imagen", "4645", 5);

// productos.getProducts();


