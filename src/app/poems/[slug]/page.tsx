import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CommentForm } from "@/components/comment-form";
import { Reactions } from "@/components/reactions";
import { ShareButtons } from "@/components/share-buttons";
import { formatDate } from "@/lib/utils";
import { getComments, getPoemBySlug, getReactionSummary } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const poem = await getPoemBySlug(slug);
  if (!poem) return {};
  return {
    title: poem.title,
    description: poem.excerpt,
    openGraph: {
      title: poem.title,
      description: poem.excerpt,
      images: poem.cover_image ? [poem.cover_image] : []
    }
  };
}

export default async function SinglePoemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = await getPoemBySlug(slug);
  if (!poem) notFound();

  const [comments, reactions] = await Promise.all([getComments(poem.id), getReactionSummary(poem.id)]);

  return (
    <main>
      <article className="mx-auto max-w-4xl px-4 py-12">
        {poem.cover_image ? (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg border border-white/10">
            <Image src={poem.cover_image} alt={poem.title} fill className="object-cover" priority />
          </div>
        ) : null}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-white/55">
            <span className="rounded-full border border-rose/35 px-3 py-1 text-blush">{poem.mood}</span>
            <span>{formatDate(poem.created_at)}</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{poem.title}</h1>
          <p className="mt-5 text-lg leading-9 text-white/68">{poem.excerpt}</p>
        </div>
        <div className="prose-poem rounded-lg border border-white/10 bg-card p-6 text-xl text-white/88 sm:p-10">{poem.content}</div>
        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-8">
          <Reactions poemId={poem.id} initial={reactions} />
          <div>
            <h3 className="mb-3 text-sm font-semibold text-blush">බෙදාගන්න</h3>
            <ShareButtons title={poem.title} />
          </div>
        </div>
      </article>
      <section className="mx-auto max-w-4xl px-4 pb-14">
        <h2 className="mb-5 text-2xl font-semibold">අදහස්</h2>
        <CommentForm poemId={poem.id} />
        <div className="mt-6 space-y-3">
          {comments.map((item) => (
            <div key={item.id} className="rounded-lg border border-white/10 bg-card p-4">
              <p className="font-semibold text-blush">{item.name}</p>
              <p className="mt-2 leading-7 text-white/70">{item.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
