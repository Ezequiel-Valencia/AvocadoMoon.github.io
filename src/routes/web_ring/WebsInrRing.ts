export type WebRing = {
    imgLocation: string;
    webTitle: string;
    description: string;
    opinion: string;
    url: string;
}

const imgLocalPrefix = "/web_ring/web_images"


export const webRing: { [key: string]: WebRing[] } =
{
    "Tech/Tools": [
        {
            imgLocation: imgLocalPrefix + "/eff_cover_tracks.png",
            webTitle: "Cover Your Tracks EFF",
            description: `A website that lets you determine how trackers view your browser
            and gives you information on how to mitigate being tracked.`,
            opinion: `Useful tool for wheneve I download a new browser.`,
            url: "https://coveryourtracks.eff.org/"
        },
        {
            imgLocation: imgLocalPrefix + "/overthewire.png",
            webTitle: "Over The Wire Wargames",
            description: `Tool to learn and practice cybersecurity concepts in fun games.`,
            opinion: `Great website to play around in and refresh myself sometimes of fundimental cybersecurity concepts.`,
            url: "https://overthewire.org/wargames/"
        },
        {
            imgLocation: imgLocalPrefix + "/networkenc.webp",
            webTitle: "Network Encyclopedia",
            description: `Guide to the intricate world of computer networking.`,
            opinion: `Sometimes I forget the exact definitions of network terms, and this always helps to clarify for me.`,
            url: "https://networkencyclopedia.com/"
        },
        {
            imgLocation: imgLocalPrefix + "/plantuml.png",
            webTitle: "PlantUML",
            description: `Open source tool for creating diagrams.`,
            opinion: `Great tool to make complex digrams with code.`,
            url: "https://plantuml.com/"
        },
    ],
    "Entertainment/Art": [
        {
            imgLocation: imgLocalPrefix + "/neocities.png",
            webTitle: "NeoCities",
            description: `A network of static websites that focus on style.`,
            opinion: `Fun place to find some interesting, strange, and creative websites.`,
            url: "https://neocities.org/"
        },
        {
            imgLocation: imgLocalPrefix + "/itchio.webp",
            webTitle: "Itch IO",
            description: `Market to simply find, download, and distribute indie games online.`,
            opinion: `The games sold on this site are less than regular games and supports developers more while being as fun.`,
            url: "https://itch.io/"
        },
        {
            imgLocation: imgLocalPrefix + "/electricZineMaker.png",
            webTitle: "Electric Zine Maker",
            description: `Easily make some interesting collages.`,
            opinion: `Not something I visit often but when I do it's always time consuming.`,
            url: "https://unicornycopia.com/ezm/"
        },
    ]
}




