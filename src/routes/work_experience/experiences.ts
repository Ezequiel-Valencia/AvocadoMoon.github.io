import { csWorkTechnologies } from '../../globals';
import { writable } from 'svelte/store';

export const percentLoaded = writable(0); // -1 means skip

export type Technology = { icon: string; name: string; description: string };

export type WorkExperience = {
  company: string;
  jobTitle: string;
  technologies: Technology[];
  description: string;
  time: string;
  redirect: string;
};

export const experiencesSong = 'https://files.catbox.moe/iclebz.mp3';

const prefix = '/work_experience';

export const experiences: { [key: string]: WorkExperience } = {
  ccam: {
    company: 'Center For Cell Analysis and Modeling (UConn Health)',
    technologies: [
      csWorkTechnologies.Java,
      csWorkTechnologies.Quarkus,
      csWorkTechnologies.K8,
      csWorkTechnologies.OpenID,
      csWorkTechnologies.Docker,
      csWorkTechnologies.Python,
      csWorkTechnologies.SQL,
      csWorkTechnologies.Fiji,
      csWorkTechnologies.Linux,
      csWorkTechnologies.S3,
    ],
    jobTitle: 'Full Stack Software Developer',
    description:
      'Custom frontend Java applications, backends to support them, migration of legacy object serialization to RESTful APIs, test suites for business logic, and an updated user management system.',
    time: 'July 2023 - Now',
    redirect: prefix + '/CCAM',
  },
  ta: {
    company: 'University of Connecticut',
    technologies: [
      csWorkTechnologies.Python,
      csWorkTechnologies.Django,
      csWorkTechnologies.HTML,
      csWorkTechnologies.CSS,
    ],
    jobTitle: 'Cybersecurity Teaching Assistant',
    description:
      'Made an automated grading system and helped teach students about cybersecurity practices. Also developed web applications for web security labs.',
    time: 'August 2022 - May 2023',
    redirect: prefix + '/TA',
  },
  mitre: {
    company: 'MITRE',
    jobTitle: 'Research Assistant',
    technologies: [csWorkTechnologies.Coq, csWorkTechnologies.C],
    description:
      'Helped prove functional equivalence between C and Cryptol functions, researched post-quantum identity-based encryption, and competed in an embedded systems CTF.',
    time: 'May 2022 - August 2022',
    redirect: prefix + '/MITRE',
  },
  ra: {
    company: 'University of Connecticut',
    jobTitle: 'Resident Assistant',
    technologies: [],
    description:
      'Was in charge of the residents on my floor, handling violent, mundane, janitorial, and mental health crisis situations.',
    time: 'August 2021 - May 2022',
    redirect: prefix + '/RA',
  },
  qcdx: {
    company: 'QCDx',
    technologies: [csWorkTechnologies.Java, csWorkTechnologies.Fiji],
    jobTitle: 'Lead Developer',
    description:
      "Developed two ImageJ plugins, one to control the microscope used by the company's product and another for analyzing the images it produced.",
    time: 'May 2021 - July 2021',
    redirect: prefix + '/QCDx',
  },
};
