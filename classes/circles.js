const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const brush = canvas.getContext('2d')

function Circle(x,y,dx,dy,radius){
    this.x = x,
    this.y = y,
    this.dx = dx,
    this.dy = dy,
    this.radius = radius
    this.color = tasteTheRainbow()

    this.draw = function(){
      brush.beginPath()
      brush.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
      brush.strokeStyle = 'black'
      brush.fillStyle = this.color
      brush.fill()
      brush.stroke()
    }

//reverse the x or y coordinates when the circle touches the side
    this.update = function(){
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
        this.dx = -this.dx
      }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
          this.dy = -this.dy
      }
      this.x += this.dx
      this.y += this.dy

      this.draw()
      }
    }


function tasteTheRainbow() {
  let hexColors = 'ABCDEF0123456789'
  let skittlesMaker = '#'
  for (let i = 0; i < 6; i++) {
    skittlesMaker += hexColors[Math.floor(Math.random() * 16)]
  }
  return skittlesMaker
}

const mouse = {
  x: undefined,
  y: undefined,
}

$('#canvas').mousemove(function(){
  mouse.x = event.x
  mouse.y = event.y
})

let circleArray = []

//Create circles based on how long you hold the mouse down
let timer = 0
$('#canvas').mousedown(function () {
  timer = new Date()
}).mouseup(function () {
  let timePassed = (new Date () - timer)/10
  if(timePassed > 100){
    timePassed = 100}
let radius = timePassed
timer = 0
let x = event.x
let y = event.y
let dx = (Math.random()-0.5) *10
let dy = (Math.random()-0.5) *10
circleArray.push(new Circle(x, y, dx, dy, radius))
});

function animate(){
  requestAnimationFrame(animate)
  brush.clearRect(0,0,innerWidth,innerHeight)
  for (let i = 0; i < circleArray.length; i++){
    circleArray[i].update()
  }
}

animate()