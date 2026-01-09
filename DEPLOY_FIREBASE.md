# Deploying to Google Firebase Hosting

Follow these steps to deploy your app to Firebase and connect your domain `aichildren.us`.

## Prerequisites
- A Google Account (your Workspace account).
- Node.js installed (you already have this).

## Step 1: Install Firebase CLI
Open your terminal (in this VS Code window) and run:
```bash
npm install -g firebase-tools
```

## Step 2: Login to Firebase
```bash
firebase login
```
*This will open your browser. Log in with your `aichildren.us` Google account.*

## Step 3: Initialize Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/) in your browser.
2.  Click **Add project** (or "Create a project").
3.  Name it `chinese-prompts` (or similar).
4.  Disable Google Analytics (optional, simpler for now).
5.  Click **Create project**.

Once the project is created in the console, return to VS Code terminal:
```bash
firebase init hosting
```
- **Select**: `Use an existing project` -> Choose the project you just created.
- **Public directory**: `dist` (Press Enter).
- **Configure as a single-page app?**: `Yes` (Type `y` and Enter).
- **Set up automatic builds and deploys with GitHub?**: `No` (Type `n` and Enter).
- **File dist/index.html already exists. Overwrite?**: `No` (Type `n` and Enter).

## Step 4: Build and Deploy
Build the latest version of your app:
```bash
npm run build
```

Deploy to Firebase:
```bash
firebase deploy
```

## Step 5: Connect Custom Domain
1.  Go back to your project in the [Firebase Console](https://console.firebase.google.com/).
2.  Click **Hosting** in the left sidebar.
3.  Click **Add custom domain**.
4.  Enter `aichildren.us`.
5.  Follow the instructions to add the **TXT records** and **A records** to your DNS provider (where you bought the domain).
    - *Note: It may take up to 24 hours for the domain to verify, but usually it's much faster.*
