import moment from "moment"
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap"
import BookNotesRepository from "../../repositories/BookNotesRepository"
import "./BookNote.css"

// This function is responsible for rendering the BookNote component. It returns a single bookNote object as a <Card> element (JSX)
const BookNote = (props) => {
    // This function is responsible for deleting a bookNote object from the API using the DELETE fetch method
    const handleNoteDelete = (id) => {
        // (see the BookNotesRepository for the delete() function declaration)
        BookNotesRepository.delete(id)
            // THEN, update the userBooks state variable by calling the syncUserBooks function (see BookRoutes module for function declaration)
            .then(props.syncBookNotes)
    }
    return (
        <Card className="noteCard">
            <CardBody className="noteCard__body">
                <CardTitle className="noteCard__title" tag="h5">
                    {moment(props.dateAdded).format('MMMM Do YYYY, h:mm a')}
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

