const check = {
    id: (id) => {
      if (isNaN(parseInt(id))) throw 'El tipo de dato en el ID es incorrecto, este debe ser de tipo numero.'
      return parseInt(id)
    },
    title: (title) => {
      if (!title) throw 'Agrega un titulo a tu producto, al menos 3 caracteres o mas.'
      if (title.length < 3) throw 'El titulo del producto es muy corto para agregar, al menos 3 caracteres o mas.'
      return title
    },
    description: (description) => {
      if (!description) throw 'Agrega una descripcion a tu producto, al menos 10 caracteres o mas.'
      if (description.length < 10) throw 'La descripcion del producto es muy corta para agregar, al menos 10 caracteres o mas.'
      return description
    },
    code: (code) => {
      if (!code) throw 'Agrega un codigo a tu producto';
      if (code.length !== 3) throw 'El codigo del producto no cumple con los requisitos. Este campo requiere de 3 caracteres.'
      return code
    },
    price: (price) => {
      if (!price) throw 'Agrega un precio a tu producto, el precio debe ser mayor a $1.'
      if (isNaN(parseInt(price))) throw 'El tipo de dato ajustado al precio es incorrecto, se requiere un dato de tipo numero.'
      if (parseInt(price) < 1) throw 'El precio del producto es muy bajo para agregar, el precio debe ser mayor a $1.'
      return parseInt(price)
    },
    status: (status) => {
      if (!status) throw 'Agrega un estado a tu producto, este debe estar ajustado a [True] o [False].'
      if (status !== true && status !== false) throw 'El tipo de dato ajustado al estado de tu producto no cumple con los requisitos, este debe estar ajustado a [True] o [False].'
      return status
    },
    stock: (stock) => {
      if (!stock) throw 'Agrega stock a tu producto, el stock debe ser mayor a 1.'
      if (isNaN(parseInt(stock))) throw 'El tipo de dato ajustado al stock es incorrecto, se requiere un dato de tipo numero.'
      if (parseInt(stock) < 1) throw 'El stock del producto es muy bajo para agregar, el stock debe ser mayor a 1.'
      return parseInt(stock)
    },
    category: (category) => {
      if (!category) throw 'Agrega una categoria a tu producto.'
      return category
    },
    thumbnail: (thumbnail) => {
      if (!thumbnail) throw 'Agrega imagenes a tu producto, este debe ser mayor a 1.'
      return thumbnail
    }
  }
  export default check