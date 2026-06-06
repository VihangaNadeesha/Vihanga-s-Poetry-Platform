import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/poems", label: "Poems" },
  { href: "/dashboard/comments", label: "Comments" },
  { href: "/dashboard/analytics", label: "Analytics" }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-blush">Admin</p>
          <h1 className="text-3xl font-bold">Rosa Akuru Dashboard</h1>
        </div>
        <LogoutButton />
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-rose">
            {link.label}
          </Link>
        ))}
      </div>
      {children}
    </main>
  );
}
