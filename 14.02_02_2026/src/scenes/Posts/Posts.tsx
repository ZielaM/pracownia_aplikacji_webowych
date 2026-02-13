import { useEffect, useState } from "react"
import type {Post} from "../../types/Post/Post.ts";

import styles from './Posts.module.scss'
import {Link} from "react-router";

export default function Posts() {
  // const [posts, setPosts] = useState<Post[]>([])
  const [posts, setPosts] = useState<Array<Post>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    (() => {
      setIsLoading(true)
    })()
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((json: Array<Post>) => {
        setPosts(json)
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, []);

  return (
    <div className={styles.Posts}>
      {isLoading && (
        <div className={styles.PostsLoading}>
          Trwa ładowanie danych...
        </div>
      )}
      {isError && (
        <div className={styles.PostsError}>
          Wystąpił nieoczekiwany błąd 😭
        </div>
      )}
      {!isLoading && !isError && (
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
                {p.body.substring(0, 50)}...
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
