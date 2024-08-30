export class Graphics {
    colors = {
        "1": "cyan",
        "2": "blue",
        "3": "orange",
        "4": "yellowgreen",
        "5": "green",
        "6": "purple",
        "7": "red"
    }
    constructor(elm, w, h, rows, columns) {
        this.elm = elm
        this.w = w
        this.h = h
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.ctx = this.canvas.getContext('2d')
        this.playfieldBorderWidth = 4
        this.playfieldX = this.playfieldBorderWidth
        this.playfieldY = this.playfieldBorderWidth
        this.playfieldWidth = this.w * 2 / 3
        this.playfieldHeight = this.h
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2

        this.blockWidth = this.playfieldInnerWidth / columns
        this.blockHeight = this.playfieldInnerHeight / rows


        this.panelX = this.playfieldWidth + 10
        this.panelY = 0
        this.panelWidth = this.w / 3
        this.panelHeight = this.h

        this.elm.appendChild(this.canvas)

    }

    render(state) {
        this.clearScreen()
        this.renderPlayfield(state.playfield)
        this.renderPanel(state)
        
    }

    renderPlayfield(playfield) {

        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                const block = playfield[y][x]

                if (block) {
                    this.renderBlock(
                        this.playfieldX + (x * this.blockWidth),
                        this.playfieldY + (y * this.blockHeight),
                        this.blockWidth,
                        this.blockHeight,
                        this.colors[block]
                    )
                }
            }

        }
        this.ctx.strokeStyle = "white"
        this.ctx.lineWidth = this.playfieldBorderWidth
        this.ctx.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight)
    }

    renderPanel({ score, nextPiece }) {
        this.ctx.textAlign = "start"
        this.ctx.textBaseline = "top"
        this.ctx.fillStyle = "white"
        this.ctx.font = "20px Tahoma"
        this.ctx.fillText(`Score: ${score}`, this.panelX, this.panelY + 10)
        this.ctx.fillText("Next:", this.panelX, this.panelY + 34)

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x]
                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth / 2),
                        this.panelY + 50 + (y * this.blockHeight / 2),
                        this.blockWidth / 2,
                        this.blockHeight / 2,
                        this.colors[block]
                    )
                }
            }
        }

    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.w, this.h)
    }

    renderBlock(x, y, w, h, color) {
        this.ctx.fillStyle = color
        this.ctx.strokeStyle = "black"
        this.ctx.lineWidth = 2

        this.ctx.fillRect(x, y, w, h)
        this.ctx.strokeRect(x, y, w, h)
    }

    renderFirstPage() {
        this.ctx.fillStyle = "white"
        this.ctx.font = "18px tahoma"
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.fillText("Press ENTER to start Game", this.w / 2, this.h / 2)
        
    }

    renderEndPage({ score }) {
        this.clearScreen()

        this.ctx.fillStyle = "white"
        this.ctx.font = "18px tahoma"
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.fillText("GAME OVER", this.w / 2, this.h / 2)
        this.ctx.fillText(`Score: ${score}`, this.w / 2, this.h / 2+20)
      //  this.ctx.fillText("Press ENTER to restart Game",this.w / 2, this.h / 2+40)

    }


}