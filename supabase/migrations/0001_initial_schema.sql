create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'reader' check (role in ('admin', 'editor', 'reader'))
);

create table if not exists public.poems (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text not null,
  mood text not null,
  cover_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  poem_id uuid not null references public.poems(id) on delete cascade,
  name text not null,
  comment text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  poem_id uuid not null references public.poems(id) on delete cascade,
  reaction_type text not null check (reaction_type in ('Loved It', 'Romantic', 'Emotional', 'Beautiful', 'Heartbreaking')),
  created_at timestamptz not null default now()
);

create index if not exists poems_slug_idx on public.poems(slug);
create index if not exists poems_mood_idx on public.poems(mood);
create index if not exists comments_poem_id_idx on public.comments(poem_id);
create index if not exists reactions_poem_id_idx on public.reactions(poem_id);

alter table public.users enable row level security;
alter table public.poems enable row level security;
alter table public.comments enable row level security;
alter table public.reactions enable row level security;

create policy "Public poems are readable" on public.poems for select using (true);
create policy "Public comments are readable" on public.comments for select using (true);
create policy "Public reactions are readable" on public.reactions for select using (true);
create policy "Public can add comments" on public.comments for insert with check (length(name) between 1 and 80 and length(comment) between 1 and 800);
create policy "Public can add reactions" on public.reactions for insert with check (reaction_type in ('Loved It', 'Romantic', 'Emotional', 'Beautiful', 'Heartbreaking'));

insert into public.users (email, role)
values ('admin@rosaakuru.lk', 'admin')
on conflict (email) do update set role = excluded.role;

insert into public.poems (title, slug, content, excerpt, mood, cover_image)
values
(
  'රෝස මතක',
  'rosa-mathaka',
  'ඔබ ගිය දින සිට\nමගේ කවුළුව අසල\nරෝස මල් පිපෙන්නේ නැත\n\nඑහෙත් සෑම රාත්‍රියකම\nඔබේ නම අකුරක් ලෙස\nමගේ හදවතේ නිහඬව ලියැවේ.',
  'විරහව අතරත් ආදරය නිහඬව ඉතිරි වන කවියක්.',
  'විරහ',
  null
),
(
  'අකුරු අතර ඔබ',
  'akuru-athara-oba',
  'කඩදාසි මත වැටුණු\nකුඩා රෝස තිතක් මෙන්\nඔබ මගේ ජීවිතයට පැමිණියේය\n\nඑදා සිට\nසෑම වචනයකම අග\nඔබේ හුස්ම තැන්පත් වී ඇත.',
  'ආදරය අකුරු තුළ සඟවා කියන නවතම කවියක්.',
  'ආදර',
  null
)
on conflict (slug) do nothing;
