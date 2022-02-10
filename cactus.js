import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./utils/updateCustomProperty.js"

const SPEED = 0.05
//this defines when the cactus is spawning between min and max
const CACTUS_INTERVAL_MIN = 800
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector('[data-world]')
//the time of the next cactus spawn
let nextCactusTime
export function setupCactus() {
    //sets the interval of the time before spawn : 
    nextCactusTime = CACTUS_INTERVAL_MIN
    //removes all the cactuses of the previous game :
    document.querySelectorAll('[data-cactus]').forEach((cactus) => cactus.remove())

}


export function updateCactus(delta, speedScale) {
    //moves position of the cactus
    //removes all out of the game cactuses
    setCactusPosition(delta, speedScale)
    //if the time spawn of the next cactus spawn has ended :
    //we create the cactus 
    //we need to get a new time spawn for the next cactus
    if (nextCactusTime <= 0) {
        //get a new time for the next cactus spawn :
        createCactus()
        //sets a random time for spawn div by speedScale (speed is great ==> time is less)
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    //substracting the delta (browser frame) from the nextcactustime 
    nextCactusTime -= delta

}
//adds cactus to worldelement
function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "../imgs/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    worldElem.append(cactus)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function setCactusPosition(delta, speedScale) {
    //select all cactuses: 
    document.querySelectorAll("[data-cactus]").forEach((cactus) => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100)
            cactus.remove
    })
}
//gets the rects properties of each cactus and then returns array
export function getCactusRects() {
    return [...document.querySelectorAll('[data-cactus]')].map(cactus => cactus.getBoundingClientRect())
}