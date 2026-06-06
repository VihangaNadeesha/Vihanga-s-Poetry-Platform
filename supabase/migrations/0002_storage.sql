insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('poem-covers', 'poem-covers', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
on conflict (id) do update set public = true;

create policy "Cover images are public" on storage.objects
for select using (bucket_id = 'poem-covers');

create policy "Service role manages cover images" on storage.objects
for all using (bucket_id = 'poem-covers')
with check (bucket_id = 'poem-covers');
