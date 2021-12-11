import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Button, Table } from "reactstrap"
import useSimpleAuth from "../hooks/useSimpleAuth"
import UserBook from "./UserBook"
import "./UserBookList.css"
const UserBookList = ({ syncUserBooks, userBooks }) => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const history = useHistory()

    useEffect(() => {
        syncUserBooks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const currentUsersBooks = userBooks.filter(ub => ub.userId === currentUser.id)

    return (
        <div className="bookListContainer">
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
                                <th>
                                    Add/review notes
                                </th>
                                <th>
                                    Delete book
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tableBody">
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
                                            url={userBook.book?.url}
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
        </div>
    )
}
export default UserBookList