import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Building2, Shield, Users, ArrowRight, CheckCircle2, Stethoscope, FileText } from "lucide-react";

const features = [
  { icon: Calendar, title: "Agendamento Inteligente", desc: "Marque consultas em segundos com confirmação instantânea." },
  { icon: Building2, title: "Gestão Hospitalar", desc: "Painel completo para hospitais gerirem médicos, pacientes e agenda." },
  { icon: Shield, title: "Segurança de Dados", desc: "Dados clínicos protegidos com encriptação de ponta a ponta." },
  { icon: Users, title: "Multi-Perfil", desc: "Experiências dedicadas para pacientes, hospitais e administradores." },
];

const steps = [
  { num: "01", title: "Crie a sua conta", desc: "Registe-se como paciente ou hospital em menos de 2 minutos." },
  { num: "02", title: "Escolha o serviço", desc: "Selecione hospital, departamento e médico pretendido." },
  { num: "03", title: "Agende a consulta", desc: "Escolha data e hora disponíveis e confirme." },
  { num: "04", title: "Acompanhe tudo", desc: "Receba notificações e aceda ao histórico completo." },
];

const benefits = [
  "Redução de filas e tempos de espera",
  "Histórico médico digital centralizado",
  "Prescrições e documentos acessíveis 24/7",
  "Gestão de múltiplas unidades hospitalares",
  "Relatórios e métricas em tempo real",
  "Integração pronta para APIs externas",
];

const Index = () => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-1.5">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">SobaCare</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Iniciar Sessão</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Criar Conta</Link>
          </Button>
        </div>
      </div>
    </header>

    {/* Hero */}
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Heart className="h-4 w-4" /> Plataforma de Saúde Digital
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Cuide da sua saúde com <span className="text-primary">simplicidade</span>
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          A SobaCare conecta pacientes e hospitais numa plataforma moderna de marcação de consultas, gestão clínica e acompanhamento médico.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild className="gap-2">
            <Link to="/register">Começar Agora <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">Já tenho conta</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="border-t bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Funcionalidades Principais</h2>
          <p className="text-muted-foreground mt-2">Tudo o que precisa numa única plataforma.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Como Funciona</h2>
          <p className="text-muted-foreground mt-2">Quatro passos simples para cuidar da sua saúde.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="text-center space-y-3">
              <span className="text-4xl font-bold text-primary/20">{s.num}</span>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="border-t bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Porquê escolher a SobaCare?</h2>
            <p className="text-muted-foreground">Uma plataforma pensada para o ecossistema de saúde angolano, com ambição de escalar para toda a África.</p>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Stethoscope, label: "312+ Médicos", sub: "Registados na plataforma" },
              { icon: Building2, label: "47 Hospitais", sub: "Parceiros ativos" },
              { icon: Users, label: "8.400+ Pacientes", sub: "Utilizadores verificados" },
              { icon: FileText, label: "1.200+ Consultas/mês", sub: "Média mensal" },
            ].map((s) => (
              <Card key={s.label} className="text-center border-0 shadow-sm">
                <CardContent className="pt-6 space-y-1">
                  <s.icon className="h-6 w-6 mx-auto text-primary" />
                  <p className="font-bold text-lg">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-primary p-10 text-primary-foreground">
          <h2 className="text-3xl font-bold">Pronto para transformar a gestão de saúde?</h2>
          <p className="opacity-90">Junte-se a centenas de hospitais e milhares de pacientes que já confiam na SobaCare.</p>
          <div className="flex gap-3 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Criar Conta Gratuita</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">SobaCare</span>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 SobaCare. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
);

export default Index;
