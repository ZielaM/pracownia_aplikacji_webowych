import { useParams, Link } from "react-router";
import { posts } from "../data/mockData";
import "./style.scss";

export function PostPage() {
    const { id } = useParams();
    const post = id
        ? posts.find(p => p.id === Number(id))
        : posts.filter(p => p.published)[0];

    if (!post) {
        return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h2>Post not found</h2>
            <Link to="/" style={{ color: 'var(--color-primary)' }}>Back to Home</Link>
        </div>;
    }

    return (
        <div className="post-detail container">
            <Link to="/" className="back-link">&larr; Back to posts</Link>

            <article className="full-post">
                <header>
                    <div className="meta">
                        <span className="cat">{post.kategoria?.name}</span>
                        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                    </div>
                    <h1>{post.title}</h1>
                </header>

                <div className="content">
                    {post.content.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </article>

            <section className="comments-section">
                <h3>Comments ({post.komentarze?.length || 0})</h3>
                <div className="comments-list">
                    {post.komentarze && post.komentarze.length > 0 ? (
                        post.komentarze.map(comment => (
                            <div key={comment.id} className="comment">
                                <div className="comment-header">
                                    <strong>User {comment.id}</strong>
                                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p>{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-comments">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </section>
        </div>
    )
}