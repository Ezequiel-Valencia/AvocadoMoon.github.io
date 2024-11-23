<script lang="ts">
    import Explayout from "../explayout.svelte";
    import { experiences } from "../experiences";
</script>



<Explayout experience={experiences.qcdx} 
imgSrc={"/work_experience/qcdx.jpeg"} 
description={[`I worked for a biotech startup called QCDx that required their microscope to interface with computers. Utilizing Java and the public tools ImageJ and Micro-Manager, I developed an application that can interact with the microscope and an algorithm that scans specimens sequentially. In addition to that application, due to having the extra time I developed an application to analyze the resulting images the microscope produced and modify them so that analysts could save time.`,
]} 
takeaway={"Leading my first company solo project, overcoming road blocks due to lack of knowledge, and developing software for health care purposes."}>
</Explayout>