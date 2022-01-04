import { Route } from "react-router-dom"
import { useState } from "react"
import NewBookForm from "./books/NewBookForm"
import BookNoteForm from "./books/BookNoteForm"
import BookNoteList from "./books/BookNoteList"
import UserBookList from "./books/UserBookList"
import UserBooksRepository from "../repositories/UserBooksRepository"
import ExistingBookForm from "./books/ExistingBookForm"
import BooksRepositiory from "../repositories/BooksRepositiory"

// This function is responsible for rendering the BookRoutes component. This is the parent component of all the components in the books directory
const BookRoutes = () => {
    const [userBooks, setUserBooks] = useState([])
    const [books, setBooks] = useState([])
    const [order, setOrder] = useState("asc")
    const [showSearchBar, toggleSearchBar] = useState(true)


    const syncUserBooks = () => {
    // This function is responsible for updating the userBooks state variable 
        // (see the UserBooksRepository module for the getAll() function declaration)
        UserBooksRepository.getAll().then(setUserBooks)
    }

    // This function is responsible for updating the books state variable 
    const syncBooks = () => {
        // (see the BooksRepository module for the getAll() function declaration)
        BooksRepositiory.getAll().then(setBooks)
    }


    const sorting = (col) => {
        if (col === "shelfId" || col === "rating") {
            if (order === "asc") {
                const sorted = [...userBooks].sort((a, b) => {
                    return a[col] - b[col]
                })
                setUserBooks(sorted)
                setOrder("desc")
            }
            else if (order === "desc") {
                const sorted = [...userBooks]?.sort((a, b) => {
                    return b[col] - a[col]
                })
                setUserBooks(sorted)
                setOrder("asc")
            }
        }
        else if (col === "dateAdded" || col === "dateRead") {
            if (order === "asc") {
                const sorted = [...userBooks].sort((a, b) => {
                    return a[col] > b[col] ? 1 : -1
                })
                setUserBooks(sorted)
                setOrder("desc")
            }
            else if (order === "desc") {
                const sorted = [...userBooks]?.sort((a, b) => {
                    return a[col] < b[col] ? 1 : -1
                })
                setUserBooks(sorted)
                setOrder("asc")
            }
        }
        else {
            if (order === "asc") {
                const sorted = [...userBooks].sort((a, b) => {
                    return a.book?.[col]?.toLowerCase() > b.book?.[col]?.toLowerCase() ? 1 : -1
                })
                setUserBooks(sorted)
                setOrder("desc")
            }
            else if (order === "desc") {
                const sorted = [...userBooks]?.sort((a, b) => {
                    return a.book?.[col]?.toLowerCase() < b.book?.[col]?.toLowerCase() ? 1 : -1
                })
                setUserBooks(sorted)
                setOrder("asc")
            }
        }
    }

    return (
        <>
            <Route exact path="/mybooks">
                <UserBookList
                    syncUserBooks={syncUserBooks}
                    userBooks={userBooks}
                    sorting={sorting}
                />
            </Route>
            <Route exact path="/mybooks/addbook">
                <NewBookForm
                    syncUserBooks={syncUserBooks}
                    toggleSearchBar={toggleSearchBar}
                    showSearchBar={showSearchBar}
                />
            </Route>
            <Route exact path="/mybooks/:bookId(\d+)">
                <BookNoteList />
            </Route>
            <Route exact path="/mybooks/:bookId(\d+)/addnote">
                <BookNoteForm />
            </Route>
            <Route exact path="/books/addbook/:bookId(\d+)">
                <ExistingBookForm
                    books={books}
                    syncBooks={syncBooks}
                    syncUserBooks={syncUserBooks}
                    toggleSearchBar={toggleSearchBar}
                />
            </Route>
        </>
    )
}
export default BookRoutes