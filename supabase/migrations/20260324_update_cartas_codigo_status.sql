alter table public.cartas
  add column if not exists codigo text;

update public.cartas
set status = case
  when upper(coalesce(status, '')) = 'ATIVA' then 'DISPONIVEL'
  when upper(coalesce(status, '')) in ('PAUSADA', 'VENDIDA') then 'RESERVADA'
  else status
end;

alter table public.cartas
  alter column status set default 'DISPONIVEL';
