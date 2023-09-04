export type WorkExperience = {
    company: string;
    jobTitle: string;
    description: string;
    time: string;
    redirect: string;
}

export const experiencesSong = "/Audio/Channel-Songs/SABBATH.mp3"

export const prefix = "/work_experience"

export const experiences: {[key: string]: WorkExperience} = {
    ccam: {
        company: "OnLine-Systems/CCAM",
        jobTitle: "Research Assistance",
        description: "I help lead the integration of VCell sim data with ImageJ. Developing plugins for ImageJ, setting up tech infrastructure, and devlop additional software.",
        time: "July 2023 - Now",
        redirect: prefix + "/CCAM"
    },
    ta: {
        company: "University of Connecticut",
        jobTitle: "Cybersecurity Teaching Assitant",
        description: "Made an automated grading system and helped teach students about cybersecurity practices. Also developed web applications for web security labs.",
        time: "August 2022 - May 2023",
        redirect: prefix + "/TA"
    },
    mitre: {
        company: "Mitre",
        jobTitle: "Research Assistant",
        description: "Helped with proving functional equivelance between different functions, research post quantum IB encryption, and participated in a CTF.",
        time: "May 2022 - August 2022",
        redirect: prefix + "/MITRE"
    },
    ra: {
        company: "University of Connecticut",
        jobTitle: "Residential Assistant",
        description: "Was in charge of the residents on my floor dealing with violent, mundane, janitorial, and mental health crisis siutations.",
        time: "August 2021 - May 2022",
        redirect: prefix + "/RA"
    },
    qcdx: {
        company: "QCDx",
        jobTitle: "Lead Developer",
        description: "Developed two ImageJ plugins, one to control the microscope that this companies product used and another for analyzing the results of this microscope.",
        time: "May 2021 - July 2021",
        redirect: prefix + "/QCDx"
    },
};