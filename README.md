## local development

First, make sure that you have `EXTERNAL_API_URL`, `API_URL` AND `API_PORT` set in your environment.

Then, run `npm ci` to install dependencies.

To start local development, on client app run:

```bash
npm run dev:client
```

and for the server app run:

```bash
npm run dev:server
```

by default the server app will be started on port `3000` and client app will be started on port `3001`.
