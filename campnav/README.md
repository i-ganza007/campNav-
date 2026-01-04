# CampNav - Summer Camp Management App

A Next.js application for creating and browsing summer camps using Zustand for state management.

## Features

- **Browse Camps**: View all available camps with filtering and search capabilities
- **Create Camps**: Add new camps with detailed information including:
  - Camp name and description
  - Location and dates
  - Price and capacity
  - Age range and category
  - Optional image URL
- **Filter & Search**: 
  - Search by camp name or description
  - Filter by category (Adventure, Sports, Arts, STEM, etc.)
  - Filter by location
- **Persistent Storage**: All camps are stored using Zustand with persistence

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Zustand** - State management with persistence
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
campnav/
├── app/
│   ├── page.tsx              # Homepage
│   ├── browse/
│   │   └── page.tsx          # Browse camps page
│   ├── create-camp/
│   │   └── page.tsx          # Create camp form
│   └── layout.tsx
├── components/
│   └── ui/                   # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── textarea.tsx
├── store/
│   └── store.ts              # Zustand store with camp management
└── lib/
    └── utils.ts
```

## Usage

### Creating a Camp

1. Navigate to the "Create a Camp" page
2. Fill in all required fields:
   - Camp name
   - Description
   - Location
   - Category
   - Start and end dates
   - Price and capacity
   - Age range
3. Optionally add an image URL
4. Click "Create Camp" to save

### Browsing Camps

1. Navigate to the "Browse Camps" page
2. Use the search bar to find camps by name or description
3. Filter by category using the category buttons
4. Filter by location using the location input
5. Click "Clear All Filters" to reset

## State Management

The app uses Zustand for state management with the following features:

- **Add Camp**: Create new camps with auto-generated IDs
- **Get Camps**: Retrieve all camps
- **Filter Camps**: Filter by category, location, price range, or search term
- **Persistence**: All data is persisted to localStorage

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
