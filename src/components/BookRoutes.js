import { Route } from "react-router-dom"
import { useState } from "react"
import BookForm from "./books/BookForm"
import BookNoteForm from "./books/BookNoteForm"
import BookNoteList from "./books/BookNoteList"
import UserBookList from "./books/UserBookList"
import UserBooksRepository from "../repositories/UserBooksRepository"

const BookRoutes = () => {
    const [userBooks, setUserBooks] = useState([])

    const syncUserBooks = () => {
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