export interface IBlogPostUser {
    github_username: string;
    name: string;
    profile_image: string;
    profile_image_90: string;
    twitter_username: string;
    user_id: number;
    username: string;
    website_url: string;
}

export interface IBlogPost {
    body_markdown: string;
    canonical_url: string;
    comments_count: number;
    cover_image: string;
    description: string;
    id: string;
    page_views_count: number;
    path: string;
    positive_reactions_count: string;
    public_reactions_count: number;
    published: boolean;
    published_at: string;
    published_timestamp: string;
    reading_time_minutes: number;
    slug: string;
    tag_list: string[];
    title: string;
    type_of: string;
    url: string;
    user: IBlogPostUser;
}