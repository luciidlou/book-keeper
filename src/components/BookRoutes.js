import { Route } from "react-router-dom"
import BookForm from "./books/BookForm"

const BookRoutes = () => {
    return (
        <>
            <Route exact path="/mybooks">

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