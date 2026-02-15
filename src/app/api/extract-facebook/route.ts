import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { urls } = await request.json();
        
        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json({ error: 'No URLs provided' }, { status: 400 });
        }

        const extractedImages: { name: string; url: string }[] = [];

        for (const url of urls) {
            try {
                // Handle different Facebook URL formats
                let postUrl = url;
                
                // If it's already a direct CDN URL, use it
                if (url.includes('fbcdn.net')) {
                    extractedImages.push({
                        name: `Facebook Photo ${extractedImages.length + 1}`,
                        url: url
                    });
                    continue;
                }

                // For Facebook post URLs, we'll try to construct the oEmbed API URL
                // Note: Facebook oEmbed requires an access token
                // For now, we'll add the URL as-is and the admin can manually update with actual image URLs
                extractedImages.push({
                    name: `FB Post ${extractedImages.length + 1}`,
                    url: url
                });

            } catch (error) {
                console.error(`Error processing URL ${url}:`, error);
            }
        }

        return NextResponse.json({ images: extractedImages });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Failed to process URLs' }, { status: 500 });
    }
}
