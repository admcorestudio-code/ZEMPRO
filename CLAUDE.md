# ZEMPRO : CLAUDE.md

## Démarrage : à lire en premier
Ce fichier a été préparé par La Fabrique. Le fondateur n'est pas développeur : parle-lui en français simple, sans jargon.

1. Au premier lancement (dépôt vide ou presque), n'écris aucun code. Lis tout ce fichier, puis présente au fondateur ton plan de construction :
   - les étapes numérotées dans l'ordre où tu vas les faire, en commençant par ce qu'il pourra voir et tester le plus vite (le site si c'est un site, l'application si c'est une app) ;
   - pour chaque étape : ce que tu vas construire, ce qu'il pourra voir ou tester à la fin, et ce dont tu as besoin de lui (compte à créer, clé à placer dans les variables d'environnement, choix à faire) ;
   - les questions encore ouvertes, avec ta recommandation.
2. Termine par : « Réponds go pour que je commence l'étape 1. » Attends ce go avant de coder.
3. Après le go, avance une étape à la fois. À la fin de chaque étape, dis en quelques lignes ce qui est fait, comment le voir, ce qu'il doit faire de son côté, puis demande le go pour l'étape suivante.
4. Ne lui demande jamais de coller une clé secrète dans la conversation : il la place lui-même dans .env.local ou dans les variables d'environnement de l'hébergeur.
5. Ne refais pas d'étude de marché ni de plan business : ils sont déjà faits et résumés ci-dessous. Ton travail est de construire.

## Vision et périmètre du MVP
ZEMPRO est un service physique de désinfection de casques par machine UV pour les conducteurs de taxi-moto (zone CFA, portée régionale). Le site web sert à inscrire les conducteurs, gérer leur abonnement, encaisser en Mobile Money et animer des communautés de stations.

Offres : abonnement à 3000 FCFA/mois (8 nettoyages) et nettoyage à l'unité à 500 FCFA. Devise : XOF. Langue de l'interface : français.

MVP (à livrer, rien d'autre) :
1. Landing page avec offres et bouton WhatsApp.
2. Inscription et connexion (email et Google) via Supabase Auth.
3. Tableau de bord : statut d'abonnement, nettoyages restants, historique, code de parrainage.
4. Paramètres du compte : profil, zone, opérateur Mobile Money, préférences de notification.
5. Communautés : liste, rejoindre/quitter, classement de parrainage.
6. Paiement Mobile Money via agrégateur (webhook) et enregistrement des nettoyages par un opérateur de station.
7. Notifications : reçus et rappels WhatsApp/SMS (Twilio), emails transactionnels (Resend).

Hors périmètre : application mobile native, Supabase Storage, multi-devises, boutique en ligne.

## Stack
- Architecture : full_stack
- Frontend et API : Next.js (App Router) + TypeScript + Tailwind CSS, hébergé sur Vercel
- Base de données et authentification : Supabase (PostgreSQL, Auth email et Google, RLS)
- Paiement : agrégateur Mobile Money (CinetPay ou PayDunya) avec webhook
- Notifications : Twilio (WhatsApp/SMS) et Resend (emails)
- CI : GitHub Actions
- Tests : Vitest

## Arborescence
```
zempro/
├── .github/workflows/ci.yml
├── supabase/migrations/
├── src/
│   ├── app/
│   │   ├── (marketing)/page.tsx
│   │   ├── (auth)/login/page.tsx
│   │   ├── (auth)/signup/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── communities/page.tsx
│   │   └── api/
│   │       ├── payments/checkout/route.ts
│   │       ├── payments/webhook/route.ts
│   │       ├── cleanings/route.ts
│   │       └── notifications/route.ts
│   ├── components/
│   ├── lib/
│   │   ├── supabase/client.ts
│   │   ├── supabase/server.ts
│   │   ├── twilio.ts
│   │   ├── resend.ts
│   │   └── payments.ts
│   └── types/
├── tests/
├── .env.example
└── CLAUDE.md
```

## Schéma de base de données (Supabase SQL)
```sql
create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  zone text,
  mobile_money_operator text,
  referral_code text unique default substr(md5(random()::text), 1, 8),
  referred_by uuid references public.profiles(id),
  role text not null default 'driver' check (role in ('driver','operator','admin')),
  notify_whatsapp boolean not null default true,
  notify_email boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'inactive' check (status in ('inactive','active','expired','cancelled')),
  cleanings_remaining int not null default 0,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table public.stations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  zone text not null,
  address text,
  active boolean not null default true
);

create table public.cleanings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  station_id uuid references public.stations(id),
  kind text not null check (kind in ('subscription','unit','free')),
  amount_xof int not null default 0,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null,
  reference text unique not null,
  amount_xof int not null,
  status text not null default 'pending' check (status in ('pending','paid','failed')),
  created_at timestamptz not null default now()
);

create table public.communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  zone text not null,
  created_at timestamptz not null default now()
);

create table public.community_members (
  community_id uuid references public.communities(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (community_id, user_id)
);

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.stations enable row level security;
alter table public.cleanings enable row level security;
alter table public.payments enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;

create policy profiles_select_own on public.profiles for select using (auth.uid() = id);
create policy profiles_update_own on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id and role = 'driver');
create policy profiles_insert_own on public.profiles for insert with check (auth.uid() = id and role = 'driver');

create policy subs_select_own on public.subscriptions for select using (auth.uid() = user_id);
create policy cleanings_select_own on public.cleanings for select using (auth.uid() = user_id);
create policy payments_select_own on public.payments for select using (auth.uid() = user_id);

create policy stations_read_all on public.stations for select using (active = true);
create policy communities_read_all on public.communities for select using (true);

create policy members_select_own on public.community_members for select using (auth.uid() = user_id);
create policy members_join on public.community_members for insert with check (auth.uid() = user_id);
create policy members_leave on public.community_members for delete using (auth.uid() = user_id);
```
Règles : les écritures sur subscriptions, cleanings et payments passent uniquement par les routes API avec la clé service_role (jamais depuis le navigateur). Un trigger doit créer la ligne profiles à l'inscription.

## Variables d'environnement
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
PAYMENT_PROVIDER_API_KEY=
PAYMENT_PROVIDER_SITE_ID=
PAYMENT_WEBHOOK_SECRET=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=
```
Crée et maintiens .env.example avec les noms sans valeurs. Seules les variables NEXT_PUBLIC_ sont exposées au navigateur.

## Conventions de code et de commits
- TypeScript strict, composants fonctionnels, pas de any.
- Travaille sur une branche dédiée par fonctionnalité : feat/<nom>, fix/<nom>, chore/<nom>. Ne pousse jamais directement sur main.
- Fais des commits réguliers et petits, au format Conventional Commits (feat:, fix:, chore:, docs:, test:, ci:).
- Ouvre une pull request par fonctionnalité ; la CI doit être verte avant fusion.
- Textes d'interface en français, montants affichés en FCFA (format 3 000 FCFA).
- Valide toutes les entrées des routes API avec zod.

## Plan d'exécution
### Étape 1 : Socle
- [ ] Initialiser Next.js, Tailwind, ESLint, Vitest. Vérifier : npm run build passe.
- [ ] Ajouter .github/workflows/ci.yml (npm ci, lint, test, build). Vérifier : la CI passe sur une PR.
- [ ] Définir le thème Tailwind : primaire #48E57F, texte #FAFAFA, fond #0F1115, accent #FFC400.

### Étape 2 : Supabase
- [ ] Créer la migration avec le schéma et les politiques RLS ci-dessus, plus le trigger de création de profil.
- [ ] Configurer les clients Supabase navigateur et serveur (@supabase/ssr). Vérifier : un utilisateur peut s'inscrire par email puis par Google.
- [ ] Écrire un test qui prouve qu'un utilisateur ne lit pas les données d'un autre.

### Étape 3 : Pages publiques
- [ ] Landing page : héros, étapes, cartes de prix (500 FCFA et 3 000 FCFA/mois), FAQ, bouton WhatsApp.
- [ ] Pages login et signup. Vérifier : redirection vers /dashboard après connexion.

### Étape 4 : Tableau de bord et paramètres
- [ ] Middleware qui protège /dashboard, /settings, /communities.
- [ ] Dashboard : statut d'abonnement, nettoyages restants, historique, code de parrainage.
- [ ] Paramètres : mise à jour du profil, zone, opérateur Mobile Money, préférences de notification.

### Étape 5 : Communautés
- [ ] Liste des communautés, rejoindre et quitter, classement de parrainage par zone.

### Étape 6 : Paiement Mobile Money
- [ ] Route POST /api/payments/checkout : crée un paiement pending et renvoie l'URL de l'agrégateur.
- [ ] Route POST /api/payments/webhook : vérifie la signature avec PAYMENT_WEBHOOK_SECRET, marque le paiement paid, active l'abonnement (8 nettoyages, +30 jours). Idempotent sur reference.
- [ ] Tests unitaires du webhook (signature invalide, doublon, succès).

### Étape 7 : Enregistrement des nettoyages
- [ ] Route POST /api/cleanings réservée aux rôles operator et admin : décrémente cleanings_remaining ou enregistre un nettoyage à l'unité.

### Étape 8 : Notifications
- [ ] Reçu de paiement par WhatsApp (Twilio) et email (Resend).
- [ ] Rappel de renouvellement 3 jours avant current_period_end (cron Vercel quotidien).
- [ ] Respecter les préférences notify_whatsapp et notify_email.

### Étape 9 : Déploiement
- [ ] Configurer les variables sur Vercel (Production et Preview), déployer, brancher le domaine.
- [ ] Test de bout en bout : inscription, paiement de test, nettoyage, notification.

## Commandes
```
npm run dev      # serveur de développement
npm run lint     # ESLint
npm run test     # Vitest
npm run build    # build de production
npx supabase db push   # appliquer les migrations
```

## Règles de sécurité
- N'expose jamais une clé secrète côté client : SUPABASE_SERVICE_ROLE_KEY, TWILIO_AUTH_TOKEN, RESEND_API_KEY, PAYMENT_PROVIDER_API_KEY et PAYMENT_WEBHOOK_SECRET restent côté serveur uniquement.
- Ne commite jamais .env.local ni aucun secret.
- Active RLS sur toutes les tables et teste les politiques.
- Vérifie la signature de chaque webhook et rends-le idempotent.
- Valide et assainis toutes les entrées côté serveur.
- Limite le débit des routes publiques (inscription, envoi de messages) pour éviter les abus de SMS.
- Le rôle d'un utilisateur ne doit jamais être modifiable depuis le client.
@AGENTS.md
