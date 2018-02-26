const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const treeTemplate = document.querySelector('#tree')
const trees = document.querySelector("#trees")

for (ndx = 1; ndx < (window.innerWidth/80); ndx++) {
  const tree = document.importNode(treeTemplate.content, true)
  const treeElement = tree.querySelector('.tree')
  treeElement.style.marginBottom = `${rnd(5,30)}vh`
  treeElement.style.transform = `translateX(${rnd(-30,30)}%)`

  trees.appendChild(tree)
}