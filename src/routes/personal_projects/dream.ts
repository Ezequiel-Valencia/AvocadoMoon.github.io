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

export function moveAndShowDragMe(ogMoon: HTMLElement, drag_me_text: HTMLElement){
    let y = ogMoon.style.top.split("px")[0]
    let yOffset = (Number(y) + ogMoon.getBoundingClientRect().height)
    drag_me_text.style.top = yOffset + "px";
    drag_me_text.style.left = ogMoon.style.left;
    drag_me_text.style.opacity = "1";
}


export function checkAndPerformIfMoonIntersection(ogMoon: HTMLElement, reflectedMoon: HTMLElement, hitBox: HTMLElement){
  if (hitBox != null && inBounds(ogMoon.getBoundingClientRect(), hitBox.getBoundingClientRect())){
    let l = hitBox.getBoundingClientRect().left + "px"
    let t = hitBox.getBoundingClientRect().top + "px"
    ogMoon.style.setProperty("--left-slide", l);
    ogMoon.style.setProperty("--top-slide", t);

    reflectedMoon.style.setProperty("--left-slide", l);
    reflectedMoon.style.setProperty("--bottom-slide", t);
    
    ogMoon.classList.add("slide-in-moon")
    reflectedMoon.classList.add("slide-in-moon-reflected")
    return true
  }
  return false
}

export function setCircleTextStyle(circle: HTMLElement, dreamText: string, dreamTextSpans: NodeListOf<HTMLElement>){
  const radius = circle.offsetWidth / 2; // Radius of the circle

  dreamTextSpans.forEach((span, i) => {
    const angle = (i / dreamText.length) * 2 * Math.PI; // Angle for each character
    const x = radius + Math.cos(angle); // X position
    const y = radius + Math.sin(angle);
    const rotation = (angle * 180) / (Math.PI)

    span.style.left = `${x}px`;
    span.style.top = `-23%`;
    span.style.fontSize = (radius * 2 * Math.PI) / dreamTextSpans.length + "px"
    span.style.transform = 'rotate(' + rotation + "deg)"
    span.style.setProperty('--end-pos', (rotation + 360) + 'deg')
  })

}

export const dreamThoughts = [
  "Server side image processing for microscopist's",
  'Bot that sends digits of pi',
  'A shaming computer trash bin',
  'mTLS with post-quantum encryption schemes',
  'Geo-guesser website for home items',
  'Soundboard for smells',
  'Solution for NP=P',
  'Dr. Phil Message Sender',
  'Breathalyzer for water (stay hydrated)',
]

