import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import useSimpleAuth from "../../hooks/useSimpleAuth"
import BookNotesRepository from "../../repositories/BookNotesRepository"
import UserBooksRepository from "../../repositories/UserBooksRepository"
import "./BookNoteForm.css"


const BookNoteForm = () => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const { bookId } = useParams()
    const [userBooks, setUserBooks] = useState([])
    const history = useHistory()

    useEffect(() => {
        UserBooksRepository.getAll().then(setUserBooks)
    }, [])

    const userBook = userBooks.find(ub => ub.bookId === parseInt(bookId) && ub.userId === currentUser.id)

    const [note, updateNote] = useState({
        userBookId: 0,
        note: "",
        page: "",
        dateAdded: ""
    })

    const handleNoteSumbit = (event) => {
        event.preventDefault()
        note.dateAdded = Date.now()
        note.userBookId = userBook?.id
        BookNotesRepository.add(note)
            .then(() => { history.push(`/mybooks/${bookId}`) })
    }

    return (
        <Form className="form">
            <Label>Currently notating "{userBook?.book?.title}" by {userBook?.book?.author}</Label>
            <FormGroup className="form__group">
                <Label for="note" className="form__label">Note: </Label>
                <Input
                    id="note"
                    name="text"
                    type="textarea"
                    required autoFocus
                    onChange={(event) => {
                        const noteCopy = { ...note }
                        noteCopy.note = event.target.value
                        updateNote(noteCopy)
                    }} />
            </FormGroup>
            <FormGroup>
                <Label for="page" className="form__label">Page #:</Label>
                <Input
                    id="pageNum"
                    type="number"
                    min="0"
                    step="1"
                    onChange={(event) => {
                        const noteCopy = { ...note }
                        noteCopy.page = event.target.value
                        updateNote(noteCopy)
                    }} />
            </FormGroup>
            <FormGroup className="form__group">
                <Button className="btn primary-btn" onClick={handleNoteSumbit}>Submit</Button>
                <Button className="btn" onClick={() => { history.push(`/mybooks`) }}>Cancel</Button>
            </FormGroup>
        </Form>
    )
}
export default BookNoteForm