export interface Post {
    id: number;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    date: string;
    slug: string;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text?: string;
        }>;
    };
} 