import { getCustomProperty, incrementCustomProperty, setCustomProperty, } from "./utils/updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
//nb d'images : 1 frame == 1 animation
const DINO_FRAMES = 2
const JUMP_SPEED = 0.38
const GRAVITY = 0.001
const FRAME_TIME = 100 //1 animation = 100 ms seconds
let isJumping
let currentFrameTime
let dinoFrame
let yVelocity

export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    //????
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
    setCustomProperty(document.querySelector('[data-dino]'), "--bottom", 0)
}
export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)


}

function handleRun(delta, speedScale) {
    if (isJumping) {

        dinoElem.src = '../imgs/dino-stationary.png'
        return
    }
    if (currentFrameTime >= FRAME_TIME) {

        dinoFrame = (dinoFrame + 1) % DINO_FRAMES
        dinoElem.src = `../imgs/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME


    }

    currentFrameTime += delta * speedScale



}
function handleJump(delta) {


    if (!isJumping) return
    //increment the bottom css property by the velocity 

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        isJumping = false

        setCustomProperty(dinoElem, "--bottom", 0)
    }

    yVelocity -= GRAVITY * delta



}
function onJump(e) {

    if (e.code !== "Space" || isJumping) return
    yVelocity = JUMP_SPEED
    isJumping = true

}
//get the rect properties of the dino element
export function getDinoRects() {
    return dinoElem.getBoundingClientRect()
}
export function setDinoLose() {
    dinoElem.src = "../imgs/dino-lose.png"
}