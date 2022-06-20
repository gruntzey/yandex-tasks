//script need for next style line
//* {box-sizing: border-box;} 

const [root] = document.getElementsByClassName('root')

function renderWaterfall(rootNode, columnCount, elementGap) {
  //
  //variables
  //
  const rootNodeWidth = rootNode.getBoundingClientRect().width
  const rootNodeChildren = [...rootNode.children]
  const rootTopBorderWidth = parseFloat(window.getComputedStyle(rootNode, null)["border-top-width"])
  const rootLeftBorderWidth = parseFloat(window.getComputedStyle(rootNode, null)["border-left-width"])
  //elementWidth = (container width - gaps) / columns count
  const elementWidth = Math.floor((rootNodeWidth - ((columnCount - 1) * elementGap)) / columnCount)
  let RootNodeHeight //num
  let ColumnsHeightMap = []

  rootNode.style.position = "relative"

  //init ColumnsHeightMap
  for (let i = 0; i < columnCount; i++) {
    ColumnsHeightMap.push(0)
  }


  //
  //adjusting elements
  //
  for (let i = 0; i < rootNodeChildren.length; i++) {
    
    const [elX, elY, idx] = findNextCoords()
    const el = rootNodeChildren[i];
    el.style.position = "absolute";
    el.style.left = `${elX}px`
    el.style.top = `${elY}px`
    el.style.width = `${elementWidth}px`

    const elHeight = el.getBoundingClientRect().height
    ColumnsHeightMap[idx] += elHeight + elementGap
  }

  //adjust root node height
  RootNodeHeight = Math.max(...ColumnsHeightMap) - elementGap
  rootNode.style.height = `${Math.ceil(RootNodeHeight)}px`

  //
  //functions
  //
  function findNextCoords() {
    let minY = ColumnsHeightMap[0]
    let idx = 0

    ColumnsHeightMap.forEach((el, i) => {
      if (el < minY) {
        minY = el
        idx = i
      }
    })

    let x = idx * (elementWidth + elementGap) - rootLeftBorderWidth
    let y = minY - rootTopBorderWidth

    return [x, y, idx]
  }
}

renderWaterfall(root, 3, 30)
