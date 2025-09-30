# ding-music.nl website/webapplication

Version 0.1.4

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# yarn
yarn dev
```

## Production

### 🚀 Deploy Handleiding — ding-music.nl

Deze handleiding legt stap voor stap uit hoe je de applicatie **ding-music.nl** kunt updaten, herstarten en troubleshooten.

---

#### 📂 Belangrijke paden

- Projectmap: /var/www/vhosts/ding-music.nl/httpdocs

- Ecosystem config (voor PM2): ecosystem.config.cjs

---

#### 🔄 Stappen bij een nieuwe deploy

1. **Ga naar de projectmap:**

```bash
 cd /var/www/vhosts/ding-music.nl/httpdocs
```

Nieuwe code ophalen (bijv. via git):

```bash
git pull origin main
```

(Of upload via rsync/FTP als je niet met git werkt.)

Dependencies installeren:

```bash
npm install
```

Productie build maken:

```bash
npm run build
```

Applicatie herstarten met PM2:

```bash
pm2 restart ding-music.nl
```

⚙️ PM2 commando’s

Status bekijken:

```bash
pm2 list
```

Logs bekijken:

```bash
pm2 logs ding-music.nl
```

Stoppen en opnieuw starten:

```bash
pm2 stop ding-music.nl
pm2 start ecosystem.config.cjs
```

Processen opslaan (zodat ze automatisch terugkomen na reboot):

```bash
pm2 save
pm2 startup systemd
```

(voer het extra commando uit dat PM2 je toont na pm2 startup)

####✅ Controleren of alles werkt

App lokaal bereikbaar?

```bash
curl http://127.0.0.1:3000
```

Website bereikbaar?
Open in de browser:

https://ding-music.nl

####🛠️ Troubleshooting

403 error in de browser
→ Apache reverse proxy niet goed ingesteld of nog niet herstart.

EADDRINUSE foutmelding (port 3000 in gebruik)
Zoek en kill oude processen:

```bash
sudo lsof -i :3000
sudo kill -9 <PID>
pm2 restart ding-music.nl
```

Database errors (Prisma: DATABASE_URL not found)
→ Controleer of DATABASE_URL goed staat in .env of in ecosystem.config.cjs.

App logt errors
→ Bekijk de logs met:

```bash
pm2 logs ding-music.nl
```

💡 Tip

Werk altijd via PM2 om de app te beheren.
Je hoeft de server nooit handmatig te rebooten voor een update — alleen de app via PM2 herstarten is genoeg.
