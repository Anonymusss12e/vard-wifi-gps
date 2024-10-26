import { Point } from './Point'
import { Canvas } from './Canvas'

export class Animation {
  constructor() {
    this.canvas = new Canvas()
    this.points = []
    this.numPoints = 200
    this.targetY = window.innerHeight * 0.7
    this.paused = false
    
    // Gate configuration
    this.gateWidth = 60
    this.gateX = (window.innerWidth - this.gateWidth) / 2
    
    this.init()
    this.addEventListeners()
    this.animate()
  }

  init() {
    for (let i = 0; i < this.numPoints; i++) {
      this.points.push(new Point(this.gateX, this.gateWidth))
    }
  }

  addEventListeners() {
    window.addEventListener('click', () => {
      this.paused = !this.paused
    })

    window.addEventListener('resize', () => {
      this.targetY = window.innerHeight * 0.7
      this.gateX = (window.innerWidth - this.gateWidth) / 2
      this.points.forEach(point => point.reset(this.gateX, this.gateWidth))
    })
  }

  update() {
    if (this.paused) return

    this.points.forEach(point => {
      point.update(this.targetY)
    })
  }

  draw() {
    this.canvas.clear()
    this.canvas.drawPatterns(this.targetY)
    this.canvas.drawGate(this.gateX, this.gateWidth)
    this.points.forEach(point => point.draw(this.canvas.ctx))
  }

  animate() {
    this.update()
    this.draw()
    requestAnimationFrame(() => this.animate())
  }
}