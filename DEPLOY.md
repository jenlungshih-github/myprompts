# Deploying Chinese Prompts to Cloudflare Pages

This guide explains how to deploy the **Chinese Prompts** application to Cloudflare Pages.

## Prerequisites
- A [Cloudflare account](https://dash.cloudflare.com/sign-up).
- The project built successfully locally (optional but recommended to verify).

## Step 1: Build the Project
Before deploying, ensure the project builds correctly.
```bash
npm run build
```
This will create a `dist` folder containing the static files.

---

## Method 1: Direct Upload (Drag & Drop) - Easiest
Suitable for quick, one-time deployments.

1.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Go to **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
3.  Name your project (e.g., `chinese-prompts`).
4.  Drag and drop the `dist` folder (generated in Step 1) into the upload area.
5.  Click **Deploy Site**.

---

## Method 2: Git Integration (Recommended)
Best for continuous deployment. Updates automatically when you push to GitHub/GitLab.

1.  Push your code to a Git repository (GitHub/GitLab).
2.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3.  Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4.  Select your repository.
5.  Configure the build settings:
    - **Framework preset**: `Vite`
    - **Build command**: `npm run build`
    - **Build output directory**: `dist`
6.  Click **Save and Deploy**.

---

## Method 3: Wrangler CLI
Deploy directly from your terminal.

1.  Install Wrangler globally (if not already installed):
    ```bash
    npm install -g wrangler
    ```
2.  Login to Cloudflare:
    ```bash
    wrangler login
    ```
3.  Deploy the `dist` folder:
    ```bash
    npx wrangler pages deploy dist --project-name chinese-prompts
    ```
    *Select "Create a new project" if prompted.*

## Troubleshooting
- **Routing Issues**: If you use React Router and refreshing a page gives a 404, you may need to add a `_redirects` file to the `public` folder with the content: `/* /index.html 200`. (Note: This app currently uses simple state-based routing, so this shouldn't be an issue).
