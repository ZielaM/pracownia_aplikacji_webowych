import { Link } from "react-router";
import { posts } from "../data/mockData";
import "./style.scss";

export function Home() {
    const publishedPosts = posts.filter(p => p.published);

    return (
        <div className="home container">
            <header className="home-header">
                <h1>Latest Posts</h1>
                <p>Welcome to our tech and lifestyle blog.</p>
            </header>

            <div className="posts-grid">
                {publishedPosts.map(post => (
                    <article key={post.id} className="post-card">
                        <div className="post-meta">
                            <span className="category-tag">{post.kategoria?.name}</span>
                            <span className="date">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h2>{post.title}</h2>
                        <p className="excerpt">
                            {post.content.substring(0, 120)}...
                        </p>
                        <Link to={`/post/${post.id}`} className="read-more">
                            Read Article &rarr;
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}