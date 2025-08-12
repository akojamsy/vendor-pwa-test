# Vendor PWA

A modern, PWA-ready Next.js application for managing products and prices with inline editing capabilities.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 🧩 **shadcn/ui** components
- 📱 **PWA Support** with service worker
- 🔄 **RTK Query** for data management
- ✏️ **Inline Editing** for products
- 📱 **Mobile-First** responsive design
- 🔒 **TypeScript** for type safety

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Redux Toolkit + RTK Query
- **PWA**: next-pwa, service worker
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd vendor-pwa-1
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## PWA Features

This application is configured as a Progressive Web App with:

- **Service Worker**: Caches resources for offline functionality
- **Web App Manifest**: Provides app-like experience
- **Install Prompt**: Users can install the app to their home screen
- **Offline Support**: Basic offline functionality with cached resources

## Usage

### Adding Products

1. Click the "Add Product" button
2. Fill in the product details:
   - Name
   - Description
   - Price
   - Category
   - Image URL (optional)
3. Click "Add Product" to save

### Editing Products

1. Click the edit (pencil) icon on any product card
2. Modify the fields inline
3. Click the save (checkmark) icon to save changes
4. Click the cancel (X) icon to discard changes

### Deleting Products

1. Click the delete (trash) icon on any product card
2. Confirm the deletion

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main products page
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── providers.tsx   # Redux provider
│   └── pwa-register.tsx # PWA registration
└── lib/                # Utilities and configurations
    ├── api/            # RTK Query APIs
    ├── store.ts        # Redux store
    └── hooks.ts        # Typed Redux hooks
```

## Data Storage

Currently, the application uses localStorage for data persistence. In a production environment, you would:

1. Replace the localStorage calls in `src/lib/api/productsApi.ts`
2. Connect to a real backend API
3. Implement proper error handling and loading states

## Customization

### Adding New Components

Use shadcn/ui to add new components:

```bash
npx shadcn@latest add <component-name>
```

### Styling

Modify `src/app/globals.css` for global styles and use Tailwind CSS classes for component-specific styling.

### PWA Configuration

Update `public/manifest.json` and `next.config.js` to customize PWA behavior.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository or contact the development team.
# vendor-pwa-test
