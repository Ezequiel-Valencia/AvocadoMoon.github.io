export function createReflections(ocean_reflection: HTMLElement){
    let reflections = document.querySelectorAll(".to-be-reflected") as NodeListOf<HTMLElement>
    reflections.forEach((el) => {
      let copy = el.cloneNode(false) as HTMLElement      
      let yOffset =  Number(el.style.top.split("%")[0])
      copy.style.top = ""
      copy.style.bottom = yOffset + "%"
      copy.style.position = "absolute"
      copy.classList.add("reflected")
      copy.id = ""
      ocean_reflection.appendChild(copy)
    })
  }

export function setStarPositions(){
    let stars = document.querySelectorAll(".star") as NodeListOf<HTMLElement>
    stars.forEach((star) => {
      star.style.top = "" + Math.floor(Math.random() * 100) + "%"
      star.style.left = "" + Math.floor(Math.random() * 100) + "%"
     })
  }

export function inBounds(rect1: DOMRect, rect2: DOMRect){
return !(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom)
}

export function moveMoonAndGradient(e: MouseEvent, ogMoon: HTMLElement, sky:HTMLElement, 
    reflectedMoon: HTMLElement, ocean_reflection:HTMLElement){
    let rect = sky.getBoundingClientRect()
    let xInt = e.clientX - rect.left - (innerWidth / 50);
    let yInt = e.clientY - rect.top - (innerHeight / 50);
    let x = xInt + "px"
    let y = yInt + "px"
    ogMoon.style.top = y
    ogMoon.style.left = x
    sky.style.setProperty("--grad-y", y)
    sky.style.setProperty("--grad-x", x)
    reflectedMoon.style.bottom = y
    reflectedMoon.style.left = x
    ocean_reflection.style.setProperty("--grad-y", ((innerHeight/ 2) - yInt) + "px")
    ocean_reflection.style.setProperty("--grad-x", x)
}