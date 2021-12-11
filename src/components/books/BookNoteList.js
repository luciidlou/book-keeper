import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button } from "reactstrap"
import BookNotesRepository from "../repositories/BookNotesRepository"
import BooksRepositiory from "../repositories/BooksRepositiory"
import BookNote from "./BookNote"
import "./BookNoteList.css"

const BookNoteList = () => {
    const [bookNotes, setBookNotes] = useState([])
    const [books, setBooks] = useState([])
    const { bookId } = useParams()
    const history = useHistory()

    const syncBookNotes = () => {
        BookNotesRepository.getAll().then(setBookNotes)
    }

    useEffect(() => {
        syncBookNotes()
    }, [])

    useEffect(() => {
        BooksRepositiory.getAll().then(setBooks)
    }, [])

    const book = books.find(b => b.id === parseInt(bookId))
    const filteredNotes = bookNotes.filter(n => n.userBook?.bookId === parseInt(bookId))

    return (
        <>
            <div className="btn-container">
                <Button className="addNote-btn" onClick={() => { history.push(`/mybooks/${bookId}/addnote`) }}>{filteredNotes.length > 0 ? "Add additional notes" : "Add notes"}</Button>
            </div>
            <h4 className="notes-container__title">{filteredNotes.length > 0 ? `Notes for "${book?.title}" by ${book?.author}` : `You don't have any notes for "${book?.title}"`}</h4>
            <div className="notes-container">
                
                {
                    filteredNotes.map(note => {
                        return <BookNote
                            key={note.id}
                            note={note.note}
                            page={note.page}
                            dateAdded={note.dateAdded}
                            noteId={note.id}
                            bookId={bookId}
                            syncBookNotes={syncBookNotes}
                        />
                    })
                }

            </div>
        </>
    )
}
export default BookNoteList