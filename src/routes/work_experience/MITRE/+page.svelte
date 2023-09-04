<script lang="ts">
    import Explayout from "../explayout.svelte";
    import { experiences, prefix } from "../experiences";
</script>



<Explayout experience={experiences.mitre} 
imgSrc={""} 
description={[`At the non-profit organization MITRE, I was put on the project for post-quantum identity-based encryption, proving functional equivalence, and embedded systems CTF. For PQ IBE papers “How to Use a Short Basis: Trapdoors for Hard Lattices and New Cryptographic Constructions”, “Making NTRU as Secure as Worst-Case Problems over Ideal Lattices”, and “Efficient Identity-Based Encryption over NTRU Lattices" were read. These readings lead to understanding PQ IBE, used in integrating it within open-source email encryption services such as GnuPG. Most of these open-source applications use the library libgcrypt for their cryptographic functionality. Integration of IBE required a new public key functionality in libgcrypt and GnuPG because of its unique key distribution properties. Unfortunately, there was not enough time within my internship to fully implement IBE, although a road map was created on how to do it.`,
`Another project had me proving equivalence between functions written within C and Cryptol utilizing the tools COQ, Heapster, and SAW. For fixed-sized input, SAW is used, and N-sized input Heapster is used to convert C and Cryptol into COQ, then within COQ equivalence can be proven.`,
`Finally, the CTF lasted five weeks and centralized upon key FOBs and their receiver. A public key protocol had to be created so that FOBs can be initiated with the receiver, and then have a symmetric key used for general communication involving unlocking and locking the hypothetical car. There were difficulties due to the limitation of the hardware having to manage memory and processing power. Overall my team got second place.`,
]} 
prefix={prefix}
takeaway={"How to learn from failure, application of high level math to cybersecurity systems, and the importance of mental health for work."}>
</Explayout>