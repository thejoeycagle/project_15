# ClearPay247

Modern payment portal for debt resolution with AI-powered collection assistance.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ENCRYPTION_KEY=your_encryption_key
```

## Deployment

The site is deployed on Netlify with continuous deployment from the main branch.

### Build Settings
- Build command: `npm run build`
- Publish directory: `dist`