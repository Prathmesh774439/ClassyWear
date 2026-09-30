export default function HeroBackground() {
  return (
    <svg
      className="project-background"
      viewBox="0 0 1280 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="project-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--border)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="1280" height="600" fill="url(#project-grid)" opacity="0.4" />
      <rect className="project-orbit" x="950" y="180" width="260" height="260" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.25" transform="rotate(45 1080 310)" />
      <rect x="1000" y="260" width="140" height="140" fill="var(--primary)" opacity="0.04" transform="rotate(45 1070 330)" />
      <circle className="project-spark" cx="1196" cy="135" r="5" fill="var(--primary)" />
      <circle className="project-spark" cx="1097" cy="470" r="4" fill="var(--primary)" opacity="0.7" />
      <circle className="project-spark" cx="880" cy="400" r="3" fill="var(--primary)" opacity="0.5" />
      <line x1="850" y1="600" x2="1280" y2="230" stroke="var(--border)" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}