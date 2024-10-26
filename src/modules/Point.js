export class Point {
  constructor(gateX, gateWidth) {
    // Point properties
    this.size = 2 + Math.random() * 2
    this.speed = 1 + Math.random() * 1.5
    this.opacity = 0
    
    // Movement phases
    this.phase = 'approaching' // approaching -> entering -> spreading
    
    // Initialize at random edge position
    this.initializePosition(gateX, gateWidth)
    
    // Gate target position
    this.gateTargetX = gateX + gateWidth / 2
    this.gateTargetY = 40
    
    // Final pattern position
    this.patternAngle = Math.random() * Math.PI * 2
    this.patternRadius = 100 + Math.random() * 200
  }

  initializePosition(gateX, gateWidth) {
    const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
    
    switch(side) {
      case 0: // top
        this.x = Math.random() * window.innerWidth
        this.y = -10
        break
      case 1: // right
        this.x = window.innerWidth + 10
        this.y = Math.random() * window.innerHeight
        break
      case 2: // bottom
        this.x = Math.random() * window.innerWidth
        this.y = window.innerHeight + 10
        break
      case 3: // left
        this.x = -10
        this.y = Math.random() * window.innerHeight
        break
    }
  }

  moveTowards(targetX, targetY, speed) {
    const dx = targetX - this.x
    const dy = targetY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < speed) {
      this.x = targetX
      this.y = targetY
      return true
    }
    
    this.x += (dx / distance) * speed
    this.y += (dy / distance) * speed
    return false
  }

  update(targetY) {
    switch(this.phase) {
      case 'approaching':
        if (this.moveTowards(this.gateTargetX, this.gateTargetY, this.speed)) {
          this.phase = 'entering'
        }
        this.opacity = Math.min(1, this.opacity + 0.02)
        break
        
      case 'entering':
        const patternX = window.innerWidth/2 + Math.cos(this.patternAngle) * this.patternRadius
        const patternY = targetY + Math.sin(this.patternAngle) * (this.patternRadius/2)
        
        if (this.moveTowards(patternX, patternY, this.speed * 1.5)) {
          this.phase = 'spreading'
        }
        break
        
      case 'spreading':
        // Add subtle movement in the final position
        this.x += Math.sin(Date.now() * 0.001 + this.patternAngle) * 0.5
        this.y += Math.cos(Date.now() * 0.001 + this.patternAngle) * 0.5
        break
    }
  }

  draw(ctx) {
    // Draw glow effect
    const glow = this.size * 2
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, glow
    )
    gradient.addColorStop(0, `rgba(100, 108, 255, ${this.opacity * 0.5})`)
    gradient.addColorStop(1, 'rgba(100, 108, 255, 0)')

    ctx.beginPath()
    ctx.arc(this.x, this.y, glow, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw point
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.fill()
  }

  reset(gateX, gateWidth) {
    this.phase = 'approaching'
    this.opacity = 0
    this.initializePosition(gateX, gateWidth)
    this.patternAngle = Math.random() * Math.PI * 2
  }
}