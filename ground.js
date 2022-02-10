import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./utils/updateCustomProperty.js"
const SPEED = .05
//position of the ground !
const groundElems = document.querySelectorAll('[data-ground]')

export function setupGround() {
    setCustomProperty(groundElems[0], "--left", 0)
    setCustomProperty(groundElems[1], "--left", 300)
}

export function updateGround(delta, speedscaleincrease) {
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * SPEED * speedscaleincrease * -1)
        if (getCustomProperty(ground, "--left") <= -300)
            incrementCustomProperty(ground, "--left", 600)

    })

}