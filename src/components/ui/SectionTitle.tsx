type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionTitleProps) {
  const alignment = centered ? "text-center" : "text-left";

  return (
    <div className={`${alignment} space-y-3`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {description ? (
        <p className="mx-auto max-w-2xl text-sm text-neutral-300 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
