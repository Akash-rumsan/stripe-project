# Local Development Setup

This guide will help you set up the project for local development.

## Prerequisites

- [Node.js](https://nodejs.org/) (v22 or above recommended)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/get-started) (for running Supabase locally)

## Getting Started

1. **Install dependencies**

```bash
pnpm install
```

2. **Run Supabase locally**

- In the Supabase repo, go to the `docker` directory and copy the example environment file:

  ```bash
  cp .env.example .env
  ```

- Edit the new `.env` file and update the SMTP section with your SMTP credentials.

- Start Supabase locally:

  ```bash
  source .env && supabase start
  ```

- Note the following variables from the Supabase `.env` file (you will need them for the Next.js app):

  - `DASHBOARD_USERNAME` (for Supabase dashboard login)
  - `DASHBOARD_PASSWORD` (for Supabase dashboard login)
  - `SUPABASE_PUBLIC_URL` (for Next.js app)
  - `ANON_KEY` (for Next.js app)

3. **Set up environment variables**

Copy the example environment file and update it as needed:

```bash
cp env.example .env
```

Edit `.env` and fill in the required values. You will need Supabase credentials (see above).

4. **Configure the Next.js app**

- Update your `.env.local` file with the `SUPABASE_PUBLIC_URL` and `ANON_KEY` from your Supabase instance.

5. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

6. **Update the database and generate migration files**

- To make changes to the database schema, use the SQL Editor in the Supabase dashboard.
- After applying your changes, generate a migration file to keep track of schema updates:

  ```bash
  supabase db diff --file migrations/$(date +"%Y%m%d%H%M%S")_migration.sql
  ```

- This will create a new migration file in the `migrations` directory with a timestamp.
- Now, If you want to dump the data as well for updating the dev/prod data,
  use the following bash command:

```bash
supabase db dump --local --data-only > supabase/seed.sql
```

> **Note:** If you restart Supabase, your anon key and other credentials will remain intact since we are using same config.toml. Restarting does not destroy the anon key.
