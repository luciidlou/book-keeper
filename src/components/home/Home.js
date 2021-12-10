import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import useSimpleAuth from "../hooks/useSimpleAuth"
import PostList from "../posts/PostList"
import UserBooksRepository from "../repositories/UserBooksRepository"
import "./Home2.css"
import bookmark from "../../images/bookmark1.png"
import ShelvesRepository from "../repositories/ShelvesRepository"

const Home = () => {
    const history = useHistory()
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const [userBooks, setUserBooks] = useState([])
    const [shelves, setShelves] = useState([])

    useEffect(() => {
        UserBooksRepository.getAll().then(setUserBooks)
    }, [])

    useEffect(() => {
        ShelvesRepository.getAll().then(setShelves)
    }, [])

    const getWantToReadCount = () => {
        const count = []
        for (const shelf of shelves) {
            for (const userBook of shelf.userBooks) {
                if (shelf.id === 1 && userBook.userId === currentUser.id) {
                    count.push(userBook)
                }
            }
        }
        return count
    }
    const wantToReadCount = getWantToReadCount()

    const getCurrentReadsCount = () => {
        const count = []
        for (const shelf of shelves) {
            for (const userBook of shelf.userBooks) {
                if (shelf.id === 2 && userBook.userId === currentUser.id) {
                    count.push(userBook)
                }
            }
        }
        return count
    }
    const currentReadsCount = getCurrentReadsCount()

    const getReadCount = () => {
        const count = []
        for (const shelf of shelves) {
            for (const userBook of shelf.userBooks) {
                if (shelf.id === 3 && userBook.userId === currentUser.id) {
                    count.push(userBook)
                }
            }
        }
        return count
    }
    const readCount = getReadCount()


    const currentUserBooks = userBooks.filter((userBook) => userBook.userId === currentUser.id && userBook.shelfId === 2)

    return (
        <div className="home-container">
            <aside className="aside">
                <Button id="newBookBtn" onClick={() => { history.push("/mybooks/addbook") }}>Add new book</Button>
                <div className="aside__book">
                    <h5><img id="asideImg" src={bookmark} alt="a bookmarked book" /> Currently reading...</h5>
                    {
                        currentUserBooks.length
                            ?
                        currentUserBooks.map(userBook => {
                            return (
                                <div key={userBook.id} className="currentRead">
                                    <div className="currentRead__title">{userBook.book?.title} ({userBook.book?.publicationYear})</div>
                                    <div className="currentRead__author">By {userBook.book?.author}</div>
                                </div>
                            )
                        })
                        : "You are not currently reading anything!"
                    }
                </div>
                <div className="aside__shelves">
                    <h5 className="shelves-header">Bookshelf count</h5>
                    <div className="shelf-count">
                        <h6>Want to read</h6>
                        <div>{wantToReadCount.length} {wantToReadCount.length === 1 ? "book" : "books"}</div>
                    </div>
                    <div className="shelf-count">
                        <h6>Currently reading</h6>
                        <div>{currentReadsCount.length} {currentReadsCount.length === 1 ? "book" : "books"}</div>
                    </div>
                    <div className="shelf-count">
                        <h6>Read</h6>
                        <div>{readCount.length} {readCount.length === 1 ? "book" : "books"}</div>
                    </div>
                </div>
            </aside>
            <section className="posts">
                    <h2 className="updates-header">Updates</h2>
                    <PostList />
            </section>
        </div>
    )
}
export default Home