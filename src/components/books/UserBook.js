import { Link, useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import BookNotesRepository from "../repositories/BookNotesRepository"
import UserBooksRepository from "../repositories/UserBooksRepository"

const UserBook = (props) => {
    const history = useHistory()

    const handleRemoveBook = () => {
        UserBooksRepository.delete(props.userBookId)
            .then(BookNotesRepository.deleteNotesForUserBook(props.userBookId))
            .then(props.syncUserBooks)
    }
    return (
        <tr>
            <th scope="row">
                <Link to={`/mybooks/${props.bookId}`}>{props.title}</Link> ({props.publicationYear})
            </th>
            <td>
                {props.author}
            </td>
            <td>
                {props.shelf}
            </td>
            <td>
                {props.dateAdded}
            </td>
            <td>
                {props.dateRead ? props.dateRead : "Not read"}
            </td>
            <td>
                <Button onClick={() => { history.push(`/mybooks/${props.bookId}/addnote`) }}>Add note</Button>
            </td>
            <td>
                <Button onClick={handleRemoveBook}>
                    Delete</Button>
            </td>
        </tr>
    )
}
export default UserBook