<div>
  <h1>Ezequiel Valencia</h1>
  <dl>
    <dt id="about_me_dt">
      <a href="/about_me">About Me</a>
    </dt>
    <dt id="school_dt">
      <a href="/school">Education Projects</a>
    </dt>
    <dt id="personal_dt">
      <a href="/personal_projects">Personal Projects</a>
    </dt>
    <dt id="company_dt">
      <a href="/company">Company Projects</a>
    </dt>
  </dl>
</div>

<style lang="scss">
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Backgrounds_and_Borders/Border-image_generator
  @mixin textBorder($borderIcon: DarkGrey, $slice: 80, $repeat: repeat, $textColor: aqua) {
    border: 15px solid;
    border-width: 1vw;
    border-image-source: $borderIcon;
    border-image-repeat: $repeat;
    border-image-slice: $slice;
    a:hover {
      color: $textColor;
    }
  }

  div {
    padding-left: 70vw;
    padding-top: 30vh;
  }
  dl {
    text-align: center;
  }
  dt {
    padding: 1%;
  }

  a {
    color:orangered;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  }

  #about_me_dt:hover {
    @include textBorder($borderIcon: url('/Text-borders/wet-leaf.png'));
  }

  #company_dt:hover{
    @include textBorder(linear-gradient(90deg, red, blue), $slice: 1, $repeat: auto)
  }

  #school_dt:hover{
        // fds
  }



  h1 {
    text-align: center;
    font-family: "Times New Roman", Times, serif;
    font-size: 2em;
    background: -webkit-linear-gradient(#e6912f, #e6442f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
