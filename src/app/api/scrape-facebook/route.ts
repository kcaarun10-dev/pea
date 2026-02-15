import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();
        
        if (!url) {
            return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
        }

        // Validate Facebook URL
        if (!url.includes('facebook.com') && !url.includes('fb.com') && !url.includes('fb.watch')) {
            return NextResponse.json({ error: 'Invalid Facebook URL' }, { status: 400 });
        }

        const images: { name: string; url: string }[] = [];

        try {
            // Fetch the Facebook page with more realistic browser headers
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cache-Control': 'max-age=0',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'none',
                    'Sec-Fetch-User': '?1',
                    'DNT': '1',
                },
                redirect: 'follow',
            });

            if (!response.ok) {
                // Facebook blocks scraping - return helpful message
                if (response.status === 400 || response.status === 403 || response.status === 429) {
                    return NextResponse.json({ 
                        error: 'Facebook is blocking automated access. This is common for share links.',
                        images: [],
                        fallback: 'Please use the "Paste Image URLs" method below. Right-click on Facebook images → "Copy image address" and paste them.',
                        status: response.status
                    }, { status: 200 });
                }
                
                return NextResponse.json({ 
                    error: `Failed to fetch page: ${response.status}`,
                    images: [],
                    fallback: 'Please use the "Paste Image URLs" method below.'
                }, { status: 200 });
            }

            const html = await response.text();
            
            // Check if we got a login page or redirect
            if (html.includes('login') || html.includes('Log In') || html.length < 1000) {
                return NextResponse.json({ 
                    error: 'Facebook requires login to view this post.',
                    images: [],
                    fallback: 'Please use the "Paste Image URLs" method below. Right-click on Facebook images → "Copy image address" and paste them.'
                }, { status: 200 });
            }
            
            const $ = cheerio.load(html);

            // Look for image URLs in various places
            // 1. Meta tags (og:image)
            $('meta[property="og:image"], meta[name="og:image"]').each((_, elem) => {
                const src = $(elem).attr('content');
                if (src && src.includes('fbcdn.net') && !images.some(img => img.url === src)) {
                    images.push({
                        name: `FB Photo ${images.length + 1}`,
                        url: src
                    });
                }
            });

            // 2. All img tags
            $('img').each((_, elem) => {
                const src = $(elem).attr('src') || $(elem).attr('data-src');
                if (src && src.includes('fbcdn.net') && src.includes('scontent') && !images.some(img => img.url === src)) {
                    images.push({
                        name: `FB Photo ${images.length + 1}`,
                        url: src
                    });
                }
            });

            // 3. Look for image URLs in script tags (JSON data)
            $('script').each((_, elem) => {
                const scriptContent = $(elem).html() || '';
                // Match scontent.fbcdn.net URLs
                const scontentMatches = scriptContent.match(/https:\/\/scontent[^\s"'<>]+/g);
                if (scontentMatches) {
                    scontentMatches.forEach(url => {
                        const cleanUrl = url.replace(/["'<>;,]+$/, '');
                        if (cleanUrl.includes('fbcdn.net') && !images.some(img => img.url === cleanUrl)) {
                            images.push({
                                name: `FB Photo ${images.length + 1}`,
                                url: cleanUrl
                            });
                        }
                    });
                }
            });

            // 4. Look for data-ploi attribute (Facebook's image data)
            $('[data-ploi], [data-src]').each((_, elem) => {
                const src = $(elem).attr('data-ploi') || $(elem).attr('data-src');
                if (src && src.includes('fbcdn.net') && !images.some(img => img.url === src)) {
                    images.push({
                        name: `FB Photo ${images.length + 1}`,
                        url: src
                    });
                }
            });

            // Remove duplicates and filter for high quality
            const uniqueImages = images.filter((img, index, self) => 
                index === self.findIndex((t) => t.url === img.url)
            );

            // Sort by URL length - longer URLs usually have higher quality parameters
            uniqueImages.sort((a, b) => b.url.length - a.url.length);

            if (uniqueImages.length === 0) {
                return NextResponse.json({ 
                    error: 'No images found on this page.',
                    images: [],
                    fallback: 'The post may be private. Please use the "Paste Image URLs" method below.'
                }, { status: 200 });
            }

            return NextResponse.json({ 
                images: uniqueImages,
                count: uniqueImages.length,
                url: url
            });

        } catch (fetchError) {
            console.error('Fetch error:', fetchError);
            return NextResponse.json({ 
                error: 'Facebook is blocking automated access.',
                images: [],
                fallback: 'Please use the "Paste Image URLs" method below. Right-click on Facebook images → "Copy image address" and paste them.'
            }, { status: 200 });
        }

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ 
            error: 'Failed to process request',
            images: [],
            fallback: 'Please use the "Paste Image URLs" method below.'
        }, { status: 500 });
    }
}
