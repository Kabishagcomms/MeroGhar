// @ts-nocheck
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
    locales: ['en', 'ne'],
  
    // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
    defaultLocale: 'en',
    
    // Use the pathname as the default locale prefix
    localePrefix: 'as-needed'
});