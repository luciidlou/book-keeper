import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap"
import BookNotesRepository from "../../repositories/BookNotesRepository"
import "./BookNote.css"

const BookNote = (props) => {
    const handleNoteDelete = (id) => {
        BookNotesRepository.delete(id)
            .then(props.syncBookNotes)
    }
    return (
        <Card className="noteCard">
            <CardBody className="noteCard__body">
                <CardTitle className="noteCard__title" tag="h5">
                    {props.dateAdded}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted noteCard__page"
                    tag="h6"
                >
                    {props.page ? `Page: ${props.page}` : "Page: N/A"}
                </CardSubtitle>
                <CardText>
                    {props.note}
                </CardText>
                <Button onClick={() => { handleNoteDelete(props.noteId) }}>
                    Delete
                </Button>
            </CardBody>
        </Card>
    )
}
export default BookNote

