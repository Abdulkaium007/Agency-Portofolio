// src/components/admin/DashUsers.jsx
import { useAuth } from "../../hooks/useAuth";

const teamMembers = [
  { name: "Alex Chen", role: "Lead Developer", email: "alex@bornobyte.com" },
  { name: "Sarah Kim", role: "UI/UX Designer", email: "sarah@bornobyte.com" },
  { name: "Mike Torres", role: "Project Manager", email: "mike@bornobyte.com" },
];

export default function DashUsers() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-5xl font-black gradient-text mb-10">Team Members</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.email} className="card bg-base-100 shadow-xl p-8 border border-base-300">
            <div className="flex items-center gap-6 mb-6">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={`https://ui-avatars.com/api/?name=${member.name}&background=6366f1&color=fff`} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-base-content/70">{member.role}</p>
              </div>
            </div>
            <p className="text-base-content/80">{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}