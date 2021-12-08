import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Table } from "reactstrap"
import useSimpleAuth from "../hooks/useSimpleAuth"
// import ShelvesRepository from "../repositories/ShelvesRepository"
import UserBooksRepository from "../repositories/UserBooksRepository"
import UserBook from "./UserBook"
import "./UserBookList.css"
const BookList = () => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const [userBooks, setUserBooks] = useState([])
    // const [shelves, setShelves] = useState([])
    const history = useHistory()

    const syncUserBooks = () => {
        UserBooksRepository.getAll().then(setUserBooks)
    }

    useEffect(() => {
        syncUserBooks()
    }, [])

    // useEffect(() => {
    //     ShelvesRepository.getAll().then(setShelves)
    // }, [])

    return (
        <>
            <div className="btn-container">
                <Button className="new-book-btn" onClick={() => { history.push("/mybooks/addbook") }}>Add new book</Button>
            </div>
            {
                userBooks.length
                    ?
                    <Table borderless>
                        <thead>
                            <tr>
                                <th>
                                    Title
                                </th>
                                <th>
                                    Author
                                </th>
                                <th>
                                    Shelf
                                </th>
                                <th>
                                    Date added
                                </th>
                                <th>
                                    Date read
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userBooks.map((userBook) => {
                                    return (
                                        <UserBook
                                            key={userBook.id}
                                            title={userBook.book?.title}
                                            author={userBook.book?.author}
                                            publicationYear={userBook.book?.publicationYear}
                                            shelf={userBook.shelf?.name}
                                            dateAdded={userBook.dateAdded}
                                            dateRead={userBook.dateRead}
                                            bookId={userBook.bookId}
                                            userId={currentUser.id}
                                            userBookId={userBook.id}
                                            syncUserBooks={syncUserBooks} />
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    : "You don't have any books yet!"
            }
        </>
    )
}
export default BookList