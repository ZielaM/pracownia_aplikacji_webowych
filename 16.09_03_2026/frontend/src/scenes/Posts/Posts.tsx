import type { Post } from "../../types/Post/Post.ts";
import styles from './Posts.module.scss'
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

export default function Posts() {

  const { isPending, error, data: posts, isFetching } = useQuery<Array<Post>>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/wpis');
      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.status}`);
      }
      return await response.json();
    }
  });

  return (
    <div className={styles.Posts}>
      {isFetching && (
        <div className={styles.PostsLoading}>
          Trwa ładowanie danych...
        </div>
      )}
      {error && (
        <div className={styles.PostsError}>
          Wystąpił nieoczekiwany błąd 😭 <br />
          {error.message}
        </div>
      )}
      {!isPending && !isFetching && !error && (
        <>
          {posts.length === 0 && (
            <div className={styles.PostsError}>
              Brak wpisów
            </div>
          )}
          {posts.map(p => (
            <div className={styles.PostsPost} key={p.id}>
              <h5
                className={styles.PostsPostTitle}
              >
                {p.title}
              </h5>
              <p
                className={styles.PostsPostBody}
              >
                {p.content ? p.content.substring(0, 50) : ''}...
              </p>
              <Link
                to={"/wpisy/" + p.id}
                className={styles.PostsPostLink}
              >
                Przejdź do wpisu
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
