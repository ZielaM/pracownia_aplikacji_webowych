import { useState } from "react";
import type { Post } from "../../types/Post/Post.ts";
import { useParams } from "react-router";
import styles from "./Post.module.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comments, Comment } from "../../types/Comments/Comments.ts";

export default function Post() {

    const params = useParams()
    const queryClient = useQueryClient()
    const [commentContent, setCommentContent] = useState("")

    const { isPending, error, data, isFetching } = useQuery<{ post: Post, comments: Comments }>({
        queryKey: ['post'],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/wpis/${params.id}`);
            return await response.json()
        }
    });

    const mutation = useMutation({
        mutationFn: async (newComment: { content: string; wpisId: number }) => {
            const response = await fetch('http://localhost:3000/komentarz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });
            if (!response.ok) {
                throw new Error('Wystąpił błąd przy dodawaniu komentarza');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post'] });
            setCommentContent("");
        },
    });

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentContent.trim() && data?.post.id) {
            mutation.mutate({
                content: commentContent,
                wpisId: data.post.id
            });
        }
    };

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
                    {!data && (
                        <div className={styles.PostsError}>
                            Brak wpisu
                        </div>
                    )}
                    <div className={styles.PostsPost}>
                        <h1 className={styles.PostsPostTitle}>{data.post.title}</h1>
                        <p className={styles.PostsPostBody}>{data.post.content}</p>
                        <div className={styles.PostsComments}>
                            <h2 className={styles.PostsCommentsTitle}>Komentarze: </h2>

                            <form className={styles.PostsCommentsForm} onSubmit={handleAddComment}>
                                <textarea
                                    className={styles.PostsCommentsTextarea}
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    placeholder="Dodaj komentarz..."
                                />
                                <button
                                    className={styles.PostsCommentsButton}
                                    type="submit"
                                    disabled={mutation.isPending || !commentContent.trim()}
                                >
                                    {mutation.isPending ? "Dodawanie..." : "Dodaj"}
                                </button>
                                {mutation.isError && (
                                    <p className={styles.PostsCommentsError}>Wystąpił błąd podczas dodawania komentarza.</p>
                                )}
                            </form>

                            <div className={styles.PostsCommentsList}>
                                {data.comments.map((comment: Comment) => (
                                    <div key={comment.id} className={styles.PostsCommentsItem}>
                                        <p>{comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
