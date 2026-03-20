import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, Clock, Shield, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "./Index";

const steps = [
  { icon: CalendarCheck, title: "Escolha o Hospital", desc: "Selecione a instituição e especialidade desejada." },
  { icon: Clock, title: "Agende o Horário", desc: "Escolha a data e hora mais conveniente para si." },
  { icon: Shield, title: "Confirmação", desc: "Receba a confirmação e gerencie tudo pelo painel." },
];

const benefits = [
  "Sem filas de espera",
  "Acesso a múltiplas clínicas e hospitais",
  "Histórico completo das suas consultas",
  "Notificações e lembretes automáticos",
];

const Agendamento = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <SiteHeader />

    {/* Hero */}
    <section className="mx-auto px-6 md:px-12 lg:px-20 max-w-7xl py-10 text-center">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        Agende a sua consulta em minutos
      </h1>
      <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
        Com a SobaCare, marcar consultas é simples, rápido e seguro. Tudo online, sem complicações.
      </p>
      <Button size="lg" asChild>
        <Link to="/register">Começar Agora <ArrowRight className="h-4 w-4 ml-2" /></Link>
      </Button>
    </section>

    {/* How it works */}
    <section className="bg-muted/30 py-10">
      <div className="mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <h2 className="text-2xl font-bold text-center mb-6">Como funciona</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <Card key={s.title} className="text-center border-0 shadow-sm">
              <CardContent className="pt-6 space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">Passo {i + 1}</p>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="mx-auto px-6 md:px-12 lg:px-20 max-w-7xl py-10">
      <h2 className="text-2xl font-bold text-center mb-5">Porquê usar a SobaCare?</h2>
      <ul className="space-y-3 max-w-2xl mx-auto">
        {benefits.map(b => (
          <li key={b} className="flex items-center gap-3 text-sm">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ArrowRight className="h-3 w-3 text-primary" />
            </div>
            {b}
          </li>
        ))}
      </ul>
    </section>

    {/* CTA */}
    <section className="bg-primary text-primary-foreground py-10 text-center">
      <div className="mx-auto px-6 md:px-12 lg:px-20 max-w-7xl space-y-3">
        <h2 className="text-2xl font-bold">Pronto para cuidar da sua saúde?</h2>
        <p className="text-primary-foreground/80">Registe-se gratuitamente e comece a agendar.</p>
        <Button size="lg" variant="secondary" asChild>
          <Link to="/register">Criar Conta Grátis</Link>
        </Button>
      </div>
    </section>

    <div className="flex-1" />
    <SiteFooter />
  </div>
);

export default Agendamento;
