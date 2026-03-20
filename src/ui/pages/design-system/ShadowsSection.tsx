const shadows = [
  {
    name: 'shadow-neo',
    cls: 'shadow-[var(--shadow-neo)]',
    value: '6px 6px 14px #C8D0DF, -6px -6px 14px #FFFFFF',
  },
  {
    name: 'shadow-neo-sm',
    cls: 'shadow-[var(--shadow-neo-sm)]',
    value: '3px 3px 8px #C8D0DF, -3px -3px 8px #FFFFFF',
  },
  {
    name: 'shadow-neo-pressed',
    cls: 'shadow-[var(--shadow-neo-pressed)]',
    value: 'inset 3px 3px 8px #C8D0DF, inset -3px -3px 8px #FFFFFF',
  },
]

const radii = [
  { utility: 'rounded-sm', formula: 'var(--radius) × 0.6', computed: '0.45rem' },
  { utility: 'rounded-md', formula: 'var(--radius) × 0.8', computed: '0.60rem' },
  { utility: 'rounded-lg', formula: 'var(--radius)', computed: '0.75rem (base)' },
  { utility: 'rounded-xl', formula: 'var(--radius) × 1.4', computed: '1.05rem' },
  { utility: 'rounded-2xl', formula: 'var(--radius) × 1.8', computed: '1.35rem' },
  { utility: 'rounded-3xl', formula: 'var(--radius) × 2.2', computed: '1.65rem' },
  { utility: 'rounded-4xl', formula: 'var(--radius) × 2.6', computed: '1.95rem' },
]

export function ShadowsSection() {
  return (
    <div className="flex flex-col gap-10">

      <div>
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Ombres Neo-Soft
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {shadows.map(({ name, cls, value }) => (
            <div key={name} className="flex flex-col gap-3">
              <div className={`h-24 rounded-xl bg-card ${cls}`} />
              <div>
                <p className="text-xs font-mono font-medium text-foreground">{name}</p>
                <p className="text-xs font-mono text-muted-foreground break-all mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Border Radius
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Définis via <code className="font-mono">@theme inline</code> dans <code className="font-mono">index.css</code>.
          Les utilitaires Tailwind (<code className="font-mono">rounded-*</code>) résolvent vers les
          variables <code className="font-mono">--radius-*</code> du projet.
        </p>
        <div className="flex flex-col gap-3">
          {radii.map(({ utility, formula, computed }) => (
            <div key={utility} className="flex items-center gap-4">
              <div
                className={`w-12 h-12 bg-primary/20 border border-primary/30 shrink-0 ${utility}`}
              />
              <div>
                <p className="text-xs font-mono font-medium text-foreground">{utility}</p>
                <p className="text-xs font-mono text-muted-foreground">
                  {formula} = {computed}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
