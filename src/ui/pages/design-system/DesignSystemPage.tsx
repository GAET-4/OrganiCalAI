import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ColorsSection } from './ColorsSection'
import { TypographySection } from './TypographySection'
import { ComponentsSection } from './ComponentsSection'
import { ShadowsSection } from './ShadowsSection'

export function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10 md:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            OrganiCal.ai
          </h1>
          <p className="text-foreground/50 mt-1 text-sm">Design System — Neo-Soft</p>
        </div>

        <Tabs defaultValue="colors">
          <TabsList variant="line" className="mb-8 w-full justify-start">
            <TabsTrigger value="colors">Couleurs</TabsTrigger>
            <TabsTrigger value="typography">Typographie</TabsTrigger>
            <TabsTrigger value="components">Composants</TabsTrigger>
            <TabsTrigger value="shadows">Shadows & Radius</TabsTrigger>
          </TabsList>

          <TabsContent value="colors">
            <ColorsSection />
          </TabsContent>

          <TabsContent value="typography">
            <TypographySection />
          </TabsContent>

          <TabsContent value="components">
            <ComponentsSection />
          </TabsContent>

          <TabsContent value="shadows">
            <ShadowsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
