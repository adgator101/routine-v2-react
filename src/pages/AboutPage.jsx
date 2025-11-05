import { Github, Linkedin, Mail } from "lucide-react";
import React from "react";

const AboutPage = () => {
  const teamMembers = [
    {
      1: {
        name: "Aaryan Dhakal",
        role: "Frontend Developer",
        pfp: "https://media.discordapp.net/attachments/1351523306058027048/1377326531809906859/1733460356952.png?ex=68388eca&is=68373d4a&hm=cb2fc6ce88c69842301f73dbaaf56c599e7bb1471be8df689fc79e80ca93f0c0&=",
      },
      2: {
        name: "Aaditya Thapa",
        role: "Frontend Developer",
        pfp: "https://cdn.discordapp.com/attachments/1351523306058027048/1377326449962254366/1746440524042.png?ex=68388eb7&is=68373d37&hm=2844d96b27cb6a81c6414581cbd1e26653435cdc628b25b6e7c85efcf471e400&",
      },
      3: {
        name: "Aayush Budhathoki",
        role: "Backend Developer",
        pfp: "https://cdn.discordapp.com/attachments/1351523306058027048/1377326374670434314/1744842012826.png?ex=68388ea5&is=68373d25&hm=915b1ce3bd4d972e33f35c75310eba2c2660ddc3182a1a8f88d7655f4d284ab4&",
      },
      4: {
        name: "Ganesh Dahal",
        role: "UI/UX Designer",
        pfp: "https://cdn.discordapp.com/attachments/1351523306058027048/1377326489703284766/1734780813691.png?ex=68388ec0&is=68373d40&hm=a6e93a67fc61d4c9b08485e42e18b2bfe6339e1f9c604b444d14c9d85196bb8b&",
      },
    },
  ];

  return (
    <div className="container pb-24 pt-10 sm:pb-10 font-manrope cursor-default">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl font-bold text-dark dark:text-white">
            About Us
          </h1>
          <p className="mx-auto max-w-2xl font-manrope text-xl text-gray-600 dark:text-gray-300">
            Building tools to make student life easier
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-10">
        <img src="https://media.licdn.com/dms/image/v2/D4E03AQH42fSaSW6F2A/profile-displayphoto-shrink_800_800/B4EZZAsC5iHMAc-/0/1744842012826?e=1753920000&v=beta&t=urH4eVVCOJgKnSdOPl2FIb4YS8vZfpZsbQTf34fLAcI" alt="" />
          {Object.values(teamMembers[0]).map((member, index) => (
            <div key={index} className="text-center justify-items-center space-y-7 p-10 rounded-2xl shadow-[0_2px_8px_rgba(0,_0,_0,_0.1)] hover:shadow-[0_4px_16px_rgba(0,_0,_0,_0.1)] transition-[shadow_transform] [background:linear-gradient(180deg,_#ffffff_0%,_#f8fafc_60%,_#ffe0ec_100%)] hover:-translate-y-1">
              <div className={`relative h-28 w-28 rounded-full border-b-4 border-r-4 border-[#F84178] bg-cover shadow-md before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:animate-pulse before:rounded-full before:transition-shadow before:hover:shadow-[0_0_36px_#F84178]`} style={{ backgroundImage: `url(${member.pfp || "https://wallpapers.com/images/high/confused-patrick-random-pfp-x63wp9vs43cem64s.webp"})` }}></div>
              
              <p className="text-4xl font-semibold">{member.name}</p>
              <p className="font-medium text-xl text-gray-500">{member.role}</p>
              <div className="socials flex items-center justify-center gap-7">
                <a
                  target="_blank"
                  href=""
                  className="cursor-pointer rounded-full bg-red-600 p-2 shadow-[0_4px_8px_#dc2626] transition-[shadow_transform] hover:rotate-12 hover:scale-105 hover:shadow-[0_4px_16px_#dc2626] active:scale-95"
                >
                  <Mail className="text-white" />
                </a>
                <a
                  target="_blank"
                  href=""
                  className="cursor-pointer rounded-full bg-sky-600 p-2 shadow-[0_4px_8px_#0284c7] transition-[shadow_transform] hover:rotate-12 hover:scale-105 hover:shadow-[0_4px_16px_#0284c7] active:scale-95"
                >
                  <Linkedin className="text-white" />
                </a>
                <a
                  target="_blank"
                  href=""
                  className="cursor-pointer rounded-full bg-black p-2 shadow-[0_4px_8px_#000] transition-[shadow_transform] hover:rotate-12 hover:scale-105 hover:shadow-[0_4px_16px_#000] active:scale-95"
                >
                  <Github className="text-white" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;
