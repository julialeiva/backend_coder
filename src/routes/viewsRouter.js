import { Router } from "express"
import ViewsManager from "../controller/ViewManager.js"

const viewsRouter = Router()
const vm = new ViewsManager

viewsRouter.get('/', vm.renderHome)
viewsRouter.get('/realtimeproducts', vm.renderProds)

export default viewsRouter 