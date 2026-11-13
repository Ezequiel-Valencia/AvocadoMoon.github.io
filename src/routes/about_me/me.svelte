<div id="intro">
  <h1 id="about-me">About Me</h1>

  <img
    id="squircle"
    src="/about_me/stairs-candid.jpg"
    alt="Ezequiel leaning over a staircase railing"
  />

  <article>
    <div id="description">
      <p id="description-text">
        I'm a Cybersecurity graduate from UConn, class of 2023, currently working as a full stack
        developer at UConn Health's Center for Cell Analysis and Modeling. I apply my knowledge to
        different fields of computer science, such as bioinformatics, IT, full stack development,
        and of course cybersecurity. Although computer science helps me feel a sense of Ikigai, work
        is not life, so I try to spend my free time exploring life to its fullest.
      </p>
      <nav id="links" aria-label="More about me">
        <a href="/work_experience">Work Experience</a>
        <a href="#hobbies">Hobbies &#x2193;</a>
      </nav>
    </div>
  </article>
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&family=Merriweather:wght@300&display=swap');

  #intro {
    height: auto;
    min-height: 100vh;
    width: 100%;
    text-align: center;
    overflow: visible;
    position: relative;
    z-index: 10;
  }

  #squircle {
    display: block;
    width: min(40vh, 80vw);
    aspect-ratio: 1/1;
    border-radius: 5%;
    margin: auto;
    object-fit: cover;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  }

  #description {
    position: relative;
    width: 100%;
  }

  #about-me {
    margin: 0;
    padding: 2%;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem, 10vh, 7rem);
    font-weight: 100;
    text-align: center;
    color: white;
  }

  #description-text {
    padding: 5% 5% 2%;
    margin: auto;
    max-width: 900px;
    color: white;
    line-height: 1.5;
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  }

  #links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding-bottom: 3rem;
  }

  #links a {
    color: white;
    font-size: large;
    padding: 0.5em 1.2em;
    border: 1px solid white;
    border-radius: 999px;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }

  #links a:hover,
  #links a:focus-visible {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
