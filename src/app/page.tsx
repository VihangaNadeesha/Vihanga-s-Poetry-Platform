import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { MotionDiv, MotionSection } from "@/components/motion";
import { PoemGrid } from "@/components/poem-grid";
import { getPoems } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const poems = await getPoems({ limit: 6 });

  return (
    <main>
      <MotionSection initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,92,138,0.22),transparent_38%)]" />
        <div className="relative mx-auto grid min-h-[72vh] max-w-6xl place-items-center px-4 py-20 text-center">
          <MotionDiv initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-rose/40 bg-card text-rose shadow-glow">
              <Heart className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold leading-tight text-paper sm:text-6xl">තුන්කල් කාව්‍යමය ප්‍රේම ජවනිකාව</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-white/70">"ප්‍රේමය අනන්තයි" යනු ආදරය, මතකය, විරහව සහ නිහඬ හැඟීම් සිංහලෙන් කියවීමට නිර්මාණය කළ කවි අවකාශයකි.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/poems" className="inline-flex items-center justify-center gap-2 rounded-md bg-rose px-6 py-3 font-semibold text-white transition hover:bg-rose/85">
                කවි කියවන්න
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/search" className="inline-flex items-center justify-center rounded-md border border-white/10 px-6 py-3 text-white/75 transition hover:border-rose hover:text-blush">
                සොයන්න
              </Link>
            </div>
          </MotionDiv>
        </div>
      </MotionSection>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blush">නවතම කවි</p>
            <h2 className="mt-2 text-3xl font-bold">හදවතට ළඟ අකුරු</h2>
          </div>
          <Link href="/poems" className="text-sm text-rose hover:text-blush">සියල්ල</Link>
        </div>
        <PoemGrid poems={poems} />
      </section>
    </main>
  );
}
