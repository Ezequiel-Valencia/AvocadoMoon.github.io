<script lang="ts">
    import Explayout from "../explayout.svelte";
    import { experiences } from "../experiences";
</script>



<Explayout experience={experiences.ta} 
imgSrc={"/work_experience/Uconn_logo.png"} 
description={[`As a teacher assistant, I help teach the students, develop the labs, and create administrative tools. Every TA is responsible for teaching students the topics of ransomware, cryptography, web security, phishing, network-level attacks, and malware. In addition to teaching these topics, I developed two labs for the course, phishing, and general web security.`,
    `The first lab's purpose was to teach students about the dangers of phishing sites, automated password testing scripts, and how to develop websites using Javascript, HTML, CSS, and Flask. I developed a fake banking website vulnerable to scripts that test users' credentials. Students point out the site's vulnerabilities and build a phishing website that imitates the banking site.`,
    `The second lab teaches students about cross-site request forgery (CSRF) and cross-site scripting (XSS). A similar banking site is used, except now it is vulnerable to CSRF and XSS. The banking website is hosted within an internal network so port forwarding with a VPN connection was taught to the students which allows access to the website from external networks. In addition  I’ve developed an automated grading website that utilizes a RESTful approach for server-client communication. Both of these sites implement CORS, CSRF tokens, Jinja2,  and linux apache tested with Postman for any API's.`,
]} 
takeaway={"How to teach students cybersecurity topics, lead web development projects, and work in a long term collaborative team."}>
</Explayout>