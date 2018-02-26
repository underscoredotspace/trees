import React from 'react'
import ReactDOM from 'react-dom'

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const SVGNS = 'http://www.w3.org/2000/svg'

class PineTrees extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trees: []
    }
  }
  componentDidMount() {
    const trees = []
    for (let ndx = 1; ndx < (window.innerWidth/90); ndx++) {
      // for (let ndx = 1; ndx < 3; ndx++) {
        const margin = rnd(0,30)
        const marginBottom = `${margin}vh`
        const transform = `translateX(${rnd(-20,20)}%) scale(${1.5-(margin/30)})`
        const zIndex = 30-margin
      trees.push({style:{marginBottom, transform, zIndex}})
    }

    this.setState({trees})
  }

  render() {
    return this.state.trees.map((tree, ndx) => (
        <PineTree {...tree} key={`tree-${ndx}`} />
      ))
  }
}
class PineTree extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      lines:[], 
      polylines:[], 
      snowLines:[]
    }
    this.width = 200
    this.height = 250
  }

  getLine(x1, y1, angle, length) {
    let {x2,y2} = this.lineEnd(x1, y1, angle, length)
    return {x1,y1,x2,y2}
  }

  lineEnd (x1, y1, angle, length) {
    angle = angle * Math.PI / 180
    const x2 = x1 + (length * Math.sin(angle))
    const y2 = y1 + (length * Math.cos(angle))
    return {x2, y2}
  }

  componentDidMount() {
    let lines = [], polylines = [], snowLines = []
    
    const trunkAngle = rnd(175,185)
    const trunkLength = this.height
    const trunkStart = {x:this.width/2, y:this.height}

    lines.push({...this.getLine(trunkStart.x, trunkStart.y, trunkAngle, trunkLength), className: 'pine-trunk'})

    const branches = this.height/5
    const segment = trunkLength/branches

    for (let angle of [[100,120], [240,260]]) {
      for (let branch = 3; branch < branches; branch++) {
        const posOnTrunk = rnd(segment*branch, segment*(branch+1))
        const branchStart = this.lineEnd(trunkStart.x, trunkStart.y, trunkAngle, posOnTrunk)
        const branchAngle = rnd(angle[0], angle[1])
        const branchLength = (this.width - branchStart.x2) * (1-(branch/branches))

        const subBranches = branchLength/3
        const subSegment = branchLength/subBranches
        let polyline = ""
        for (let subBranch = 0; subBranch < subBranches-1; subBranch++) {
          const posOnBranch = rnd(subSegment*subBranch, subSegment*(subBranch+1))
          const subBranchStart = this.lineEnd(branchStart.x2, branchStart.y2, branchAngle, posOnBranch)
          const subBranchAngle = rnd(170,190)
          const subBranchLength = this.height / 20
          const polySeg = {...this.getLine(subBranchStart.x2, subBranchStart.y2+(subBranchLength/2), subBranchAngle, subBranchLength)}
          polyline += `${polySeg.x1},${polySeg.y1} ${polySeg.x2},${polySeg.y2} `
          if (rnd(0,9)%3===0) {
            snowLines.push(polySeg)
          }
        }
        polylines.push(polyline)
      }
    }

    this.setState({lines,polylines,snowLines})
  }
  
  render() {
    return (
      <div className="pine-tree" style={this.props.style}>
      <svg xmlns={SVGNS} viewBox={`0 0 ${this.width} ${this.height}`}>
        {
          this.state.lines.map((line, ndx) => (
            <line className="pine-branch" {...line} key={`line-${ndx}`} />
          ))
        }{
          this.state.polylines.map((polyline, ndx) => (
            <polyline className="pine-needle" points={polyline}  key={`polyline-${ndx}`} />
          ))
        }{
          this.state.snowLines.map((line, ndx) => (
            <line className="snow-needle" {...line} key={`snowline-${ndx}`} />
          ))
        }
      </svg>
      </div>
    )
  }
}

ReactDOM.render(
  <PineTrees />, 
  document.getElementById('trees')
)