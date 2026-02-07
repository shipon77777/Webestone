import { MetadataRoute } from 'next'
import { getData } from '@/actions/admin'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://webestone.com' // Replace with your domain

    // Static routes
    const routes = [
        '',
        '/about',
        '/contact',
        '/blogs',
        '/services',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
    }))

    // Dynamic service routes
    const services = await getData('services.json') || []
    const dynamicRoutes = services.map((service: any) => ({
        url: `${baseUrl}${service.href}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...routes, ...dynamicRoutes]
}
