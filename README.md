# Developer Portfolio + CMS

React + Vite + Tailwind CSS v4, with Sveltia CMS for editing content at /admin.

## Run it
    npm install
    npm run dev

Site: http://localhost:5173  -  Admin: http://localhost:5173/admin/index.html

## Where content lives
    content/settings/site.json      name, headline, about, socials, expertise, stack, testimonials
    content/projects/*.json         one file per project
    public/uploads/                 images uploaded through the admin

Any new file in content/projects appears on the site automatically.

## One-time CMS setup
1. Push this project to a GitHub repo and deploy it on Vercel (framework preset: Vite).
2. In public/admin/config.yml, change `repo: your-username/your-repo` to your repo. Commit and push.
3. Create a GitHub fine-grained personal access token: Settings > Developer settings >
   Fine-grained tokens > only this repository > Repository permissions > Contents: Read and write.
4. Open https://your-site.vercel.app/admin/ and choose "Sign In with Token". Paste the token.

Local editing without GitHub: with `npm run dev` running, open /admin/index.html in Chrome or Edge,
choose "Work with Local Repository" and select this project folder. Changes are written straight to disk.

## Daily routine
In /admin > Projects: open today's project, set Status to Shipped, add the cover image, live/code links,
tech and a short write-up, tick "Show on home page" to feature it, then Save.
Set tomorrow's project to Building. Saving commits to GitHub and Vercel redeploys in about a minute.
