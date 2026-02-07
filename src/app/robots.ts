import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            disallow: '/',
        },
        // Replace with your production URL when ready
        sitemap: 'https://webestone.com/sitemap.xml',
    }
}
