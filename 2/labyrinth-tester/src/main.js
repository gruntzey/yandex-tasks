// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
export default async function main(game, start) {

    const visited = []
    const variants = []
    let curCoord = start

    async function checkCell(cordObj) {
        let status = await game.state(cordObj.x, cordObj.y)
        

        if (status.finish) return 1
        
        for (let param in status) {
            if (status[param] !== false && 
                param !== "finish" && 
                param !== "start" &&
                paramCellNotVisited(param, curCoord)) {
                    let variant = {}
                    variant.direction = param
                     variant.coords = await setCoordsAndMove(param, curCoord)
                    variants.push(variant)
                }
        }
        visited.push(cordObj)
    }

    function paramCellNotVisited(param, curCoord) {
        let checkingCell = {}
        if (param == "right") {
            checkingCell.x = curCoord.x + 1
            checkingCell.y = curCoord.y
        }
        if (param == "bottom") {
            checkingCell.x = curCoord.x
            checkingCell.y = curCoord.y + 1
        }
        if (param == "left") {
            checkingCell.x = curCoord.x - 1
            checkingCell.y = curCoord.y
        }
        if (param == "top") {
            checkingCell.x = curCoord.x
            checkingCell.y = curCoord.y - 1
        }

        for (let i = 0; i < visited.length; i++) {
            const visitedCell = visited[i];
            if (JSON.stringify(checkingCell) == JSON.stringify(visitedCell)) {
                return false
            }
        }
        return true
    }

    async function setCoordsAndMove(param, curCoord) {
        if (param == "right") {
            await game.right(curCoord.x, curCoord.y)
            return {x: curCoord.x + 1, y: curCoord.y}
        }
        if (param == "bottom") {
            await game.down(curCoord.x, curCoord.y)
            return {x: curCoord.x, y: curCoord.y + 1}
        }
        if (param == "left") {
            await game.left(curCoord.x, curCoord.y)
            return {x: curCoord.x - 1, y: curCoord.y}
        }
        if (param == "top") {
            await game.up(curCoord.x, curCoord.y)
            return {x: curCoord.x, y: curCoord.y - 1}
        }
    }

    async function handleVariant(variants) {
        const variant = variants.pop()
        curCoord = variant.coords
        const exitCode = await checkCell(curCoord)
        if (exitCode == 1) return 1
    }

    let exitCode = await checkCell(curCoord)
    if (exitCode == 1) return curCoord
    
    while(true) {
        exitCode = await handleVariant(variants)
        if (exitCode == 1) return curCoord
    }
}