import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsSectionProps {
  tabs: Tab[];
  defaultValue?: string;
}

export const TabsSection = ({ tabs, defaultValue }: TabsSectionProps) => (
  <Tabs defaultValue={defaultValue ?? tabs[0]?.value} className="w-full">
    <TabsList>
      {tabs.map((t) => (
        <TabsTrigger key={t.value} value={t.value}>
          {t.label}
        </TabsTrigger>
      ))}
    </TabsList>
    {tabs.map((t) => (
      <TabsContent key={t.value} value={t.value}>
        {t.content}
      </TabsContent>
    ))}
  </Tabs>
);
