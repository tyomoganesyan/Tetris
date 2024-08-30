export class Game {
    poinst = {
        "1": 40,
        "2": 100,
        "3": 300,
        "4": 1200
    }
    score = 0
    lines = 0
    playfield = this.createPlayfield()
    topOut = false
    /*[
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    */
    activePiece = this.createPiece()
    nextPiece = this.createPiece()

    getState() {
        const playfield = this.createPlayfield()
        const { y: pieceY, x: pieceX, blocks } = this.activePiece

        for (let y = 0; y < this.playfield.length; y++) {
            playfield[y] = []
            for (let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x]
            }
        }

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playfield[pieceY + y][pieceX + x] = blocks[y][x]
                }
            }
        }
        return {
            score: this.score,
            nextPiece: this.nextPiece,
            playfield,
            isGameOver: this.topOut

        }



    }

    createPlayfield() {
        const playfield = []
        for (let y = 0; y < 20; y++) {
            playfield[y] = []
            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0
            }
        }
        return playfield
    }

    createPiece() {
        const idx = Math.floor(Math.random() * 7)
        const t = "IJLOSTZ"[idx]
        const p = { x: 0, y: 0 }

        if (t == "I") {
            p.blocks = [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        }
        else if (t == "J") {
            p.blocks = [
                [0, 0, 0],
                [2, 2, 2],
                [0, 0, 2]
            ]
        }
        else if (t == "L") {
            p.blocks = [
                [0, 0, 0],
                [3, 3, 3],
                [3, 0, 0]
            ]
        }
        else if (t == "S") {
            p.blocks = [
                [0, 0, 0],
                [0, 4, 4],
                [4, 4, 0]
            ]
        }
        else if (t == "O") {
            p.blocks = [
                [0, 0, 0, 0],
                [0, 5, 5, 0],
                [0, 5, 5, 0],
                [0, 0, 0, 0]
            ]
        }
        else if (t == "T") {
            p.blocks = [
                [0, 0, 0],
                [6, 6, 6],
                [0, 6, 0]
            ]
        }
        else if (t == "Z") {
            p.blocks = [
                [0, 0, 0],
                [7, 7, 0],
                [0, 7, 7]
            ]
        }
        p.x = Math.floor((10 - p.blocks[0].length) / 2)
        p.y = -1
        return p

    }

    movePieceLeft() {
        this.activePiece.x--
        if (this.hasCollision()) {
            this.activePiece.x++
        }
    }

    movePieceRight() {
        this.activePiece.x++
        if (this.hasCollision()) {
            this.activePiece.x--
        }
    }

    movePieceDown() {
        if (this.topOut) {
            return
        }
        this.activePiece.y++
        if (this.hasCollision()) {
            this.activePiece.y--
            this.lockPiece()
            const cl = this.clearLine()
            this.updateScore(cl)
            this.updatePieces()
        }
        if (this.hasCollision()) {
            this.topOut = true
        }
    }

    rotatePiece() {
        const blocks = this.activePiece.blocks
        const length = blocks.length
        const temp = []
        for (let i = 0; i < length; i++) {
            temp[i] = new Array(length).fill(0)
        }

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                temp[x][y] = blocks[length - 1 - y][x]
            }
        }
        this.activePiece.blocks = temp
        if (this.hasCollision()) {
            this.activePiece.blocks = blocks

        }

    }

    hasCollision() {
        const { y: pieceY, x: pieceX, blocks } = this.activePiece
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x] &&
                    ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
                        this.playfield[pieceY + y][pieceX + x])
                ) {
                    return true
                }
                //this.playfield[pieceY + y][pieceX + x] = blocks[y][x]
            }
        }


        return false
    }

    lockPiece() {
        const { y: pieceY, x: pieceX, blocks } = this.activePiece
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    this.playfield[pieceY + y][pieceX + x] = blocks[y][x]
                }

            }
        }
    }

    clearLine() {
        const rows = 20
        const columns = 10
        let lines = []
        for (let y = rows - 1; y >= 0; y--) {
            let numberOfBlocks = 0
            for (let x = 0; x < columns; x++) {
                if (this.playfield[y][x]) {
                    numberOfBlocks++
                }
            }
            if (!numberOfBlocks) {
                break
            }
            else if (numberOfBlocks < columns) {
                continue
            }
            else if (numberOfBlocks == columns) {
                lines.unshift(y)
            }
        }
        for (let index of lines) {
            this.playfield.splice(index, 1)
            this.playfield.unshift(new Array(columns).fill(0))
        }
        return lines.length
    }

    updateScore(clearedLines) {
        if (clearedLines > 0) {
            this.score += this.poinst[clearedLines]
            this.lines = clearedLines
        }


    }

    updatePieces() {
        this.activePiece = this.nextPiece
        this.nextPiece = this.createPiece()
    }


}