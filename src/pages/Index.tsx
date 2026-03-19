import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Star, Phone, Mail, MapPin, ArrowRight, Facebook, Instagram, Linkedin } from "lucide-react";
import heroImg from "@/assets/hero-doctors.jpg";
import aboutImg from "@/assets/about-doctor.jpg";
import serviceBooking from "@/assets/service-booking.jpg";
import serviceTelemedicine from "@/assets/service-telemedicine.jpg";
import serviceFamily from "@/assets/service-family.jpg";
import clinic1 from "@/assets/clinic-1.jpg";
import clinic2 from "@/assets/clinic-2.jpg";
import clinic3 from "@/assets/clinic-3.jpg";

const services = [
  { img: serviceBooking, title: "Marcação Online", desc: "Agende suas consultas em minutos" },
  { img: serviceTelemedicine, title: "Telemedicina", desc: "Consulte de casa, com segurança" },
  { img: serviceFamily, title: "Gestão Familiar", desc: "Acompanhe a saúde de toda família" },
];

const clinics = [
  { img: clinic1, name: "Clínica Premium", desc: "Atendimento dedicado com profissionais qualificados e certificados.", specialists: 12 },
  { img: clinic2, name: "Centro Médico", desc: "Atendimento dedicado com profissionais qualificados e certificados.", specialists: 18 },
  { img: clinic3, name: "Hospital Saúde", desc: "Atendimento dedicado com profissionais qualificados e certificados.", specialists: 25 },
];

const navLinks = ["Home", "Agendamento", "Sobre Nós", "Serviços", "Contacte-nos"];

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
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Registar-se</Link>
          </Button>
        </div>
      </div>
    </header>

    {/* Hero */}
    <section id="home" className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Bem-vindo à SobaCare
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Cuidar com{" "}
            <span className="text-primary">Sabedoria</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg">
            A SobaCare conecta pacientes e profissionais de saúde, permitindo marcação de consultas rápida e eficaz. Aproximando pessoas aos cuidados que merecem.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="lg" asChild>
              <Link to="/register">Registar-se</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.9/5 · 2.000+ Pacientes Satisfeitos</span>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={heroImg} alt="Equipa médica SobaCare" className="rounded-2xl shadow-xl max-w-md w-full object-cover" />
        </div>
      </div>
    </section>

    {/* Sobre Nós */}
    <section id="sobre-nós" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img src={aboutImg} alt="Médica consultando paciente" className="rounded-2xl shadow-lg max-w-sm w-full object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Sobre Nós</h2>
            <p className="text-muted-foreground leading-relaxed">
              A SobaCare nasceu com um propósito simples: aproximar as pessoas aos cuidados de saúde de forma digna, rápida e acessível.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Criámos uma plataforma digital prática e intuitiva, onde você pode agendar atendimentos, acompanhar a sua saúde, e da sua família com profissionais confiáveis.
            </p>
            <div className="flex gap-6 pt-4">
              <div className="rounded-xl border-2 border-primary/20 px-6 py-4 text-center">
                <p className="text-2xl font-bold text-primary">2.5K+</p>
                <p className="text-xs text-muted-foreground">Pacientes Ativos</p>
              </div>
              <div className="rounded-xl border-2 border-primary/20 px-6 py-4 text-center">
                <p className="text-2xl font-bold text-primary">50+</p>
                <p className="text-xs text-muted-foreground">Profissionais</p>
              </div>
            </div>
            <Button asChild>
              <Link to="/register">Explorar Serviços</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Nossos Serviços */}
    <section id="serviços" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Nossos Serviços</h2>
          <p className="text-muted-foreground mt-2">Soluções completas para sua saúde e bem-estar</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map(s => (
            <Card key={s.title} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="pt-5 space-y-2">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Clínicas Parceiras */}
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Clínicas Parceiras</h2>
          <p className="text-muted-foreground mt-2">A SobaCare conecta sua clínica a mais pacientes, tudo numa plataforma moderna, segura e fácil de usar.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {clinics.map(c => (
            <Card key={c.name} className="overflow-hidden border-0 shadow-sm">
              <div className="h-48 overflow-hidden">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="pt-5 space-y-3">
                <h3 className="font-semibold text-lg">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
                <p className="text-xs text-muted-foreground">{c.specialists} especialidades</p>
                <Button className="w-full">Saiba Mais</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Contacte-nos */}
    <section id="contacte-nos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Contacte-nos</h2>
          <p className="text-muted-foreground mt-2">Estamos aqui para responder suas dúvidas e preocupações</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-0 shadow-sm">
            <CardContent className="pt-6 space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-sm font-medium">Telefone</p>
              <p className="text-sm text-muted-foreground">+244 923 123 123</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-sm">
            <CardContent className="pt-6 space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">geral@sobacare.ao</p>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-sm">
            <CardContent className="pt-6 space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-warning" />
              </div>
              <p className="text-sm font-medium">Localização</p>
              <p className="text-sm text-muted-foreground">Luanda, Angola</p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto border-0 shadow-sm">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Fale connosco</h3>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); }}>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Primeiro Nome" />
                <Input placeholder="Último Nome" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Número de Telefone" />
                <Input placeholder="E-mail" type="email" />
              </div>
              <Textarea placeholder="Escreva a sua mensagem..." rows={4} />
              <Button type="submit" className="w-full">Enviar Mensagem</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Bottom Nav */}
    <div className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-1.5">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold">SobaCare</span>
        </div>
        <nav className="flex items-center gap-6">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} className="text-xs text-muted-foreground hover:text-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild><Link to="/login">Login</Link></Button>
          <Button size="sm" asChild><Link to="/register">Registar-se</Link></Button>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="border-t py-12 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-1.5"><Heart className="h-4 w-4 text-primary-foreground" /></div>
              <span className="font-bold">SobaCare</span>
            </div>
            <p className="text-xs text-muted-foreground">Mais do que agendar, é cuidar.</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Links Rápidos</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li><a href="#home" className="hover:text-foreground">Home</a></li>
              <li><Link to="/register" className="hover:text-foreground">Agendamento</Link></li>
              <li><a href="#serviços" className="hover:text-foreground">Serviços</a></li>
              <li><a href="#sobre-nós" className="hover:text-foreground">Sobre Nós</a></li>
              <li><a href="#contacte-nos" className="hover:text-foreground">Contacte-nos</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Contactos</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>+244 923 123 123 Apoio ao Cliente</li>
              <li>+244 922 426 789 Suporte Técnico</li>
              <li>Geral@sobacare.ao</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-foreground"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
          © 2025 SobaCare. Todos os direitos reservados. | Privacidade | Termos
        </div>
      </div>
    </footer>
  </div>
);

export default Index;
