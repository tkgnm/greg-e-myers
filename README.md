# greg-e-myers

This website will soon supercede [gregemyers](https://github.com/tkgnm/gregemyers). The backend that feeds this site is a Strapi application, and the source code can be found at [this link](https://github.com/tkgnm/gregemyers-api). 

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

## Deploy

This website is deployed on Vercel. 

## Rerendering

This website is prerendered. There is a deploy hook on vercel that is triggered whenever a change in the [CMS](https://gregemyers-api-fly.fly.dev/admin/auth/login) happens. 
