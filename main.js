class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
};

class ProductManager{
    products;

    constructor() {
        this.products = [];
    }

    getProducts() {
        return(this.products);
    }

    existProduct(code){
        console.log(code)
        console.log(this.products)
        return this.products.find((product) => product.product.code === code) ? true : false; 
    }

    addProduct(title, description, price, thumbnail, code, stock){
        //chequear si existe en array productos
        if(this.existProduct(code)){
            console.error("El producto ya existe");
            return;
        }
        //chequeo que no falte ningun dato
        if(title === "" || description === "" || price === "" || thumbnail === "" || code === "" || stock === ""){
            console.error("Debe brindar todos los parametros");
            return;
        }
        //si no existe
        let product = new Product(title,
            description,
            price,
            thumbnail,
            code,
            stock);

        let countProducts = this.products.length
        let item = {id:countProducts+1, product:product}
        this.products.push(item);
    } 

    getProductById(id){
        return this.products.find((product) => product.id === id) ? this.products.find((product) => product.id === id ): "No Encontrado";
    }
}

//evaluación
const products = new ProductManager();
console.warn("Controlo que imprima array vacio")
console.log(products.getProducts());

console.warn("Carga de productos")
products.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

console.warn("Ahora debe aparecer mi producto de prueba")
console.log(products.getProducts());

console.warn("Debe saltar un error por código repetido")
products.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

console.warn("Buscar elemento por id. El 1 debe aparecer, el 50 no")
console.log(products.getProductById(1))
console.log(products.getProductById(50))
