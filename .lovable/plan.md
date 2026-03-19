
# SobaCare – Admin-Master Dashboard (MVP Frontend)

## Visão Geral
Plataforma SaaS de saúde com foco no painel Admin-Master. Autenticação simulada via localStorage com redirecionamento por perfil. Design system alinhado ao brief (Trust Blue, Deep Navy sidebar, Inter font, layout Linear/Stripe).

## 1. Autenticação Simulada
- **`/login`** – Formulário de email + password com seleção de perfil (Paciente, Hospital, Admin Master)
- **`/register`** – Formulário de registo com escolha de perfil
- Redirecionamento automático: Admin Master → `/admin/master`
- Guarda de rotas: redireciona para `/login` se não autenticado

## 2. Layout Admin-Master
- **Sidebar fixa (240px)** com Deep Navy (#0F172A), colapsável, com ícones Lucide
- **Header global** com busca, sino de notificações (dropdown), avatar com menu
- Navegação organizada em grupos: Dashboard, Gestão, Financeiro, Sistema

## 3. Páginas do Admin-Master (todas com mock data, tabelas, cards e interações)

### Dashboard Principal (`/admin/master`)
- KPIs: total hospitais, médicos, pacientes, consultas do mês, receita
- Gráficos: consultas por mês, receita, distribuição por departamento
- Atividade recente e alertas

### Gestão
- **Users** – Tabela com filtros (active/inactive), busca, detalhes em modal
- **Hospitals** – Lista com status, plano, ações (ativar/desativar)
- **Doctors** – Tabela com especialidade, hospital, status
- **Patients** – Lista com filtros e busca
- **Appointments** – Tabela com status pills (confirmado, pendente, cancelado)
- **Departments** – CRUD simulado de especialidades

### Financeiro
- **Billing** – Resumo de faturação, tabela de faturas
- **Payments** – Histórico de pagamentos por hospital
- **Plans** – 3 planos SaaS (Essential, Professional, Enterprise) com cards e comparação
- **Reports** – Relatórios financeiros e de sistema com filtros de data

### Sistema
- **Statistics** – Métricas globais com gráficos
- **Integrations** – Lista de integrações (ativas/inativas)
- **API Keys** – Gestão de chaves com copiar/revogar
- **Webhooks** – Lista de endpoints configurados
- **Logs** – Logs de erros, acesso e API com filtros
- **Services/Health** – Status dos serviços (uptime, latência)
- **Support/Tickets** – Lista de tickets com status e prioridade
- **Notifications** – Centro de notificações com marcar como lida
- **Advanced Settings** – Configurações globais da plataforma

## 4. Componentes Reutilizáveis
- `StatusPill` – Pills coloridas para estados (ativo, pendente, cancelado)
- `StatsCard` – Card de KPI com ícone, valor e variação
- `DataTable` – Tabela reutilizável com busca, filtros e paginação
- `EmptyState` – Estado vazio consistente
- `NotificationDropdown` – Dropdown de notificações no header

## 5. Sistema de Notificações
- Ícone sino no header com badge de contagem
- Dropdown com lista de notificações mock
- Estado vazio: "Não há notificações por enquanto"
- Fechar ao clicar fora

## 6. Design
- Cores do brief (Trust Blue, Deep Navy, Cool Slate)
- Font Inter via Google Fonts
- Border radius 6-8px, transições rápidas (0.2s)
- Tabelas densas com row borders subtis
- Responsivo para desktop (prioridade) e tablet
