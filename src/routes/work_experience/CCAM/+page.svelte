<script lang="ts">
    import Explayout from "../explayout.svelte";
    import { experiences } from "../experiences";
</script>



<Explayout experience={experiences.ccam} 
imgSrc={"/work_experience/vcell.gif"} 
description={[
    `I am currently working at the Center for Cell Analysis and Modeling with UConn, where my responsibilities range from helping manage the K8 cluster used for the VCell application to leading my own open-source project that enables microscopists to integrate their simulation results into a third-party tool.`, 
    `With the wide variety of tasks I handle in my current role, the only thing that allows me to transition seamlessly between them is a strong fundamental understanding of computer science. This includes concepts such as threads, state management, communication protocols, compilers, operating systems, probability spaces, group theory, data integrity and precision, data accuracy, concise communication, data structures, algorithms, and access management.
By cementing these theoretical concepts, I require an initial phase to understand the problem at hand, but once that foundation is set, the nuances of the problem naturally categorize themselves into one or more of these areas—making complex challenges more manageable.`,
`With this mindset, I have successfully accomplished the goals highlighted in my `]} 
takeaway={"No matter the task, having an understanding of the theoretical behind the application will allow easy transfer of skills. Also testing is an amazing guard rail when developing on several projects."}>
</Explayout>