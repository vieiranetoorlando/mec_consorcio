alter table public.cartas enable row level security;

drop policy if exists "cartas_public_select_disponivel" on public.cartas;
create policy "cartas_public_select_disponivel"
on public.cartas
for select
to anon
using (status = 'DISPONIVEL');

drop policy if exists "cartas_admin_select_own" on public.cartas;
create policy "cartas_admin_select_own"
on public.cartas
for select
to authenticated
using (owner_id = auth.uid());

drop policy if exists "cartas_admin_insert_own" on public.cartas;
create policy "cartas_admin_insert_own"
on public.cartas
for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "cartas_admin_update_own" on public.cartas;
create policy "cartas_admin_update_own"
on public.cartas
for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "cartas_admin_delete_own" on public.cartas;
create policy "cartas_admin_delete_own"
on public.cartas
for delete
to authenticated
using (owner_id = auth.uid());
