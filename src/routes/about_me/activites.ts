const dirPrefix = '/about_me';

type Activity = {
  name: string;
  description: string;
  image: string;
};

export const hobbies: { category: string; active: boolean; activity: Activity[] }[] = [
  {
    category: 'Athletic',
    active: true,
    activity: [
      {
        name: 'Biking',
        description:
          'Was in multiple biking clubs, and used to bike every day. At one point I even tried to form my own small biking group. Now I still try to bike every day, and look for biking organizations outside of UConn.',
        image: dirPrefix + '/bike-trip.jpg',
      },
      {
        name: 'Rock Climbing',
        description:
          'I love to climb anything such as walls, trees, boulders, and more. I used to frequent climbing gyms, however, due to time constraints my climbing is relegated to trees.',
        image: dirPrefix + '/cowboy-climb.jpg',
      },
      {
        name: 'Skydiving',
        description:
          "I've skydived once, and I'd do it again. At first, when falling to earth at terminal velocity it can be stressful, but after a minute it becomes relaxing due to the beautiful view and weightless feeling.",
        image: dirPrefix + '/sky-dive.jpg',
      },
      {
        name: 'Krav Maga',
        description:
          'For 1.5 years I occasionally attended a Krav Maga self-defense class. The classes were always fun since the knowledge I learned made me feel more capable and diligent. I still enjoy sparring every once in a while, and hope to start attending lessons again in the future.',
        image: dirPrefix + '/krav_maga.jpg',
      },
      {
        name: 'Weight Lifting',
        description:
          "I enjoy weight lifting and pushing the limits of how much I can lift. It's very rewarding since I know my strength gained in the gym lets me do other physical activities with more confidence.",
        image: dirPrefix + '/weight lift.jpg',
      },
    ],
  },
  {
    category: 'Art',
    active: false,
    activity: [
      {
        name: 'Zine',
        description:
          'Attended clubs at UConn focused on making magazines and collages. I love making my own magazines, and I still make them when I can :)',
        image: dirPrefix + '/Expressionless Cover.png',
      },
      {
        name: 'Radio Show',
        description:
          'UConn has a radio station where students can slot an hour to be a DJ. While I attended the university, I had a lot of fun hosting my own radio show, talking, and playing music.',
        image: dirPrefix + '/radio-show.jpg',
      },
      {
        name: 'Breakdancing',
        description:
          "I've been breakdancing for two years, and I'm trying to keep it up. It's hard to find both time and a place to breakdance, but I still try. In the past, I've won a casual, informal dancing competition, and that was the peak of my dancing :v.",
        image: dirPrefix + '/bboy.jpg',
      },
      {
        name: 'Swing dancing',
        description:
          'Before I did breakdancing, I spent six months or so dancing to jazz music and enjoyed it, although I found it difficult due to its structured nature.',
        image: dirPrefix + '/swing-dancing.jpg',
      },
      {
        name: 'Saxophone',
        description:
          "I've played saxophone since elementary school and still enjoy it. I don't play as much as I used to.",
        image: dirPrefix + '/sax.jpg',
      },
    ],
  },
  {
    category: 'Environment/Agriculture',
    active: false,
    activity: [
      {
        name: 'Wood Cutting',
        description: `I have been helping my father cut wood for our fireplace since I was a child. I spent summers arriving at sites where large trees had recently been cut, taking the rolls of lumber into my family truck, and cutting them in my backyard to *cut* the electric bill in the winter. Continuing the tradition as my father grows older.`,
        image: dirPrefix + '/wood-cutting.webp',
      },
      {
        name: 'Hiking/Camping',
        description:
          'My first backpacking trip was at the age of 12 when I decided to hike 50 miles in one week with my scout troop, carrying a 30-pound pack—one-third of my body weight. On the first day, half of my fellow Boy Scouts left early, I rolled my ankle, and by day two, the trip was canceled. Despite this less-than-stellar first experience, I still enjoy camping and hiking today—though in moderation and with significantly more preparation.',
        image: dirPrefix + '/camping.webp',
      },
      {
        name: 'Beekeeping',
        description:
          'For a year I attended a bee club, learning the theory of beekeeping, and in my last month there I finally kept some bees. I love bees, and managing them is rewarding, but it takes more time than I have right now.',
        image: dirPrefix + '/bees.jpg',
      },
      {
        name: 'Eco Husky',
        description:
          "An organization at UConn that promotes green habits and pushes for a more sustainable campus. I still try to support organizations that try to make the world a more environmentally friendly place now that I've graduated college.",
        image: dirPrefix + '/eco.jpg',
      },
    ],
  },
];
