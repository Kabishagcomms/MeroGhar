// @ts-nocheck
import {routing } from './i18n/routing'
import createMiddleware from 'next-intl/middleware';

// Create the next-intl middleware
export default createMiddleware(routing);

// Configure matcher to apply this middleware to all routes
export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - all files in the public folder
  matcher: ['/((?!api|_next|.*\\..*).*)']
};