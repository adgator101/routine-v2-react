import { Github, Linkedin, Mail, BookOpen, Users, Zap, Shield } from "lucide-react";

const fallbackProfileImage = "/icon.png";

const teamMembers = [
  {
    name: "Aaryan Dhakal",
    role: "Frontend Developer",
    pfp: fallbackProfileImage,
    socials: { mail: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Aaditya Thapa",
    role: "FullStack Developer",
    pfp: fallbackProfileImage,
    socials: { mail: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Aayush Budhathoki",
    role: "App Developer",
    pfp: fallbackProfileImage,
    socials: { mail: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Ganesh Dahal",
    role: "UI/UX Designer",
    pfp: fallbackProfileImage,
    socials: { mail: "#", linkedin: "#", github: "#" },
  },
];

const features = [
  // {
  //   icon: <BookOpen size={20} />,
  //   title: "Smart Routines",
  //   desc: "View your class schedule day-by-day with real-time slot awareness.",
  // },
  {
    icon: <Zap size={20} />,
    title: "Instant Updates",
    desc: "Changes to modules, rooms, or teachers reflect immediately.",
  },
  {
    icon: <Users size={20} />,
    title: "Group-aware",
    desc: "Routines are scoped to your group so you always see what's relevant.",
  },
 
];

const AboutPage = () => {
  const hasLink = (value) => value && value !== "#";

  return (
    <div className="px-4 pb-24 font-manrope md:pb-6 lg:mx-auto lg:max-w-8xl">
      <section className="rounded-3xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-dark-border dark:bg-dark-card md:px-8 md:py-10">
        <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
          Built by DevSphere Community
        </span>
        <h1 className="mt-4 font-poppins text-3xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
          Routine Application
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-500 dark:text-gray-400 md:text-base">
          A collaborative academic platform that helps students and admins stay
          in sync with routines, updates, and classroom information.
        </p>
      </section>

      <section className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-dark-border dark:bg-dark-card"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                {feature.icon}
              </div>
              <h2 className="font-poppins text-base font-semibold text-gray-900 dark:text-gray-100">
                {feature.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-dark-border dark:bg-dark-card md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-poppins text-2xl font-bold text-gray-900 dark:text-gray-100">
              Team DevSphere
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              The people behind design, frontend, and backend delivery.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Core contributors
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md dark:border-dark-border dark:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.pfp}
                  alt={member.name}
                  onError={(event) => {
                    event.currentTarget.src = fallbackProfileImage;
                  }}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                />
                <div className="min-w-0">
                  <h3 className="truncate font-poppins text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-accent">{member.role}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={member.socials.mail}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Email ${member.name}`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors dark:border-gray-700 ${
                    hasLink(member.socials.mail)
                      ? "hover:border-red-400 hover:text-red-500"
                      : "pointer-events-none opacity-50"
                  }`}
                >
                  <Mail size={14} />
                </a>
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn ${member.name}`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors dark:border-gray-700 ${
                    hasLink(member.socials.linkedin)
                      ? "hover:border-sky-500 hover:text-sky-500"
                      : "pointer-events-none opacity-50"
                  }`}
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub ${member.name}`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors dark:border-gray-700 ${
                    hasLink(member.socials.github)
                      ? "hover:border-gray-900 hover:text-gray-900 dark:hover:border-white dark:hover:text-white"
                      : "pointer-events-none opacity-50"
                  }`}
                >
                  <Github size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} DevSphere Community · Made with ♥ for students
      </div>
    </div>
  );
};

export default AboutPage;
