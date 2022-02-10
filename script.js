import { setupDino, updateDino, getDinoRects, setDinoLose } from "./dino.js"
import { setupGround, updateGround } from "./ground.js"
import { setupCactus, updateCactus, getCactusRects } from "./cactus.js"

const WORLD_WIDTH_RATIO = 120
const WORLD_HEIGHT_RATIO = 32
const SPEED_SCALE = 0.00001
let lastTime
let incrSpeed = 1
let score = 0
//select the element
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
//add  the "resize" event listener to the window
setupGround()

setPixelToWorldScale()

window.addEventListener("keydown", handleStart, { once: true })
//the difference between setPixelToWorldScale and setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
function setPixelToWorldScale() {
    let worldToPixelScale = 0
    //condition if it's wider
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH_RATIO / WORLD_HEIGHT_RATIO)
        worldToPixelScale = window.innerWidth / WORLD_WIDTH_RATIO
    //condition if it's taller
    else
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT_RATIO

    // @ts-ignore
    worldElem.style.width = `${WORLD_WIDTH_RATIO * worldToPixelScale}px`
    // @ts-ignore
    worldElem.style.height = `${WORLD_HEIGHT_RATIO * worldToPixelScale}px`
}
function handleStart() {
    //restart from the start
    lastTime = null
    setupGround()
    setupDino()
    setupCactus()
    document.querySelector('[data-start-screen]').classList.add("hide")
    window.requestAnimationFrame(updateLoop)
}

//creating an update loop to update all our animations
//one thing to do here : do not rely on frames per seconds as it can variy from a computer to another
//we need to find the perfect (speed animation) to 


function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return

    }
    const delta = time - lastTime
    updateDino(delta, incrSpeed)
    updateGround(delta, incrSpeed)
    updateCactus(delta, incrSpeed)

    setIncreaseSpeed(delta)
    setScore(delta)
    //stops the game when lost (going out from the loop)
    if (isLose()) return handleLose()
    scoreElem.textContent = Math.floor(score).toString()

    //takes ....
    lastTime = time
    window.requestAnimationFrame(updateLoop)

}
function setIncreaseSpeed(delta) {
    incrSpeed += SPEED_SCALE * delta
}
function setScore(delta) {
    score += delta * .001

}
//checks the conditions of a collision between cactus elements and dino
//return true if one of the conditions are verified , else false
function isLose() {
    const dinoElemRects = getDinoRects()
    const cactusElemsRects = getCactusRects()
    //check the collision 
    return cactusElemsRects.some(cactusRects => isCollision(dinoElemRects, cactusRects))
}
function isCollision(rect1, rect2) {
    return (rect1.left < rect2.right && rect1.top < rect2.bottom
        && rect1.right > rect2.left && rect1.bottom > rect2.top)
}
//handle when the game is lost
//stops the game stopping update loop
//changes the picture of the dino
function handleLose() {
    //changes the picture of dino

    setDinoLose()
    document.querySelector('[data-start-screen]').classList.remove("hide")
    //ensures that we can start the game :
    //if we dont add a keydown event listener, the game will never start , because the previous keydown event was 
    //added only ONCE at the game setup. we need to add it again
    score = 0

    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true })
    }, 100)
}
