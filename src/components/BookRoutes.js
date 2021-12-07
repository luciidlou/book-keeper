import { Route } from "react-router-dom"
import BookForm from "./books/BookForm"
import BookList from "./books/BookList"
import BookNoteForm from "./books/BookNoteForm"

const BookRoutes = () => {
    return (
        <>
            <Route exact path="/mybooks">
                <BookList />
            </Route>
            <Route exact path="/mybooks/register">
                <BookForm />
            </Route>
            <Route exact path="/mybooks/:bookId(\d+)">
                
            </Route>
            <Route exact path="/mybooks/:bookId(\d+)/addnote">
                <BookNoteForm />
            </Route>
        </>
    )
}
export default BookRoutes