# Rishabh Dubey - Portfolio

A modern, highly-optimized, single-page Next.js portfolio built for a Frontend Engineer.

## Technologies Used
- **Framework**: Next.js 14+ (App Router), React 18
- **Language**: TypeScript
- **Styling**: Vanilla CSS in JS (Custom variables, grids, flexbox, IntersectionObservers for scroll animations)
- **Backend**: Next.js Serverless API Route (`app/api/contact/route.ts`)
- **Email Service**: `nodemailer` (via SMTP/Gmail)

## Features
- **Highly Performant**: Fast load times optimized with Next.js features and raw CSS (no heavy styling libraries).
- **Responsive Design**: Designed to work beautifully from small mobile screens to large desktop monitors.
- **Scroll Animations**: Dynamic unveil animations utilizing `IntersectionObserver`.
- **Spam Protection**: The contact form features an invisible honeypot and a simple math captcha to block spam bots effortlessly.
- **Form Mailer**: Directly sends emails to the portfolio owner using `nodemailer`. Includes auto-reply for prospective clients!

## Development Scripts
- `npm run dev`: Starts the local development server on `http://localhost:3000`.
- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.

## Contact Form Setup
To setup the contact form, you must provide the following environment variables in a `.env.local` file:
```env
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
OWNER_EMAIL="your-email@gmail.com"
```
Ensure you create an [App Password](https://support.google.com/accounts/answer/185833) in your Google Account for `SMTP_PASS`, as standard passwords won't work with modern security measures.
