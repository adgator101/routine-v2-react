import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";

const teamMembers = [
  {
    name: "Aaryan Dhakal",
    role: "Frontend Developer",
    pfp: "https://media.discordapp.net/attachments/1351523306058027048/1377326531809906859/1733460356952.png",
    socials: {
      mail: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Aaditya Thapa",
    role: "Frontend Developer",
    pfp: "https://cdn.discordapp.com/attachments/1351523306058027048/1377326449962254366/1746440524042.png",
    socials: {
      mail: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Aayush Budhathoki",
    role: "Backend Developer",
    pfp: "https://cdn.discordapp.com/attachments/1351523306058027048/1377326374670434314/1744842012826.png",
    socials: {
      mail: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Ganesh Dahal",
    role: "UI/UX Designer",
    pfp: "https://cdn.discordapp.com/attachments/1351523306058027048/1377326489703284766/1734780813691.png",
    socials: {
      mail: "#",
      linkedin: "#",
      github: "#",
    },
  },
];

const SocialIcon = ({ href, children, bg, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`${bg} rounded-full p-2 text-white transition-all hover:scale-110`}
  >
    {children}
  </a>
);

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-16 font-manrope dark:bg-gray-900 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Meet the Team
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            A team of passionate developers crafting tools for a better student
            experience.
          </p>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-md transition-all hover:shadow-xl dark:bg-gray-800"
            >
              <div
                className="mb-5 h-28 w-28 rounded-full border-4 border-pink-500 bg-cover bg-center shadow-lg"
                style={{ backgroundImage: `url(${member.pfp})` }}
                title={member.name}
              />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {member.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{member.role}</p>

              <div className="mt-5 flex gap-4">
                <SocialIcon
                  href={member.socials.mail}
                  bg="bg-red-500"
                  label="Email"
                >
                  <Mail size={18} />
                </SocialIcon>
                <SocialIcon
                  href={member.socials.linkedin}
                  bg="bg-sky-600"
                  label="LinkedIn"
                >
                  <Linkedin size={18} />
                </SocialIcon>
                <SocialIcon
                  href={member.socials.github}
                  bg="bg-black"
                  label="GitHub"
                >
                  <Github size={18} />
                </SocialIcon>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
