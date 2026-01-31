import { categories, posts } from "../data/mockData";
import "./style.scss";

export function CategoryHome() {
    const getPostCount = (catId: number) => {
        return posts.filter(p => p.kategoriaId === catId && p.published).length;
    }

    return (
        <div className="category-home container">
            <header className="page-header">
                <h1>Categories</h1>
                <p>Browse articles by topic</p>
            </header>

            <div className="categories-grid">
                {categories.map(cat => (
                    <div key={cat.id} className="category-card">
                        <div className="card-content">
                            <h2>{cat.name}</h2>
                            <span className="count">{getPostCount(cat.id)} posts</span>
                        </div>
                        <div className="card-action">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}