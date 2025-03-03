import axios from 'axios';
import { Post } from '../types/wordpress';

const api = axios.create({
    // Use environment variable to switch between dev/prod
    baseURL: process.env.REACT_APP_API_URL || 'https://ggtude.com/wp-json/wp/v2'
});

export const getPosts = async (): Promise<Post[]> => {
    const { data } = await api.get('/posts');
    return data;
};

export const getPost = async (slug: string): Promise<Post> => {
    const { data } = await api.get(`/posts?slug=${slug}`);
    return data[0];
}; 