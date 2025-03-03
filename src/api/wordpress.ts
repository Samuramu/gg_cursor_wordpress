import axios from 'axios';
import { Post } from '../types/wordpress';

const api = axios.create({
    // Use environment variable to switch between dev/prod
    baseURL: process.env.REACT_APP_API_URL || 'https://ggtude.com/wp-json/wp/v2'
});

export const getPosts = () => 
  fetch(`${process.env.REACT_APP_API_URL}/posts?_embed&per_page=10`)
    .then(res => res.json());

export const getPost = async (slug: string): Promise<Post> => {
    const { data } = await api.get(`/posts?slug=${slug}&_embed`);
    return data[0];
}

export const getRecentPosts = async () => {
    const { data } = await api.get('/posts?per_page=10&_embed', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return data;
}