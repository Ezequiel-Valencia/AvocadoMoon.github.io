const dirPrefix = "/about_me";

type Activity = {
    name: string;
    description: string;
    image: string;
  };

export const hobbies: { category: string; active: boolean; activity: Activity[] }[] = [
    {
      category: "Athletic",
      active: true,
      activity: [
        {
          name: "Biking",
          description:
            "Was in multiple biking clubs, and used to bike every day. At one point I even tried to form my own small biking unit. Now I try to bike every day, and try to find biking organizations outside of UConn.",
          image: dirPrefix + "/bike-trip.jpg",
        },
        {
          name: "Rock Climbing",
          description:
            "I love to climb anything such as walls, trees, boulders, and more. I used to frequent climbing gyms,  however,  due to time constraints my climbing is regulated only to trees.",
          image: dirPrefix + "/cowboy-climb.jpg",
        },
        {
          name: "Skydiving",
          description:  
            "I've skydived once, and it'd do it again. At first,  when falling to earth at terminal velocity it can be stressful, but after a minute it becomes relaxing due to the beautiful view and weightless feeling.",
          image: dirPrefix + "/sky-dive.jpg",
        },
        {
          name: "Krav Maga",
          description:
          "For 1.5 years I occasionally attended a Krav Maga self-defense class. The classes were always fun since the knowledge I learned made me feel more capable and diligent. I still enjoy sparing every once and a while with the hope that it'd start attending lessons again in the future.",
          image: dirPrefix + "/krav_maga.jpg",
        },
        {
          name: "Weight Lifting",
          description:
          "I enjoy weight lifting and pushing the limits of what weights I can exercise with. It's very rewarding since I know my strength gained in the gym lets me do other physical activities with more confidence.",
          image: dirPrefix + "/weight lift.jpg",
        },
      ],
    },
    {
      category: "Art",
      active: false,
      activity: [
        {
          name: "Zine",
          description:
          "Attended clubs at UConn focused on making magazines and collages. I love making my magazines, and I still try to make magazines :)",
          image: dirPrefix + "/Expressionless Cover.png",
        },
        {
          name: "Radio Show",
          description:
          "UConn has a radio station where students can slot an hour to be a DJ. When I still attended the university I found it a lot of fun to have my radio show, talk, and play music.",
          image: dirPrefix + "/radio-show.jpg",
        },
        {
          name: "Breakdancing",
          description:
          "Been breakdancing now for two years, and try to continue break dancing. It's hard to find both time and a place to breakdance, but I still try. In the past, I've won a casual, informal dancing competition, and that was the peak of my dancing :v.",
          image: dirPrefix + "/bboy.jpg",
        },
        {
          name: "Swing dancing",
          description:
          "Before I did breakdancing, I spent six months or so dancing to jazz music and enjoyed it, although I found it difficult due to its structured nature.",
          image: dirPrefix + "/swing-dancing.jpg",
        },
        {
          name: "Saxophone",
          description:
            "Played saxophone since elementary school and enjoy it. I don't play as much as I used to.",
          image: dirPrefix + "/sax.jpg",
        },
      ],
    },
    {
      category: "Environment/Agriculture",
      active: false,
      activity: [
        {
          name: "Beekeeping",
          description:
          "For a year I was attending bee club, just learning the theory of beekeeping, then in the last month I attended, I finally kept some bees. I love bees, and managing them is rewarding, but it takes too much time for me right now so I don't do it for now.",
          image: dirPrefix + "/bees.jpg",
        },
        {
          name: "Eco Husky",
          description:
          "An organization at UConn that promotes green activities in life and for the campus to be more green. I still try to support organizations that try to make the world a more environmentally friendly place now that I've graduated college.",
          image: dirPrefix + "/eco.jpg",
        },
      ],
    }
  ];