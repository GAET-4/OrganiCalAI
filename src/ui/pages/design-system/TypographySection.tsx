const sizes = [
  { cls: 'text-xs', label: 'xs', rem: '0.75rem' },
  { cls: 'text-sm', label: 'sm', rem: '0.875rem' },
  { cls: 'text-base', label: 'base', rem: '1rem' },
  { cls: 'text-lg', label: 'lg', rem: '1.125rem' },
  { cls: 'text-xl', label: 'xl', rem: '1.25rem' },
  { cls: 'text-2xl', label: '2xl', rem: '1.5rem' },
  { cls: 'text-3xl', label: '3xl', rem: '1.875rem' },
  { cls: 'text-4xl', label: '4xl', rem: '2.25rem' },
]

const weights = [
  { cls: 'font-normal', label: 'Regular', value: '400' },
  { cls: 'font-medium', label: 'Medium', value: '500' },
  { cls: 'font-semibold', label: 'Semibold', value: '600' },
  { cls: 'font-bold', label: 'Bold', value: '700' },
]

const textStyles = [
  {
    label: 'H1 — Titre gradient',
    node: (
      <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        OrganiCal.ai
      </h1>
    ),
  },
  {
    label: 'H2 — En-tête de section',
    node: <h2 className="text-lg font-semibold text-foreground">Contacts récents</h2>,
  },
  {
    label: 'Body — Texte courant',
    node: <p className="text-sm text-foreground">Jean Dupont fête son anniversaire dans 3 jours.</p>,
  },
  {
    label: 'Label — Étiquette de champ',
    node: <span className="text-sm font-medium text-foreground">Prénom</span>,
  },
  {
    label: 'Caption — Texte discret',
    node: <span className="text-xs text-muted-foreground">Dernière mise à jour il y a 2 heures</span>,
  },
]

export function TypographySection() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-1">
          Police
        </h3>
        <p className="text-3xl font-semibold text-foreground">Geist Variable</p>
        <p className="text-sm text-muted-foreground mt-1">
          <code className="font-mono">@fontsource-variable/geist</code> — variable font, tous les poids de 100 à 900
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Échelle de taille
        </h3>
        <div className="flex flex-col gap-3">
          {sizes.map(({ cls, label, rem }) => (
            <div key={label} className="flex items-baseline gap-4">
              <span className="w-16 text-xs font-mono text-muted-foreground shrink-0">
                {label} · {rem}
              </span>
              <span className={`${cls} text-foreground`}>
                Le renard brun paresseux saute par-dessus le chien
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Poids
        </h3>
        <div className="flex flex-col gap-2">
          {weights.map(({ cls, label, value }) => (
            <div key={value} className="flex items-baseline gap-4">
              <span className="w-28 text-xs font-mono text-muted-foreground shrink-0">
                {label} · {value}
              </span>
              <span className={`text-lg ${cls} text-foreground`}>
                Geist Variable
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
          Styles utilisés dans l'app
        </h3>
        <div className="flex flex-col gap-4">
          {textStyles.map(({ label, node }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-xs font-mono text-muted-foreground">{label}</span>
              {node}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
