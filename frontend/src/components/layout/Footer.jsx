import { Link } from 'react-router-dom';
import logo from '@/assets/Logo-Desktop.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Footer() {
  const team = [
    // { role: "PRODUCT OWNER", name: "Team Member", github: ,linkedin: },
    {
      role: 'SCRUM MASTER',
      name: 'Tonia Montgomery',
      github: 'https://github.com/MontgomeryT7294',
      linkedin: 'http://www.linkedin.com/in/tonia-montgomery',
    },
    {
      role: 'UI/UX DESIGNER',
      name: 'Margaret Wu',
      github: 'https://github.com/margaretcwu',
      linkedin: 'https://www.linkedin.com/in/margaretcwu',
    },
    {
      role: 'WEB DEVELOPER',
      name: 'Noman Sajid',
      github: 'https://github.com/noman-sajid',
      linkedin: 'https://www.linkedin.com/in/noman-sajid01',
    },
    {
      role: 'WEB DEVELOPER',
      name: 'Sitraka Andriambarijao',
      github: 'https://github.com/rasitraka0',
      linkedin:
        'https://www.linkedin.com/in/sitraka-heritina-andriambarijao-209597238',
    },
    {
      role: 'WEB DEVELOPER',
      name: 'Jazz Bullecer',
      github: 'https://github.com/jazxbx',
      linkedin: 'https://www.linkedin.com/in/jazz-bullecer-89780928a',
    },
  ];

  return (
    <footer className='w-full bg-[#F9FAFB] border-t border-gray-200 pt-8 pb-4'>
      <div className='container mx-auto px-6 md:px-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-16'>
          {/* Brand Column */}
          <div className='flex flex-col gap-4'>
            <Link to='/' className='flex items-center gap-2'>
              <img src={logo} />
            </Link>
            <p className='text-sm text-gray-500 max-w-xs leading-relaxed'>
              Master your target language through mindful writing and community
              exchange.
            </p>
            <a
              href='https://github.com/chingu-voyages/V60-tier3-team-32'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-sm font-medium text-gray-600  hover:text-indigo-600 margin-auto'
            >
              <span>View GitHub Repo</span>
              <ArrowOutwardIcon className='!text-base' />
            </a>
          </div>

          {/* Team Column */}
          <div>
            <h3 className='text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider'>
              Created By
            </h3>

            <div className='space-y-3'>
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className='group flex items-center justify-between'
                >
                  <div>
                    <p className='text-sm font-semibold text-gray-800'>
                      {member.name}
                    </p>
                    <p className='mt-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400'>
                      {member.role}
                    </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <a
                      href={member.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${member.name} GitHub`}
                      className='flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:text-black '
                    >
                      <GitHubIcon fontSize='small' />
                    </a>

                    <a
                      href={member.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${member.name} LinkedIn`}
                      className='flex h-8 w-8 items-center justify-centertext-gray-400 transition hover:text-blue-600'
                    >
                      <LinkedInIcon fontSize='small' />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links Column */}
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-gray-400'>© 2026 LinguaLoop. v1.0.0</p>
          <div className='flex gap-6'>
            {/* Social icons or small links could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
