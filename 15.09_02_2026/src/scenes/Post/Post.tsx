import type {Post} from "../../types/Post/Post.ts";
import {useParams} from "react-router";
import styles from "./Post.module.scss";
import {useQuery} from "@tanstack/react-query";

export default function Post() {

    const params = useParams()

    const {isPending, error, data: post, isFetching} = useQuery<Post>({
        queryKey: ['post'],
        queryFn: async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
            return await response.json()
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
                    Wystąpił nieoczekiwany błąd 😭 <br/>
                    {error.message}
                </div>
            )}
            {!isPending && !isFetching && !error && (
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
