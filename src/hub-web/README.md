# Microcks Hub Web Application [hub.microcks.io](https://hub.microcks.io/)

This pboject based on [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com/).

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.ico
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
| `pnpm dlx shadcn@latest add [component]` | Add a new component from shadcn/ui |

## Development server

Start the hub.microcks.io backend server as described in the [backend README](../../server/README.md).

Run `pnpm run dev` for a dev server. Navigate to `http://localhost:4321/`. The app will automatically reload if you change any of the source files.
