module.exports = {
  apps: [
    {
      name: 'ding-music.nl',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/vhosts/ding-music.nl/httpdocs',
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: 3000,
        DATABASE_URL: process.env.DATABASE_URL,
      },
    },
  ],
}
