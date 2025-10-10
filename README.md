# FoundHex Landing Page

A modern, production-ready landing page for FoundHex - Building Intelligent Infrastructure for Local Businesses.

## Features

- **Modern Design**: Inspired by top-tier tech companies like Linear, Vercel, and Stripe
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Smooth Animations**: Framer Motion animations with scroll reveals and micro-interactions
- **TypeScript**: Full type safety throughout the codebase
- **Tailwind CSS**: Utility-first CSS for rapid development
- **Performance Optimized**: Built with Vite for lightning-fast development and production builds

## Tech Stack

- **React 18**: Latest React with hooks and modern patterns
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Vite**: Next-generation frontend tooling

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
FoundHex/
├── src/
│   ├── App.tsx          # Main landing page component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles and Tailwind directives
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.ts       # Vite configuration
└── postcss.config.js    # PostCSS configuration
```

## Sections

1. **Hero Section**: Compelling headline with animated hexagon background
2. **Product Showcase**: Detailed Repaxio product information with stats
3. **Our Approach**: How FoundHex builds differently
4. **Why FoundHex**: Company values and differentiators
5. **Technology**: Modern tech stack and security features
6. **Vision**: Future direction and innovation roadmap
7. **CTA Section**: Newsletter signup and partnerships
8. **Footer**: Links, legal, and social media

## Customization

### Colors

Edit the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your custom colors
  },
}
```

### Content

All content is in `src/App.tsx`. Update text, links, and images directly in the component.

### Logo

The hexagon logo is an inline SVG component. Modify the `HexagonIcon` component to customize.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Manual

1. Run `npm run build`
2. Deploy the `dist` folder to your hosting provider

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contact

For questions or support, contact: contact@foundhex.com
