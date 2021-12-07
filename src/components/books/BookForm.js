import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import useSimpleAuth from "../hooks/useSimpleAuth"
import BooksRepositiory from "../repositories/BooksRepositiory"
import ShelvesRepository from "../repositories/ShelvesRepository"
import UserBooksRepository from "../repositories/UserBooksRepository"
import "./BookForm.css"

const BookForm = () => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const history = useHistory()
    const [shelves, setShelves] = useState([])

    const [book, updateBook] = useState({
        title: "",
        author: "",
        publicationYear: "2021"
    })
    const [userBook, updateUserBook] = useState({
        bookId: 0,
        userId: currentUser.id,
        shelfId: null,
        dateAdded: null,
        dateRead: ""
    })

    useEffect(() => {
        ShelvesRepository.getAll().then(setShelves)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        BooksRepositiory.add(book)
            .then((data) => {
                const currentDate = new Date()
                userBook.dateAdded = currentDate.toLocaleDateString("en-US")
                userBook.bookId = data.id
                userBook.shelfId === 3
                    ? userBook.dateRead = currentDate.toLocaleDateString("en-US") && UserBooksRepository.add(userBook)
                    : UserBooksRepository.add(userBook)
            })
            .then(() => { history.push("/mybooks") })
            .then(() => { UserBooksRepository.getAll() })
    }

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <FormGroup className="form__field">
                <Label for="title" className="form__label">Title: </Label>
                <Input
                    className="form__control"
                    type="text"
                    required autoFocus
                    placeholder="Title of book..."
                    onChange={(event) => {
                        const bookCopy = { ...book }
                        bookCopy.title = event.target.value
                        updateBook(bookCopy)
                    }} />
            </FormGroup>
            <FormGroup className="form__field">
                <Label for="author" className="form__label">Author: </Label>
                <Input
                    className="form__control"
                    type="text"
                    required
                    placeholder="Name of author..."
                    onChange={(event) => {
                        const bookCopy = { ...book }
                        bookCopy.author = event.target.value
                        updateBook(bookCopy)
                    }} />
            </FormGroup>
            <FormGroup className="form__field">
                <Label for="publicationYear" className="form__label">Publication year: </Label>
                <Input
                    className="form__control"
                    id="pubYear"
                    type="number"
                    min="1700"
                    max="2099"
                    step="1"
                    defaultValue="2021"
                    required
                    onChange={(event) => {
                        const bookCopy = { ...book }
                        bookCopy.publicationYear = event.target.value
                        updateBook(bookCopy)
                    }} />
            </FormGroup>
            <FormGroup className="form__field">
                <Label for="shelf" className="form__label">Shelf: </Label>
                <Input
                    className="form__control"
                    id="select"
                    type="select"
                    required
                    onChange={(event) => {
                        const userBookCopy = { ...userBook }
                        userBookCopy.shelfId = parseInt(event.target.value)
                        updateUserBook(userBookCopy)
                    }}>
                    <option hidden value="">Choose a shelf...</option>
                    {
                        shelves.map((s) => {
                            return <option key={s.id} value={s.id}>{s.name}</option>
                        })
                    }
                </Input>
            </FormGroup>
            <FormGroup className="form__field">
                {
                    userBook.shelfId === 3
                        ?
                        <>
                            <Label for="dateRead" className="form__label">Date read: </Label>
                            <Input
                                className="form__control"
                                type="date"
                                onChange={(event) => {
                                    const userBookCopy = { ...userBook }
                                    userBookCopy.dateRead = event.target.value
                                    updateUserBook(userBookCopy)
                                }} />
                        </>
                        : ""
                }
            </FormGroup>
            <Button className="btn submit-book">Submit</Button>
            <Button className="btn cancel-book" onClick={() => { history.push("/mybooks") }}>Cancel</Button>
        </Form>
    )
}
export default BookForm