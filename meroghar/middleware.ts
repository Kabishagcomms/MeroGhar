
import { NextRequest, NextResponse } from 'next/server'
import { httpOnlyCookie } from './src/configs/constant'
import { api } from './src/api/api'
import createMiddleware from 'next-intl/middleware';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ne'],
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  
  // Use the pathname as the default locale prefix
  localePrefix: 'as-needed'
});

// Export the middleware handler
export default intlMiddleware;

// Configure matcher to apply this middleware to all routes
export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - all files in the public folder
  matcher: ['/((?!api|_next|.*\\..*).*)']
};