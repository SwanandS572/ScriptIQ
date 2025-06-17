# 🚀 ScriptIQ - AI Content Generator

<div align="center">
  <p>An intelligent content generation platform that transforms your ideas into high-quality written content using advanced AI technology.</p>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-how-it-works">How It Works</a>
  </p>
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
</div>

## ✨ Features

- 🎯 **Smart Content Generation** - Create high-quality content with AI assistance
- 🔐 **Secure Authentication** - Google OAuth integration via Clerk
- 🎨 **Multiple Templates** - Various content types for different needs
- 📊 **Content History** - Track and manage all your generated content
- ⚡ **Blazing Fast** - Built with Next.js 15 for optimal performance
- 🎨 **Modern UI** - Clean, responsive interface with Tailwind CSS
- 🔄 **Real-time Preview** - See changes as you type
- 📱 **Fully Responsive** - Works seamlessly across all devices

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Tailwind Variants
- **State Management**: React Context API
- **Forms**: React Hook Form
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **AI Integration**: Google Generative AI
- **Payments**: Razorpay

### DevOps
- **Hosting**: Vercel
- **Database Hosting**: Neon
- **Package Manager**: npm/yarn
- **Linting**: ESLint
- **Build Tool**: Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm (v8+) or yarn (v1.22+)
- PostgreSQL database (local or hosted on Neon)
- Google OAuth credentials
- Clerk account for authentication

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/scriptiq.git
   cd scriptiq
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Database (Neon)
   DATABASE_URL=your_neon_connection_string
   
   # Google Generative AI
   GOOGLE_AI_API_KEY=your_google_ai_key
   
   # Razorpay Payments (optional)
   NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   
   # App Environment
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Database Setup**
   - Ensure your PostgreSQL database is running
   - Run database migrations:
     ```bash
     npx drizzle-kit push:pg
     ```
   - Or start the database studio:
     ```bash
     npm run db:studio
     ```

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open in Browser**
   Visit [http://localhost:3000](http://localhost:3000) to view the application

## 📂 Project Structure

```
scriptiq/
├── app/                    # App router pages
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Protected dashboard routes
│   ├── api/                # API routes
│   ├── _components/        # Shared components
│   ├── landing/            # Marketing pages
│   └── globals.css         # Global styles
│
├── components/            # Reusable UI components
│   ├── ui/                 # UI components (button, input, etc.)
│   └── shared/             # Shared components
│
├── lib/                   # Utility functions
│   ├── db.tsx             # Database configuration
│   └── utils.ts           # Helper functions
│
├── public/                # Static assets
│   ├── images/            # Image assets
│   └── favicon.ico        # Favicon
│
├── types/                 # TypeScript type definitions
├── drizzle/               # Database schema and migrations
├── styles/                # Global styles
├── .env.local             # Environment variables (gitignored)
└── package.json           # Project dependencies
```

## 🔄 How It Works

### 1. User Authentication
- Users sign up/sign in using Google OAuth via Clerk
- Session management is handled automatically
- Protected routes ensure only authenticated users can access the dashboard

### 2. Content Generation
1. User selects a content template (blog post, social media, etc.)
2. Fills in the required prompts and parameters
3. Submits the form which sends a request to the API route
4. API route processes the request and calls Google's Generative AI
5. The AI generates content based on the provided prompts
6. Response is formatted and saved to the database
7. Generated content is displayed to the user with options to edit or save

### 3. Content Management
- All generated content is stored in the PostgreSQL database
- Users can view their generation history
- Content can be edited, copied, or deleted
- Search and filter functionality for easy content discovery

## 📸 Screenshots

*(Add your screenshots here with brief descriptions)*
- **Landing Page**: Showcase of features and call-to-action
- **Dashboard**: Overview of recent generations and quick actions
- **Content Editor**: Interface for creating and editing content
- **History**: List of all generated content with filtering options

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.


## 👨‍💻 Author

- **Swanand Sonawane**
- GitHub: [@SwanandS572](https://github.com/SwanandS572)
<!-- - LinkedIn: [Swanand ](https://linkedin.com/in/swanand-) -->
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Clerk](https://clerk.dev/) for authentication
- [Google Generative AI](https://ai.google.dev/) for content generation
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Drizzle ORM](https://orm.drizzle.team/) for database interactions
- All the amazing open-source libraries that made this project possible

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/scriptiq&type=Date)](https://star-history.com/#yourusername/scriptiq&Date)

---

<div align="center">
  Made with ❤️ using Next.js, TypeScript, and Tailwind CSS
</div>
