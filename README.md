# wraithcode.io

wraithcode.io is a personal site for front-end experiments and writing. It uses [SvelteKit](https://svelte.dev/docs/kit) and runs on [Cloudflare Workers](https://developers.cloudflare.com/workers/).

## Set up

You must have Node.js 22 or later.

1. Install the dependencies:

    ```sh
    npm install
    ```

2. Copy `.env.example` to `.env`. Then set the values in `.env`:

    ```sh
    cp .env.example .env
    ```

    `DEV_TO_API_KEY` is necessary for `/experiments/dev-to-api`. The other pages operate without it.

## Develop

Start the development server:

```sh
npm run dev
```

Then open `http://localhost:5173`.

## Run with Docker

You can also run the development server in a Docker container. Use this procedure if you do not want to install Node.js on your computer.

1. Start the container:

    ```sh
    docker compose up --build
    ```

2. Open `http://localhost:5173`.

3. Change a file on your computer. The page in the browser updates.

4. To stop the container, push `Ctrl+C`, then run:

    ```sh
    docker compose down
    ```

The container reads `.env` if it exists. `DEV_TO_API_KEY` in `.env` is necessary for `/experiments/dev-to-api`.

The container keeps its packages in a different volume. When `package.json` changes, use this command to install the new packages:

```sh
docker compose up --build --renew-anon-volumes
```

Production does not use Docker. Production runs on Cloudflare Workers.

To add a service, for example Postgres, add it to `docker-compose.yml`. Cloudflare D1, KV, R2, and Durable Objects do not need a container, because Wrangler emulates them on your computer.

## Check the code

```sh
npm run lint     # Find lint and format errors.
npm run lint:fix # Repair lint and format errors.
npm run check    # Find type errors.
npm test         # Run the unit tests and the end-to-end tests.
```

## Build and preview

Build the site:

```sh
npm run build
```

Build the site and run it on the local Workers runtime:

```sh
npm run preview
```

## Deploy

GitHub Actions deploys the site to Cloudflare Workers when a change goes into the `main` branch. Refer to `.github/workflows/deploy.yaml`.
