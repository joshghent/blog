# My Website

> Source code for [joshghent.com](https://joshghent.com)

## Goals

- Bandwidth conscience design
- Zero production dependencies
- Minimal dependencies in general

## Getting Started

#### 1. Clone this repo

```
git clone git@github.com:joshghent/blog.git
```

#### 2. Change into the working directory

```
cd blog
```

#### 3. Install dependencies

```
pnpm install
```

#### 4. Work locally

Watches for changes and serves locally on http://localhost:8080

```
pnpm run serve
```

#### 5. Create a production build

```
pnpm run build
```

#### 6. Validate templates

Rejects Jinja2 syntax that Nunjucks accepts and silently ignores, such as an inline condition on a `for` tag. Runs in CI before the build.

```
pnpm run validate:templates
```

#### 7. Check accessibility

Runs axe and HTML CodeSniffer against a sample of built pages in both themes (WCAG 2.1 AA). Also runs in CI.

```
pnpm run build && pnpm run check:accessibility
```
