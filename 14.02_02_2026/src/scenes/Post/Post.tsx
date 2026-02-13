import { useEffect, useState } from "react"
import type {Post} from "../../types/Post/Post.ts";

// import styles from './Posts.module.scss'
import {useParams} from "react-router";
import styles from "./Post.module.scss";

export default function Post() {
    const [post, setPost] = useState<Post>({} as Post)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const params = useParams()

    useEffect(() => {
        (() => {
            setIsLoading(true)
        })()
        fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
            .then(response => response.json())
            .then((json: Post) => {
                setPost(json)
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
                    {!post && (
                        <div className={styles.PostsError}>
                            Brak wpisu
                        </div>
                    )}
                    <div className={styles.PostsPost}>
                        <h1 className={styles.PostsPostTitle}>{post.title}</h1>
                        <p className={styles.PostsPostBody}>{post.body}</p>
                    </div>
                </>
            )}
        </div>
    )
}
