import { Route } from "react-router-dom"
import BookForm from "./books/BookForm"
import BookList from "./books/UserBookList"
import BookNoteForm from "./books/BookNoteForm"
import BookNoteList from "./books/BookNoteList"

const BookRoutes = () => {
    return (
        <>
            <Route exact path="/mybooks">
                <BookList />
            </Route>
            <Route exact path="/mybooks/addbook">
                <BookForm />
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