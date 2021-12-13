import { Route } from "react-router-dom"
import { useState } from "react"
import BookForm from "./books/BookForm"
import BookNoteForm from "./books/BookNoteForm"
import BookNoteList from "./books/BookNoteList"
import UserBookList from "./books/UserBookList"
import UserBooksRepository from "../repositories/UserBooksRepository"

// This function is responsible for rendering the BookRoutes component. This is the parent component of all the components in the books directory
const BookRoutes = () => {
    const [userBooks, setUserBooks] = useState([])

    // This function is responsible for updating the userBooks state variable 
    const syncUserBooks = () => {
        // (see the UserBooksRepository module for the getAll() function declaration)
        UserBooksRepository.getAll().then(setUserBooks)
    }

    return (
        <>
            <Route exact path="/mybooks">
                <UserBookList syncUserBooks={syncUserBooks} userBooks={userBooks} />
            </Route>
            <Route exact path="/mybooks/addbook">
                <BookForm syncUserBooks={syncUserBooks} />
            </Route>
            <Route exact path="/mybooks/:bookId(\d+)">
                <BookNoteList />
            </Route>
            <Route exact path="/mybooks/:bookId(\d+)/addnote">
                <BookNoteForm />
            </Route>
        </>
    )
}
export default BookRoutes