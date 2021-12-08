import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import useSimpleAuth from "../hooks/useSimpleAuth"
import UserBooksRepository from "../repositories/UserBooksRepository"
import "./Home.css"

const Home = () => {
    const history = useHistory()
    const { getCurrentUser } = useSimpleAuth()
    const [userBooks, setUserBooks] = useState([])
    const currentUser = getCurrentUser()

    useEffect(() => {
        UserBooksRepository.getAll().then(setUserBooks)
    }, [])

    const currentUserBooks = userBooks.filter((userBook) => userBook.userId === currentUser.id && userBook.shelfId === 2)

    return (
        <main className="container">
            <aside className="aside">
                <Button className="new-book-btn" onClick={() => { history.push("/mybooks/addbook") }}>Add new book</Button>
                <div className="aside__book">
                    Currently reading...
                    {
                        currentUserBooks.map(userBook => {
                            return (
                                <div key={userBook.id} className="currentRead">
                                    <div className="currentRead__details">{userBook.book?.title} By: {userBook.book?.author}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="aside__shelves">
                    Display book count in shelves
                </div>
            </aside>
            <section className="feed">
                Display shelf updates here
            </section>
        </main>
    )
}
export default Home