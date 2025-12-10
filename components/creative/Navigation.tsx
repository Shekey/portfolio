export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="text-2xl tracking-tight">
          <span className="font-light">Ajdin Šahinbegović</span>
        </div>

        <div className="flex gap-12 items-center">
          <a
            href="#work"
            className="nav-link hover:opacity-60 transition-opacity"
          >
            Work
          </a>
          <a
            href="#about"
            className="nav-link hover:opacity-60 transition-opacity"
          >
            About
          </a>
          <a
            href="#contact"
            className="nav-link hover:opacity-60 transition-opacity"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
