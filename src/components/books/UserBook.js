import moment from "moment"
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, Input } from "reactstrap"
import BookNotesRepository from "../repositories/BookNotesRepository"
import PostsRepository from "../repositories/PostsRepository"
import ShelvesRepository from "../repositories/ShelvesRepository"
import UserBooksRepository from "../repositories/UserBooksRepository"

const UserBook = (props) => {
    const history = useHistory()
    const [shelves, setShelves] = useState([])
    const [post] = useState({
        userBookId: 0,
        shelfId: 0,
        dateCreated: 0
    })
    const syncShelves = () => {
        ShelvesRepository.getAll().then(setShelves)
    }
    useEffect(() => {
        syncShelves()
    }, [])

    const handleRemoveBook = () => {
        UserBooksRepository.delete(props.userBookId)
            .then(BookNotesRepository.deleteNotesForUserBook(props.userBookId))
            .then(props.syncUserBooks)
    }

    const handleShelfChange = (event) => {
        const newShelf = parseInt(event.target.value)
        const currentDate = new Date()

        post.shelfId = newShelf
        post.dateCreated = moment(currentDate).format('MMMM Do YYYY, h:mm:ss a')

        const editedUserBook = {
            id: props.userBookId,
            bookId: props.bookId,
            shelfId: newShelf,
            userId: props.userId,
            dateAdded: props.dateAdded,
            dateRead: props.dateRead
        }

        UserBooksRepository.updateShelf(editedUserBook)
            .then(userBookResponse => { post.userBookId = userBookResponse.id })
            .then(() => PostsRepository.add(post))
            .then(props.syncUserBooks)
            .then(() => syncShelves())
    }

    const handleDateReadChange = (event) => {
        const newDateRead = event.target.value
        const editedUserBook = {
            id: props.userBookId,
            bookId: props.bookId,
            shelfId: props.shelf?.id,
            userId: props.userId,
            dateAdded: props.dateAdded,
            dateRead: newDateRead
        }
        UserBooksRepository.updateDateRead(editedUserBook)
            .then(props.syncUserBooks)
    }


    const generateDateRead = () => {
        const hasBeenRead = props.shelf?.id === 3

        if (!hasBeenRead && !props.dateRead) {
            return <Input
                disabled
                placeholder="mm/dd/yyyy"
                className="form__control"
                type="date"
                onChange={handleDateReadChange} />
        }
        else if (hasBeenRead && !props.dateRead) {
            return <Input
                placeholder="mm/dd/yyyy"
                className="form__control"
                type="date"
                onChange={handleDateReadChange} />
        }
        else if (!hasBeenRead && props.dateRead) {
            return <Input
                disabled
                defaultValue={props.dateRead}
                className="form__control"
                type="date"
                onChange={handleDateReadChange} />
        }
        else if (props.dateRead) {
            return <Input
                defaultValue={props.dateRead}
                className="form__control"
                type="date"
                onChange={handleDateReadChange} />
        }
        else {
            return "N/A"
        }
    }

    const displayDateRead = generateDateRead()

    return (
        <tr>
            <th scope="row">
                <Link to={`/mybooks/${props.bookId}`}>{props.title}</Link> ({props.publicationYear})
            </th>
            <td>
                {props.author}
            </td>
            <td>
                <select
                    value={props.shelf.id}
                    onChange={handleShelfChange}>
                    {
                        shelves.map(shelf => {
                            return <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                        })
                    }
                </select>
            </td>
            <td>
                {props.dateAdded}
            </td>
            <td>
                {displayDateRead}
            </td>
            <td>
                <Button onClick={() => { history.push(`/mybooks/${props.bookId}/addnote`) }}>Add note</Button>
            </td>
            <td>
                <Button onClick={handleRemoveBook}>Delete</Button>
            </td>
        </tr>
    )
}
export default UserBook