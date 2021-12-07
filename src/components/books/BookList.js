import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Table } from "reactstrap"
import ShelvesRepository from "../repositories/ShelvesRepository"
import UserBooksRepository from "../repositories/UserBooksRepository"
import "./BookList.css"
const BookList = () => {
    const [userBooks, setUserBooks] = useState([])
    const [shelves, setShelves] = useState([])
    const history = useHistory()
    const syncUserBooks = () => {
        UserBooksRepository.getAll().then(setUserBooks)
    }
    useEffect(() => {
        syncUserBooks()
    }, [])

    useEffect(() => {
        ShelvesRepository.getAll().then(setShelves)
    }, [])

    return (
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
                        Date read
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    userBooks.map((userBook) => {
                        return (
                            <tr key={userBook.id}>
                                <th scope="row">
                                    {userBook.book?.title} ({userBook.book?.publicationYear})
                                </th>
                                <td>
                                    {userBook.book?.author}
                                </td>
                                <td>
                                    {userBook.shelf?.name}
                                </td>
                                <td>
                                    {userBook.dateAdded}
                                </td>
                                <td>
                                    {userBook.dateRead ? userBook.dateRead : "Not read"}
                                </td>
                                <td>
                                    <Button onClick={() => {history.push(`/mybooks/${userBook.book?.id}/addnote`)}}>Add note</Button>
                                </td>
                                <td>
                                    <Button onClick={() => {
                                        UserBooksRepository.delete(userBook.id)
                                            .then(syncUserBooks)
                                    }}>
                                        Delete</Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}
export default BookList