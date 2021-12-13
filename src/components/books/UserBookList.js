import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Button, Table } from "reactstrap"
import useSimpleAuth from "../../hooks/useSimpleAuth"
import UserBook from "./UserBook"
import "./UserBookList.css"

// This function is responsible for rendering the UserBookList component. It returns a <Table> element (JSX)
const UserBookList = ({ syncUserBooks, userBooks }) => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const history = useHistory()

    // This useEffect hook is responsible for updating the userBooks state located in the BookRoutes module (only runs once b/c of empty dependency array)
    useEffect(() => {
        // (see the BookRoutes module for the syncUserBooks function declaration)
        syncUserBooks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // The value of currentUsersBooks is an array of userBook objects that belong to the currentUser
    const currentUsersBooks = userBooks.filter(ub => ub.userId === currentUser.id)

    return (
        <div className="bookListContainer">
            <div className="header-userBooks">
                <h2>My books</h2>
            </div>
            <div className="btn-container">
                <Button className="new-book-btn" onClick={() => { history.push("/mybooks/addbook") }}>Add new book</Button>
            </div>
            {
                // IF the currentUsersBooks array is NOT empty (meaning it holds at least one object)
                currentUsersBooks?.length
                    ?
                    // THEN return our <Table> element
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
                                // Here we are iterating through the currentUsersBooks array using the .map() method and returning the UserBook component for each object in that array
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
                    // ELSE (currentUsersBooks array is empty), return the following string
                    : "You don't have any books yet!"
            }
        </div>
    )
}
export default UserBookList