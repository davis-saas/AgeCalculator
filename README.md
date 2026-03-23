# Age Calculator

A modern, bilingual web application that calculates your exact age in years, months, and days between any two dates.

## Features

- 📅 **Precise Age Calculation** - Calculate exact age down to the day
- 🌐 **Bilingual Support** - English and Latvian language options
- 🎨 **Dark/Light Mode** - Toggle between dark and light themes
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 📆 **Calendar Date Picker** - Visual date selection with Monday as first day of week
- ✨ **Modern UI** - Built with React and Tailwind CSS

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Date Handling**: date-fns
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/AgeCalculator.git
cd AgeCalculator

# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build
```

## Deployment to GitHub Pages

This project is configured as a static Vite site optimized for GitHub Pages deployment.

### Setup

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/AgeCalculator.git
   git push -u origin main
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Configure GitHub Pages**
   - Go to your repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/docs`

4. **Deploy static files**
   ```bash
   # Copy built files to docs folder
   cp -r dist/public docs
   ```

   Or create a GitHub Actions workflow to automate this (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '20'
         - run: npm install
         - run: npm run build
         - run: mkdir -p docs && cp -r dist/public/* docs/
         - uses: stefanzweifel/git-auto-commit-action@v4
           with:
             commit_message: 'Deploy to GitHub Pages'
             file_pattern: 'docs/'
   ```

5. **Your site will be live at**: `https://yourusername.github.io/AgeCalculator/`

## Project Structure

```
├── client/              # Frontend React application
│   └── src/
│       ├── pages/      # Page components
│       ├── components/ # UI components
│       ├── lib/        # Utilities and translations
│       └── hooks/      # React hooks
├── shared/             # Shared types and schemas
├── dist/public/        # Built static files (GitHub Pages)
├── vite.config.ts      # Vite configuration with base path
└── package.json        # Dependencies and scripts
```

## Key Files for Deployment

- `dist/public/index.html` - Static entry point for GitHub Pages
- `dist/public/assets/` - Bundled JavaScript and CSS
- `vite.config.ts` - Configured with base path `/AgeCalculator/` for project sites

## Usage

1. **Select Birth Date**: Enter or pick your birth date (day, month, year)
2. **Select Target Date**: Enter or pick the date to calculate age for
3. **View Results**: See exact age breakdown in years, months, and days
4. **Share**: Copy the result to clipboard
5. **Change Language**: Click the globe icon to switch between English and Latvian
6. **Toggle Theme**: Click the moon/sun icon to switch dark/light mode

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Notes

- All calculations are performed locally in your browser
- No data is sent to any server
- Language preference is saved to localStorage
- Theme preference is saved to localStorage
