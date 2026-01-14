# Copilot Instructions for Edward's Blog

## Project Overview
React 19 + Vite 7 static blog with MDX content, focused on Linux server administration and Apple tutorials. Content is organized by sections (linux, apple), with dynamic routing and file-based post discovery.

## Architecture

### Content System
- **Posts are MDX files** in `src/pages/{section}/` with frontmatter metadata
- **Auto-discovery**: Vite's `import.meta.glob` dynamically imports all MDX files and their frontmatter
- **Routing pattern**: `/linux/slug` → renders `src/pages/linux/slug.mdx` 
- **Sorting**: Posts sorted by `priority` field (lower = higher priority), then by `publishedAt` date

### Key Files
- [src/lib/posts.ts](../src/lib/posts.ts): Centralized post discovery via `import.meta.glob`, exports `getPosts(section)` and `formatDate()`
- [src/pages/section-post.tsx](../src/pages/section-post.tsx): Dynamic MDX renderer, handles hash anchor navigation
- [src/lib/mdx-components.tsx](../src/lib/mdx-components.tsx): Global MDX components available without imports
- [vite.config.ts](../vite.config.ts): MDX pipeline with remark/rehype plugins (frontmatter, GFM, syntax highlighting)

### Import Alias
- **`app/*`** resolves to `src/*` (configured in both [tsconfig.json](../tsconfig.json) and [vite.config.ts](../vite.config.ts))
- Always use `app/` imports, never relative `../` paths from non-adjacent directories

## Adding New Content

### Create a New Post
1. Add MDX file to `src/pages/{section}/` (e.g., `src/pages/linux/docker-swarm.mdx`)
2. Include frontmatter with required fields:
   ```mdx
   ---
   title: 'Docker Swarm Setup Guide'
   publishedAt: '2026-01-14'
   priority: 10
   icon: 'docker.webp'
   ---
   ```
3. Icons go in `public/icons/` and reference as just filename (e.g., `icon: 'docker.webp'`)
4. No route registration needed - auto-discovered via glob imports

### Add a New Section
1. Create directory `src/pages/{section}/`
2. Update [src/lib/posts.ts](../src/lib/posts.ts): Add section to `Section` type and `postsBySection`
3. Update [App.tsx](../src/App.tsx): Add routes for section listing and posts
4. Update components that use section-specific logic ([doc-ref.tsx](../src/components/doc-ref.tsx), [post-link.tsx](../src/components/post-link.tsx))

## MDX Components

### Available Without Imports
All components in [src/lib/mdx-components.tsx](../src/lib/mdx-components.tsx) are globally available in MDX:
- `<GitHubRepo url="..." />` - Displays repo card with stars/forks
- `<DocRef path="slug" />` - Links to other posts with benefits list
- `<DocRefList><DocRef path="..." />...</DocRefList>` - Grouped doc references
- `<PostLink path="slug">text</PostLink>` - Inline post links
- `<img>` - Auto-upgraded to zoomable image viewer
- `<pre>` - Auto-upgraded with copy button

### Custom Components
If creating new MDX components:
1. Add to `src/components/`
2. Export from [mdx-components.tsx](../src/lib/mdx-components.tsx) to make globally available
3. Use React hooks if needed (MDX supports full React)

## Styling

### Tailwind v4 Conventions
- Using Tailwind CSS v4 with `@import 'tailwindcss'` in [global.css](../src/global.css)
- Dark mode via `next-themes` with class strategy (`class="dark"`)
- Custom decorative SVG backgrounds defined in `body::before` and `body::after`
- Responsive: Mobile-first, max-width 2xl centered layout

### Code Syntax Highlighting
- Powered by Shiki via `rehype-pretty-code`
- Dual theme: `github-light` / `github-dark` (theme-aware)
- Line numbers, word highlighting, and title support work out of box in MDX code blocks

## Development Workflow

### Commands
- `pnpm dev` - Start dev server (with `--host` for network access)
- `pnpm build` - Production build
- `pnpm preview` - Preview production build
- `pnpm up` - Update dependencies via taze

### Common Tasks
- **Testing MDX changes**: Just save the file, hot reload works
- **Adding dependencies**: Use `pnpm add <package>`
- **Debugging post metadata**: Check browser console for `import.meta.glob` output
- **Hash anchor issues**: Implemented with delay in [section-post.tsx](../src/pages/section-post.tsx)#L51-L62

## Cross-References Between Posts

### DocRef Pattern
Use `<DocRef>` for prerequisite documentation at start of posts:
```mdx
<DocRefList>
  <DocRef path="getting-started" />
  <DocRef path="nginx" />
</DocRefList>
```

### PostLink Pattern  
Use `<PostLink>` for inline references:
```mdx
See <PostLink path="./getting-started">the setup guide</PostLink> for details.
```

Both support relative (`./slug`) and absolute (`/linux/slug`) paths.

## Deployment
- **Platform**: Vercel (see [vercel.json](../vercel.json))
- **Analytics**: Vercel Analytics enabled via `@vercel/analytics` in [App.tsx](../src/App.tsx)
- **Build output**: Static SPA, all routes handled by `index.html`
