import Link from "next/link";
import { Heart } from "lucide-react";

const links = [
  { href: "/poems", label: "කවි" },
  { href: "/search", label: "සොයන්න" },
  { href: "/about", label: "අප ගැන" },
  { href: "/dashboard", label: "Dashboard" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/88 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-paper">
          <Heart className="h-5 w-5 text-rose" aria-hidden />
          රෝස අකුරු
        </Link>
        <div className="flex items-center gap-3 text-sm text-white/72 sm:gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-blush">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
