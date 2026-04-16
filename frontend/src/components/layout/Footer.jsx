import { Link } from 'react-router-dom';

export default function Footer() {
  const team = [
    { role: "PRODUCT OWNER", name: "Team Member" },
    { role: "SCRUM MASTER", name: "Team Member" },
    { role: "UI/UX DESIGNER", name: "Team Member" },
    { role: "WEB DEVELOPER", name: "Team Member" },
  ];

  return (
    <footer className="w-full bg-[#F9FAFB] border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-6 w-6 bg-[#5D45FD] rounded flex items-center justify-center text-white text-xs font-bold">L</div>
              <span className="text-xl font-bold tracking-tight text-[#3A33D1]">LinguaLoop</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Master your target language through mindful writing and community exchange.
            </p>
          </div>

          {/* Team Column */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Created By</h3>
            <div className="grid grid-cols-1 gap-4">
              {team.map((member, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    {member.role}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Links</h3>
            <ul className="space-y-4">
              <li><Link to="/team" className="text-sm text-[#3A33D1] hover:underline">About The Team</Link></li>
              <li><a href="https://github.com" className="text-sm text-[#3A33D1] hover:underline">Github Repo</a></li>
              <li><Link to="/faq" className="text-sm text-[#3A33D1] hover:underline">FAQ</Link></li>
              <li><Link to="/privacy" className="text-sm text-[#3A33D1] hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2026 LinguaLoop. v1.0.0
          </p>
          <div className="flex gap-6">
            {/* Social icons or small links could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}