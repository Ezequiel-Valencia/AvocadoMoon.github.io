<script lang="ts">
  const experiences = [
    {
      company: "OnLine-Systems/CCAM",
      jobTitle: "Research Assistance",
      description: "I help lead the integration of VCell sim data with ImageJ. Developing plugins for ImageJ, setting up tech infrastructure, and devlop additional software.",
      time: "July 2023 - Now",
    },
    {
      company: "University of Connecticut",
      jobTitle: "Cybersecurity TA",
      description: "Made an automated grading system and helped teach students about cybersecurity practices. Also developed web applications for web security labs.",
      time: "August 2022 - May 2023",
    },
    {
      company: "Mitre",
      jobTitle: "Research Assistant",
      description: "Helped with proving functional equivelance between different functions, research post quantum IB encryption, and participated in a CTF.",
      time: "May 2022 - August 2022",
    },
    {
      company: "University of Connecticut",
      jobTitle: "RA",
      description: "Was in charge of the residents on my floor dealing with violent, mundane, janitorial, and mental health crisis siutations.",
      time: "August 2021 - May 2022",
    },
    {
      company: "QCDx",
      jobTitle: "Lead Developer",
      description: "Developed two ImageJ plugins, one to control the microscope that this companies product used and another for analyzing the results of this microscope.",
      time: "May 2021 - July 2021",
    },
  ];
</script>

<div id="wrapper-div">
  <h1 id="world">World</h1>
  <h2>My Work Experience</h2>
  {#each experiences as experience, index}
    <div class="spacer">
      <div class="experience-div">
        <p class="job-time">{experience.time}</p>
        <div class="text-div">
          <h3 class="company-name text">{experience.company}</h3>
          <h5 class="job-title text">{experience.jobTitle}</h5>
          <p class="job-description text">{experience.description}</p>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  #wrapper-div {
    margin: 0;
    padding: 0;
    position: absolute;
    background-color: black;
    width: 100vw;
    text-align: center;
  }

  #world {
    color: white;
    padding-bottom: 50%;
    font-size: 500%;
  }

  h2 {
    color: white;
  }
  .spacer {
    padding: 5%;
  }

  .experience-div {
    margin: auto;
    padding: 2%;
    border-style: dotted;
    border-color: white;
    width: 80vw;
    display: flex;
    max-width: 1000px;
  }

  .text-div{
    text-align: center;
    width: 100%;
  }

  .text {
    $margin-percent: 10%;
    color: white;
    margin-left: $margin-percent;
    margin-right: $margin-percent;
  }

  .job-time {
    color: white;
    writing-mode: vertical-lr;
  }
</style>
