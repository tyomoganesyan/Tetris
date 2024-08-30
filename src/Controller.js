
export class Controller {
    isGameStarted = false
    constructor(game, graphics) {
        this.game = game
        this.graphics = graphics

        this.handleClick(this.game, this.graphics)
        this.graphics.renderFirstPage()


    }

    handleClick(game, graphics) {
        window.onkeydown = e => {
            // if (this.game.getState().isGameOver) {

            // }

            if (e.key == "Enter") {
                graphics.render(game.getState())
                this.update()
                setInterval(() => {
                    this.update()
                }, 1000)

                this.isGameStarted = true
            }
            else if (e.key == "ArrowLeft") {
                if (this.isGameStarted) {
                    game.movePieceLeft()
                    graphics.render(game.getState())
                }
            }
            else if (e.key == "ArrowUp") {
                if (this.isGameStarted) {
                    game.rotatePiece()
                    graphics.render(game.getState())
                }
            }
            else if (e.key == "ArrowRight") {
                if (this.isGameStarted) {
                    game.movePieceRight()
                    graphics.render(game.getState())
                }
            }
            else if (e.key == "ArrowDown") {
                if (this.isGameStarted) {
                    game.movePieceDown()
                    graphics.render(game.getState())
                }
            }

        }
    }

    update() {

        this.game.movePieceDown()
        this.graphics.render(this.game.getState())
        if (this.game.getState().isGameOver) {
            this.graphics.renderEndPage(this.game.getState())
        }

    }

}




