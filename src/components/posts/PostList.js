import { useEffect, useState } from "react"
import BooksRepositiory from "../../repositories/BooksRepositiory"
import PostsRepository from "../../repositories/PostsRepository"
import UsersRepository from "../../repositories/UsersRepository"
import Post from "./Post"
import "./PostList.css"

const PostList = () => {
    const [posts, setPosts] = useState([])
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])

    const syncPosts = () => {
        PostsRepository.getAll().then(setPosts)
    }

    useEffect(() => {
        syncPosts()
    }, [])

    useEffect(() => {
        BooksRepositiory.getAll().then(setBooks)
    }, [])

    useEffect(() => {
        UsersRepository.getAll().then(setUsers)
    }, [])


    return (
        <div className="postList">
            {
                posts.map(post => {
                    const foundBook = books.find(b => b.id === post.bookId)
                    const foundUser = users.find(u => u.id === post.userId)
                    return <Post
                        key={post.id}
                        postId={post.id}
                        userId={foundUser?.id}
                        firstName={foundUser?.firstName}
                        lastName={foundUser?.lastName}
                        title={foundBook?.title}
                        author={foundBook?.author}
                        shelfId={post.shelfId}
                        dateCreated={post.dateCreated}
                        syncPosts={syncPosts}
                    />
                })

            }
        </div>
    )
}
export default PostList