import { Route } from "react-router-dom"
import BookForm from "./books/BookForm"
import BookList from "./books/BookList"

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
        </>
    )
}
export default BookRoutes