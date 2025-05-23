# Job Board Application

A modern job board web application with public job listings and an admin dashboard for managing job postings. Built with Next.js, MongoDB, and Tailwind CSS.

## Features

### Public Features
- Browse and search job listings
- View detailed job information
- Apply to jobs through external links
- Responsive design for all devices

### Admin Features
- Secure admin login
- Dashboard with job statistics
- Create, edit, and delete job listings
- Toggle job visibility (active/inactive)
- Application tracking

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API routes
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom theming

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Atlas account

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/job-board.git
cd job-board
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Rename `.env.local.example` to `.env.local` and update the variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD_HASH=your_bcrypt_hashed_password
```

4. Generate a password hash

Use the following command to generate a bcrypt hash for your admin password:

```bash
npx bcrypt-cli your_password
```

Place the generated hash in the `.env.local` file.

5. Start the development server

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## MongoDB Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database named `jobboard`
4. Create a collection named `jobs`
5. Get your connection string and add it to `.env.local`

## Deployment

This application can be deployed to Vercel or any other serverless platform that supports Next.js:

```bash
npm run build
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
