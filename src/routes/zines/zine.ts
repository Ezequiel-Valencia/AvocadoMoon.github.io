
export const dirPrefix = "/zines"

export interface zineMetaData {
    zineCover: string; 
    title: string; 
    name: string; 
    description: string; 
    redirect: string; 
    backgroundImage: string;
    pdfPath: string;
}

const thirdSpaceDir = dirPrefix + "/Third Space"
const pandoraDir = dirPrefix + "/pandora"
const emotionlessDir = dirPrefix + "/emotionless"
const pumpkinRaceDir = dirPrefix + "/pumpkin race"

export const zines: {[key: string]: zineMetaData} = {
    pumpkinRace:
    {
        zineCover: pumpkinRaceDir + "/Fall Zine.png",
        title: "How to Race A Pumpkin",
        name: "pumpkin race",
        description: `Tips on how to race a pumpkin based on first hand experience.`,
        redirect: pumpkinRaceDir,
        backgroundImage: pumpkinRaceDir + "/back.jpg",
        pdfPath: pumpkinRaceDir + "/Fall Zine.pdf"
    },
    thirdSpace:
    {
        zineCover: thirdSpaceDir + "/Third Space.webp",
        title: "Encounters of the Third Space",
        name: "Third Space",
        description: `Analysis of the current loneliness epidemic 
        within America, land use, and predatory technology enriched by introspection.`,
        redirect: thirdSpaceDir,
        backgroundImage: "/zines/pandora/back.jpg",
        pdfPath: thirdSpaceDir + "/Third Space.pdf"
    },
    pandora:
    {
        zineCover: pandoraDir + "/Pandora_Poster.webp",
        title: "Pandoras Deus Ex Machina",
        name: "pandora",
        description: "A Zine I started and may never finish focused upon tech and it's affects on different community's.",
        redirect: pandoraDir,
        backgroundImage: pandoraDir + "/back.jpg",
        pdfPath: pandoraDir + "/pandora.pdf"
    },
    emotionless:
    {
        zineCover: emotionlessDir + "/Expressionless Cover.webp",
        title: "Expressionless",
        name: "emotionless",
        description: `My first ever self made Zine. 
        It's unstructured and has a loose theme of expressing emotions and growth. 
        Deals with the problems that arise after graduation.`,
        redirect: emotionlessDir,
        backgroundImage: emotionlessDir + "/back.jpg",
        pdfPath: emotionlessDir + "/emotionless.pdf"
    }
}