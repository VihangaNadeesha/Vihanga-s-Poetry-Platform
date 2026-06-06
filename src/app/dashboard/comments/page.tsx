import { Trash2 } from "lucide-react";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardCommentsPage() {
  const supabase = createAdminClient();
  const { data: comments, error } = await supabase.from("comments").select("*, poems(title)").order("created_at", { ascending: false });
  if (error) throw error;

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold">Comments</h2>
      {comments.map((comment) => (
        <form key={comment.id} action={`/api/comments/${comment.id}`} method="POST" className="rounded-lg border border-white/10 bg-card p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-blush">{comment.name}</p>
              <p className="mt-1 text-sm text-white/50">{(comment.poems as { title?: string } | null)?.title}</p>
            </div>
            <button formAction={`/api/comments/${comment.id}?_method=DELETE`} className="rounded-md border border-white/10 p-2 text-white/60 hover:border-rose" aria-label="Delete comment">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 leading-7 text-white/70">{comment.comment}</p>
        </form>
      ))}
    </div>
  );
}
