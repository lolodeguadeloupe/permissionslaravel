import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostsList = ({ initialPosts }) => {
    const [posts, setPosts] = useState(initialPosts.data);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialPosts.next_page_url !== null);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) return;
        loadMorePosts();
    };

    const loadMorePosts = async () => {
        setLoading(true);
        const nextPage = page + 1;
        try {
            const response = await axios.get(`/posts/load-more?page=${nextPage}`);
            const newPosts = response.data.data;
            setPosts([...posts, ...newPosts]);
            setPage(nextPage);
            setHasMore(response.data.next_page_url !== null);
        } catch (error) {
            console.error("Erreur lors du chargement des posts:", error);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto my-12 space-y-12">
            {posts.map(post => (
                <div key={post.id}>
                    <h1 className="font-bold text-3xl">
                        {post.id}: {post.title}
                    </h1>
                    <p className="mt-2 text-lg">{post.teaser}</p>
                </div>
            ))}
            {loading && <p>Chargement...</p>}
            {!hasMore && <p>Fin des posts</p>}
        </div>
    );
};

export default PostsList;