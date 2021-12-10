import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Table } from "reactstrap"
import useSimpleAuth from "../hooks/useSimpleAuth"
import UserBooksRepository from "../repositories/UserBooksRepository"
import UserBook from "./UserBook"
import "./UserBookList.css"
const BookList = () => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const [userBooks, setUserBooks] = useState([])
    const history = useHistory()

    const syncUserBooks = () => {
        UserBooksRepository.getAll().then(setUserBooks)
    }

    useEffect(() => {
        syncUserBooks()
    }, [])

    const currentUsersBooks = userBooks.filter(ub => ub.userId === currentUser.id)

    return (
        <>
            <div className="btn-container">
                <Button className="new-book-btn" onClick={() => { history.push("/mybooks/addbook") }}>Add new book</Button>
            </div>
            {
                currentUsersBooks?.length
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
                                    Last date read
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentUsersBooks?.map(userBook => {
                                    return (
                                        <UserBook
                                            key={userBook.id}
                                            userBookId={userBook.id}
                                            userBook={userBook}
                                            userId={currentUser.id}
                                            title={userBook.book?.title}
                                            author={userBook.book?.author}
                                            publicationYear={userBook.book?.publicationYear}
                                            wikiLink={userBook.book?.wikiLink}
                                            shelf={userBook.shelf}
                                            dateAdded={userBook.dateAdded}
                                            dateRead={userBook.dateRead}
                                            bookId={userBook.bookId}
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