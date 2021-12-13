import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import useSimpleAuth from "../../hooks/useSimpleAuth"
import UserBooksRepository from "../../repositories/UserBooksRepository"
import ShelvesRepository from "../../repositories/ShelvesRepository"
import bookmark from "../../images/bookmark1.png"
import PostList from "../posts/PostList"
import "./Home.css"

const Home = () => {
    const history = useHistory()
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const [userBooks, setUserBooks] = useState([])
    const [shelves, setShelves] = useState([])

    // This useEffect is responsible for updating our userBooks state variable (only runs once b/c of empty dependency array)
    useEffect(() => {
        // see the UserBooksRepository module for the getAll() function declaration
        UserBooksRepository.getAll().then(setUserBooks)
    }, [])

    // This useEffect is responsible for updating our shelves state variable (only runs once b/c of empty dependency array)
    useEffect(() => {
        // see the ShelvesRepository module for the getAll() function declaration
        ShelvesRepository.getAll().then(setShelves)
    }, [])

    // This functions responsibility is to return an array of userBook objects that belong to the current user and have a shelfId of 1 
    const getWantToReadCount = () => {
        const wantToReadCount = []
        for (const shelf of shelves) {
            for (const userBook of shelf.userBooks) {
                if (shelf.id === 1 && userBook.userId === currentUser.id) {
                    wantToReadCount.push(userBook)
                }
            }
        }
        return wantToReadCount
    }
    const wantToReadCount = getWantToReadCount()

    // This functions responsibility is to return an array of userBook objects that belong to the current user and have a shelfId of 2 
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

    // This functions responsibility is to return an array of userBook objects that belong to the current user and have a shelfId of 3 
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

    // The value of currentUserBooks is an array of userBooks that belong to the currentUser and have a shelfId of 2
    const currentUserBooks = userBooks.filter((userBook) => userBook.userId === currentUser.id && userBook.shelfId === 2)

    return (
        <div className="home-container">
            <aside className="aside">
                <Button id="newBookBtn" onClick={() => { history.push("/mybooks/addbook") }}>Add new book</Button>
                <div className="aside__book">
                    <h5><img id="asideImg" src={bookmark} alt="a bookmarked book" /> Currently reading...</h5>
                    {
                        // IF the currentUser has any books on the "Want to read" shelf...
                        currentUserBooks.length
                            ?
                            // THEN iterate through the userBooks and display them in the DOM
                            currentUserBooks.map(userBook => {
                                return (
                                    <div key={userBook.id} className="currentRead">
                                        <div className="currentRead__title">{userBook.book?.title} ({userBook.book?.publicationYear})</div>
                                        <div className="currentRead__author">By {userBook.book?.author}</div>
                                        {
                                            currentUserBooks.length > 1
                                                ? <div className="breakPoint">---------------------------</div>
                                                : ""
                                        }

                                    </div>
                                )
                            })
                            // ELSE display the following string
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