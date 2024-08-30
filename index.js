import { Game} from "./src/Game.js";
import { Graphics } from "./src/Graphics.js";
import { Controller } from "./src/Controller.js";

const elm=document.querySelector('#main')


const game=new Game()
const graphics=new Graphics(elm,440,600,20,10)
const controller=new Controller(game,graphics)



