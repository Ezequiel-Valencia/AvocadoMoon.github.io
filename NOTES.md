Tech Stack

For dealing with JS and HTML svelte will be used.

- [Smelte](https://smeltejs.com/)
    Smelte is a way to use Tailwind with svelte allowing for basic UI elements to be implemented more easily. Not easy to implement, and I've already got tailwind.

- Vite
    - Used for bundling the different svelte and other files together
    - When needed, "npm run build" allows for the code to be processed for production, serving native HTML, CSS, and Javascript.
    - https://youtu.be/KCrXgy8qtjM

For CSS either
- Tailwind
    - Allows for css to be written directly into the HTML 
    - HTML code can become very bloated
- Sass
    - An extension of css with the files being seperate from css
    - Use npx command to run Sass since its saved locally
    - It just works with svelte. All that is required is for the sass package to be installed. Then simply just import the sass file into the svelte component.
    - https://github.com/svelte-add/scss
    - https://sveltesociety.dev/templates#adders
    - https://kit.svelte.dev/docs/integrations#adders
https://kit.svelte.dev/docs/adapters

https://kit.svelte.dev/docs/adapter-static

https://stackoverflow.com/questions/64634996/dom-not-updating-when-object-is-changed

https://youtu.be/Xc6G3oV24yE?si=89sdRyIbjUpf05lP