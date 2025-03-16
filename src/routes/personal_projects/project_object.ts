import { csWorkTechnologies } from "../../globals";

export type Projects = {
    name: string;
    year: string;
    description: string;
    technologies: any[];
}

export const projects: { [key: string]: Projects[] } = {
    "Projects Involving Frontend, BackEnd or Both": [
        {
            name: "Three-mix",
            year: "Current",
            description: `Discover new music everyday. Curators submit a set of three songs, and from the entire set
            of songs one submission is chosen randomly to be voted upon by everyone. 
            User management system is hand made, with cybersecurity best practices for authentication
            and session management
            taken into account. Backend is running on my homelab within the K8 cluster.`,
            technologies: [csWorkTechnologies.CSS, csWorkTechnologies.HTML, csWorkTechnologies.TypeScript, csWorkTechnologies.Svelte, csWorkTechnologies.SQL, csWorkTechnologies.Go, csWorkTechnologies.K8]
        },
        {
            name: "Personal Website",
            year: "Current",
            description: `My personal website where I experiment with different front end development techniques using typescript, HTML, CSS, 
            and Svelte. 
            Each channel is it's own containerized style making that experimentation easier.`,
            technologies: [csWorkTechnologies.CSS, csWorkTechnologies.HTML, csWorkTechnologies.TypeScript, csWorkTechnologies.Svelte]
        },
    ],
    "Application Management, Security, Observability, and Network Control.": [
        {
            name: "Home Server",
            year: "2023 - Forever (Always Improving)",
            description: `I've repurposed old computers and built new ones to create a data center with Proxmox as the unifying type 1 hypervisor, placed within a separate VLAN. 
            Ansible is being used to maintain OS state, firewalls, install new K3s nodes, deploy docker containers, VPNs, and perform general server maintenance.
            For additional security zero trust tunnels, Istio service mesh for mTLS communication within the cluster, application level ACL for segmentation, and Cilium to monitor all service communication from its eBPF state is implemented.
            With this setup I host a public library, media center, and self-developed applications using a multi-node K8 cluster.
            To keep up-to-date with everything that I happens on my servers I use Grafana dashboards with metrics aggregator Prometheus and log scraper Loki with promtail.
            Storage solution is AWS S3 for cold storage, Longhorn for application storage, Minio S3 for application backups, and CIFS remote storage on TrueNas for VM backups.
            And some other misc. implementations are the internal DNS, remote storage, router level firewall, intrusion detection system, and intrusion prevention system.
            `,
            technologies: [csWorkTechnologies.Proxmox, csWorkTechnologies.Ansible, csWorkTechnologies.Docker, csWorkTechnologies.Consul, csWorkTechnologies.Grafana, csWorkTechnologies.Istio,
            csWorkTechnologies.K8, csWorkTechnologies.Loki, csWorkTechnologies.Prometheus, csWorkTechnologies.TrueNas, csWorkTechnologies.Ubiquity, 
            csWorkTechnologies.Terraform]
        },
        {
            name: "CTGrassRoots",
            year: "2024",
            description: `An instance of the decentralized software Mobilizon which is used to 
            display local events within CT. I currently manage my own DB and Mailserver to have 
            the Mobilizon instance function, in addition to specialized logging. Everything is setup
            using Ansible and Bash scripts allowing for myself to quickly construct and maintain any 
            new instances I choose to create. In addition to the Mobilizon instance there is a magazine
            I created with thorough research about third spaces, and the loneliness epidemic within America.
            All of the art, writing, and research was done by me wih editorial help from friends.`,
            technologies: [csWorkTechnologies.Ansible, csWorkTechnologies.Docker]
        }

    ],
    "Exploiting granular weaknesses, social engineering, and protecting against low level attack vectors.": [
        {
            name: "Understanding Technical Intrigue and Knowledge: Grad Research Project",
            year: "2023",
            description: `Cybersecurity is a vast topic with many areas that can be
            studied which are independent of each other. Due to the
            depth of this topic, people may read only upon high level
            articles, and not have the understanding as to respond to
            what they've read with action. Me and another student tried to analyze
            as to what factors may lead to a deeper understanding of
            technology, interest in technology, and confidence in the
            knowledge one has in technology.`,
            technologies: [csWorkTechnologies.GoogleScholar, csWorkTechnologies.LaTeX]
        },
        {
            name: "Encrypted Cat Exchange",
            year: "2021",
            description: `Using knowledge from an intro to network cryptography class a
            secure and authentic connection is made between two parties.
            The connection made can be used for messages or files, if the file
            happens to pertain a cat then a ML algorithm should catch the cat
            and notify the recipient. Works partially.`,
            technologies: [csWorkTechnologies.Python]
        }
    ],
    "All the software projects that don't neatly fit into a category." :[
        {
            name: "Event Bot",
            year: "2024",
            description: `Event scraping bot written in python made to unbind posted events from any single platform, cleaning the information that it receives to prevent malicious automated postings.
            It contains a scraper, publisher paradigm supporting Google Calendar, ICal, custom JSON file format, and Mobilizon. But with it's modular design can support significantly more scrapers and publishers, 
            so long the generic interfaces are properly implemented. \n
            Features a separate repository of custom data structures used as submissions to the scrapping engine. Everything well documented on a wiki so that end users can create the submission jobs themselves for their
            unique use cases! \n
            
            Lastly this uses a SQLite database to maintain state, and allow for event scrapping to be idempotent.
            `,
            technologies: [csWorkTechnologies.Docker, csWorkTechnologies.Python, csWorkTechnologies.SQL, csWorkTechnologies.GraphQL]
        },
        {
            name: "Senior Design",
            year: "2023",
            description: `Managing a spatial database of shape files with PostgreSQL extension PostGIS, and performing
            statistical analysis upon the location information. Visualizing information within the database with QGIS, and hosted on a website.`,
            technologies: [csWorkTechnologies.SQL]
        },
        {
            name: "Network of Deceit: Grad Research Project",
            year: "2022",
            description: `Automatic detection of stereotypes within Twitter, using interdisciplinary tactics incorporating sociology, psychology, and computer science.
            NLP utilizing Google's pre-trained word embedding model BERT, and a Feed Forward Neural Network layer for classification, all done with PyTorch.
            In addition to all this I wrote a white paper discussing the research I conducted.
            `,
            technologies: [csWorkTechnologies.Python, csWorkTechnologies.GoogleScholar, csWorkTechnologies.LaTeX]
        },
        {
            name: "Secret Santa",
            year: "2021",
            description: `Partially random matching algorithm, with automatic messages
            Given an input of questions, importance of questions, and
            percentage of randomness, creates matches with other
            participants. Notifies the participants through automatic email
            messages encrypted with TLS. Running in O(lqp)`,
            technologies: [csWorkTechnologies.Python]
        },
        {
            name: "Best Buy Bot",
            year: "2021",
            description: `Headless Chromium browser using JavaScript puppeteer API.
            Automatic login of best buy, loading desired products web pages
            and scraping information from those pages to determine if items
            where available. If available, a purchase would be automatically
            made.`,
            technologies: [csWorkTechnologies.TypeScript]
        },
        {
            name: "File Recorder",
            year: "2020",
            description: `Searched discord API for information utilizing what was found to
            synthesize an automated message scraper and wrapped it in a
            bot. Implemented a filter and integrated a custom hash table to take
            scraped messages and send a notification if a file is sent twice. Was starting
            to grasp the interactions that occur within the internet which allowed for me to make
            requests to the discord server, but still was mostly clueless.`,
            technologies: [csWorkTechnologies.Python]
        },
        {
            name: "Alfred",
            year: "2020",
            description: `Researched online articles about voice recognition and API's for
            Alfred to tell intent and interact with many different applications.
            Produced a custom hash table for Alfred to tell intent and execute
            commands. Also when making this I didn't know what an API was before and that it was connecting
            to some Google server somewhere, so I thought that the language model was running locally on my
            machine which I find funny to look back on.`,
            technologies: [csWorkTechnologies.Python]
        },
        {
            name: "Room 108",
            year: "2020",
            description: `Visualized a short horror game using Unity Engine and C++ as a
            creative outlet and for others to enjoy. When making this I didn't know what
            object oriented programming was along with other key software development
            concepts so it took me way to long and the code base is a mess. Still a lot of fun
            and a great learning experience.`,
            technologies: [csWorkTechnologies.Python]
        }

    ]

}