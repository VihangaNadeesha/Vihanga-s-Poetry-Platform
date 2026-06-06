export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} රෝස අකුරු</p>
        <p>සිංහල හදවත්වලට ලියන ආදරණීය කවි අවකාශය.</p>
      </div>
    </footer>
  );
}
