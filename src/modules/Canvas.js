export class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.resize()
    this.addResizeListener()
  }

  resize() {
    const dpr = window.devicePixelRatio || 1
    this.canvas.width = window.innerWidth * dpr
    this.canvas.height = window.innerHeight * dpr
    this.canvas.style.width = `${window.innerWidth}px`
    this.canvas.style.height = `${window.innerHeight}px`
    this.ctx.scale(dpr, dpr)
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      this.resize()
    })
  }

  clear() {
    this.ctx.fillStyle = 'rgba(36, 36, 36, 0.2)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawGate(x, width) {
    const time = Date.now() * 0.001
    const pulseIntensity = (Math.sin(time * 2) + 1) * 0.5 * 0.3
    
    // Draw gate glow
    const glowGradient = this.ctx.createRadialGradient(
      x + width/2, 40, 0,
      x + width/2, 40, width
    )
    glowGradient.addColorStop(0, `rgba(100, 108, 255, ${0.3 + pulseIntensity})`)
    glowGradient.addColorStop(1, 'rgba(100, 108, 255, 0)')
    
    this.ctx.beginPath()
    this.ctx.arc(x + width/2, 40, width/2, 0, Math.PI * 2)
    this.ctx.fillStyle = glowGradient
    this.ctx.fill()
    
    // Draw gate structure
    this.ctx.strokeStyle = `rgba(100, 108, 255, ${0.8 + pulseIntensity})`
    this.ctx.lineWidth = 3
    this.ctx.beginPath()
    this.ctx.arc(x + width/2, 40, width/4, 0, Math.PI * 2)
    this.ctx.stroke()
  }

  drawPatterns(targetY) {
    const time = Date.now() * 0.001
    const pulseIntensity = (Math.sin(time * 2) + 1) * 0.5 * 0.3

    // Draw circular pattern guides
    this.ctx.strokeStyle = `rgba(100, 108, 255, ${0.1 + pulseIntensity})`
    this.ctx.lineWidth = 1
    
    for (let i = 0; i < 3; i++) {
      const radius = 100 + i * 100
      this.ctx.beginPath()
      this.ctx.ellipse(
        window.innerWidth/2, targetY,
        radius, radius/2,
        0, 0, Math.PI * 2
      )
      this.ctx.stroke()
    }
  }
}