// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";

const TeamSection = () => {
  // ---- FUTURE BACKEND CODE (keep commented now) ----
  /*
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/team")
      .then(res => res.json())
      .then(data => setTeam(data));
  }, []);
  */

  // ---- HARD-CODED TEAM DATA FOR NOW ----
  const team = [
    {
      id: 1,
      name: "Abdul Kaium",
      role: "Frontend Developer",
      bio: "React, Next.js, Tailwind, UI/UX focused developer crafting clean interfaces.",
      image: "https://i.ibb.co/5xRykvM/avatar1.png",
    },
    {
      id: 2,
      name: "Friend A",
      role: "Backend & Database Engineer",
      bio: "Expert in Node.js, Express, MySQL schemas, and API development.",
      image: "https://i.ibb.co/5xRykvM/avatar1.png",
    },
    {
      id: 3,
      name: "Friend B",
      role: "Project Manager",
      bio: "Organizes workflows, handles documentation, and coordinates team delivery.",
      image: "https://i.ibb.co/5xRykvM/avatar1.png",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-16">
      <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {team.map(member => (
          <div key={member.id} className="p-6 rounded-xl shadow-lg bg-base-200 text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-primary font-medium">{member.role}</p>
            <p className="mt-2 opacity-80">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
