import { Link } from 'react-router-dom';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
  onDark?: boolean;
  asLink?: boolean;
  className?: string;
}

const SIZES: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-lg tracking-[0.34em]',
  md: 'text-2xl tracking-[0.3em]',
  lg: 'text-4xl sm:text-5xl tracking-[0.26em]',
};

/**
 * The house lockup: HAYA NUR in a high-contrast serif, set wide, with the
 * three-word promise beneath. Type only — no stretched or recoloured artwork.
 */
export function Wordmark({
  size = 'md',
  withTagline = true,
  onDark = false,
  asLink = true,
  className = '',
}: Props) {
  const content = (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <span className={`font-display uppercase ${SIZES[size]} ${onDark ? 'text-ivory' : 'text-ink'}`}>
        Haya&nbsp;Nur
      </span>
      {withTagline ? (
        <span
          className={`mt-2 text-[8px] uppercase tracking-micro sm:text-[9px] ${
            onDark ? 'text-ivory/60' : 'text-ink-faint'
          }`}
        >
          Clothing · Elegance · Modesty
        </span>
      ) : null}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link to="/" aria-label="Haya Nur — home" className="shrink-0">
      {content}
    </Link>
  );
}
