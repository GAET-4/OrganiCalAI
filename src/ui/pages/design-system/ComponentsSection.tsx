import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'

const buttonVariants = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const
const buttonSizes = ['xs', 'sm', 'default', 'lg'] as const
const badgeVariants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4">
      {children}
    </h3>
  )
}

function ComponentBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <SectionTitle>{title}</SectionTitle>
      {children}
    </div>
  )
}

export function ComponentsSection() {
  return (
    <div className="flex flex-col gap-12">

      {/* Button */}
      <ComponentBlock title="Button">
        <div className="overflow-x-auto">
          <table className="text-xs text-muted-foreground mb-2">
            <thead>
              <tr>
                <th className="text-left pr-4 pb-2 font-normal">Variante</th>
                {buttonSizes.map((s) => (
                  <th key={s} className="px-2 pb-2 font-mono font-normal">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buttonVariants.map((variant) => (
                <tr key={variant}>
                  <td className="pr-4 py-1.5 font-mono">{variant}</td>
                  {buttonSizes.map((size) => (
                    <td key={size} className="px-2 py-1.5">
                      <Button variant={variant} size={size}>
                        {variant === 'link' ? 'Lien' : 'Bouton'}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground font-mono">disabled</span>
          <Button disabled>Désactivé</Button>
          <Button variant="outline" disabled>Désactivé</Button>
        </div>
      </ComponentBlock>

      {/* Input */}
      <ComponentBlock title="Input">
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-input-normal">Normal</Label>
            <Input id="ds-input-normal" placeholder="Tapez quelque chose…" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ds-input-disabled">Désactivé</Label>
            <Input id="ds-input-disabled" placeholder="Non modifiable" disabled />
          </div>
        </div>
      </ComponentBlock>

      {/* Badge */}
      <ComponentBlock title="Badge">
        <div className="flex flex-wrap gap-2">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </ComponentBlock>

      {/* Card */}
      <ComponentBlock title="Card">
        <Card className="max-w-sm shadow-[var(--shadow-neo-sm)]">
          <CardHeader>
            <CardTitle>Marie Curie</CardTitle>
            <CardDescription>Anniversaire dans 5 jours — Groupe Famille</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/70">
              N'oublie pas d'envoyer un message ou d'organiser quelque chose de spécial.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Voir le contact</Button>
          </CardFooter>
        </Card>
      </ComponentBlock>

      {/* Tabs */}
      <ComponentBlock title="Tabs">
        <Tabs defaultValue="tab1" className="max-w-sm">
          <TabsList>
            <TabsTrigger value="tab1">Onglet 1</TabsTrigger>
            <TabsTrigger value="tab2">Onglet 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="pt-3">
            <p className="text-sm text-foreground/70">Contenu du premier onglet.</p>
          </TabsContent>
          <TabsContent value="tab2" className="pt-3">
            <p className="text-sm text-foreground/70">Contenu du second onglet.</p>
          </TabsContent>
        </Tabs>
      </ComponentBlock>

      {/* Skeleton */}
      <ComponentBlock title="Skeleton">
        <div className="flex flex-col gap-2 max-w-sm">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </ComponentBlock>

    </div>
  )
}
