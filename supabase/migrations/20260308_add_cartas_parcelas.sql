alter table public.cartas
  add column if not exists parcelas_json jsonb,
  add column if not exists saldo_devedor numeric;

update public.cartas
set
  parcelas_json = coalesce(
    parcelas_json,
    jsonb_build_array(jsonb_build_object('prazo', prazo, 'valor', parcela))
  ),
  saldo_devedor = coalesce(saldo_devedor, prazo * parcela);
