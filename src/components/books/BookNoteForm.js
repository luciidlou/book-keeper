import { useHistory, useParams } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import useSimpleAuth from "../hooks/useSimpleAuth"
import BookNotesRepository from "../repositories/BookNotesRepository"
import "./BookNoteForm.css"


const BookNoteForm = () => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const { bookId } = useParams()
    const history = useHistory()

    const [note, updateNote] = useState({
        userId: currentUser.id,
        bookId: parseInt(bookId),
        note: "",
        dateAdded: ""
    })

    const handleNoteSumbit = (event) => {
        event.preventDefualt()
        const currentDate = new Date()
        note.dateAdded = currentDate.toLocaleDateString('en-US')
        BookNotesRepository.add(note)
            .then(() => { history.push(`/mybooks/${bookId}`) })
    }

    return (
        <Form className="form">
            <FormGroup className="form__group">
                <Label for="note" className="form__label">Note: </Label>
                <Input
                    id="note"
                    name="text"
                    type="textarea"
                    onChange={(event) => {
                        const noteCopy = { ...note }
                        noteCopy.note = event.target.value
                        updateNote(noteCopy)
                    }} />
            </FormGroup>
            <FormGroup className="form__group">
                <Button className="btn primary-btn" onClick={handleNoteSumbit}>Submit</Button>
                <Button className="btn" onClick={() => { history.push(`/mybooks/${bookId}`) }}>Cancel</Button>
            </FormGroup>
        </Form>
    )
}
export default BookNoteForm