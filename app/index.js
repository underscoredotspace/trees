const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const treeTemplate = document.querySelector('#tree')
const trees = document.querySelector("#trees")

for (ndx = 1; ndx < (window.innerWidth/90); ndx++) {
  const tree = document.importNode(treeTemplate.content, true)
  const treeElement = tree.querySelector('.tree')
  const margin = rnd(0,30)
  treeElement.style.marginBottom = `${margin}vh`
  treeElement.style.transform = `translateX(${rnd(-20,20)}%) scale(${1.5-(margin/30)})`
  treeElement.style.zIndex = 30-margin

  trees.appendChild(tree)
}