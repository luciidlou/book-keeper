import { useEffect, useState } from "react"
import useSimpleAuth from "../hooks/useSimpleAuth"
import BooksRepositiory from "../repositories/BooksRepositiory"
import PostsRepository from "../repositories/PostsRepository"
import Post from "./Post"

const PostList = () => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const [posts, setPosts] = useState([])
    const [books, setBooks] = useState([])

    const syncPosts = () => {
        PostsRepository.getAll().then(setPosts)
    }

    useEffect(() => {
        syncPosts()
    }, [])

    useEffect(() => {
        BooksRepositiory.getAll().then(setBooks)
    }, [])


    return (
        posts.map(post => {
            const foundBook = books.find(b => b.id === post.userBook?.bookId)

            return <Post
                key={post.id}
                postId={post.id}
                shelfId={post.shelfId}
                userId={currentUser.id}
                dateCreated={post.dateCreated}
                firstName={currentUser.firstName}
                lastName={currentUser.lastName}
                title={foundBook?.title}
                author={foundBook?.author}
                syncPosts={syncPosts}
            />
        })
    )
}
export default PostList