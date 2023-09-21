export type Projects = {
    name: string;
    year: string;
    description: string;
}

export const projects: { [key: string]: Projects[] } = {
    "Post Grad": [
        {
            name: "Personal Website",
            year: "Current",
            description: `My personal website where I experiment with different front end development techniques. 
            Each channel is it's own containerized (docker reference) style making that experimentation easier.
            Yes, the main page is influenced by the Wii Menu, please Nintendo don't sue me.`
        },
        {
            name: "Home Server",
            year: "Current",
            description: `Multiple Proxmox nodes connected to each other severing as one large graph of computational devices.
            Each node has multiple VM's or containers all using Ubuntu or TrueNas, and have docker containers running within them to 
            perform different tasks. Currently my home lab is used to serve media, keep track my bills, DNS server, and Nextcloud instance.
            I plan on making it accessible outside of my home network and to use SDN instead of my current router that also serves as my access point.`
        }

    ],
    "Grad Class": [
        {
            name: "Understanding Technical Intrigue and Knowledge",
            year: "2023",
            description: `Cybersecurity is a vast topic with many areas that can be
            studied which are independent of each other. Due to the
            depth of this topic, people may read only upon high level
            articles, and not have the understanding as to respond to
            what they've read with action. Me and another student tried to analyze
            as to what factors may lead to a deeper understanding of
            technology, interest in technology, and confidence in the
            knowledge one has in technology.`
        },
        {
            name: "Network of Deceit",
            year: "2022",
            description: `Automatic detection of stereotypes within Twitter, using interdisciplinary tactics incorporating sociology, psychology, and computer science.
            NLP utilizing Google's pre-trained word embedding model BERT, and a Feed Forward Neural Network layer for classification, all done with PyTorch.
            In addition to all this I wrote a white paper discussing the research I conducted.
            `,
        }
    ],
    "Undergrad" :[
        {
            name: "Senior Design",
            year: "2023",
            description: `Managing a spatial database of shape files with PostgreSQL extension PostGIS, and performing
            statistical analysis upon the location information. Visualizing information within the database with QGIS, and hosted on a website.`
        },
        {
            name: "Encrypted Cat Exchange",
            year: "2021",
            description: `Using knowledge from an intro to network cryptography class a
            secure and authentic connection is made between two parties.
            The connection made can be used for messages or files, if the file
            happens to pertain a cat then a ML algorithm will catch the cat
            and notify the recipient.`
        },
        {
            name: "Secret Santa",
            year: "2021",
            description: `Partially random matching algorithm, with automatic messages
            Given an input of questions, importance of questions, and
            percentage of randomness, creates matches with other
            participants. Notifies the participants through automatic email
            messages encrypted with TLS. Running in O(lqp)`
        },
        {
            name: "Best Buy Bot",
            year: "2021",
            description: `Headless Chromium browser using JavaScript puppeteer API.
            Automatic login of best buy, loading desired products web pages
            and scraping information from those pages to determine if items
            where available. If available, a purchase would be automatically
            made.`
        },
        {
            name: "File Recorder",
            year: "2020",
            description: `Searched discord API for information utilizing what was found to
            synthesize an automated message scraper and wrapped it in a
            bot. Implemented a filter and integrated a custom hash table to take
            scraped messages and send a notification if a file is sent twice. Was starting
            to grasp the interactions that occur within the internet which allowed for me to make
            requests to the discord server, but still was mostly clueless.`
        },
        {
            name: "Alfred",
            year: "2020",
            description: `Researched online articles about voice recognition and API's for
            Alfred to tell intent and interact with many different applications.
            Produced a custom hash table for Alfred to tell intent and execute
            commands. Also when making this I didn't know what an API was before and that it was connecting
            to some Google server somewhere, so I thought that the language model was running locally on my
            machine which I find funny to look back on.`
        },
        {
            name: "Room 108",
            year: "2020",
            description: `Visualized a short horror game using Unity Engine and C++ as a
            creative outlet and for others to enjoy. When making this I didn't know what
            object oriented programming was along with other key software development
            concepts so it took me way to long and the code base is a mess. Still a lot of fun
            and a great learning experience.`
        }

    ]

}