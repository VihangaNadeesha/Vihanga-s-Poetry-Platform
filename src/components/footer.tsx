export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ප්‍රේමය අනන්තයි</p>
        <p>තුන්කල් කාව්‍යමය ප්‍රේම ජවනිකාව.</p>
      </div>
    </footer>
  );
}
