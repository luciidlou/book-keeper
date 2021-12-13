import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button } from "reactstrap"
import BookNotesRepository from "../../repositories/BookNotesRepository"
import BooksRepositiory from "../../repositories/BooksRepositiory"
import BookNote from "./BookNote"
import "./BookNoteList.css"

// This function is responsible for rendering the UserBookList component. It returns a list of bookNotes as JSX
const BookNoteList = () => {
    const [bookNotes, setBookNotes] = useState([])
    const [books, setBooks] = useState([])
    // Here we are storing the parameter of the current route using the useParams() hook (see the BookRoutes module for the routes that use "/:bookId(\d+)" in the url extension)
    const { bookId } = useParams()
    const history = useHistory()

    // This function is responsible for updating the bookNotes state variable with the data that we FETCH from the API (function is called in the following useEffect hook)
    const syncBookNotes = () => {
        // (see the BookNotesRepository module for the getAll() function declaration)
        BookNotesRepository.getAll().then(setBookNotes)
    }
    useEffect(() => {
        syncBookNotes()
    }, [])

    // This useEffect hook is responsible for updating the books state variable (only runs once b/c of empty dependency array)
    useEffect(() => {
        // (see the BooksRepositiory module for the getAll() function declaration)
        BooksRepositiory.getAll().then(setBooks)
    }, [])

    // The value of book is a single book object
    // It is the book that has an id property with a value equal to the value of the bookId variable declared with the useParams() hook (see line 13) 
    // The .find() method returns the first object that meets the condition(s) set within the callback function
    const book = books.find(b => b.id === parseInt(bookId))

    // The value of filteredNotes is an array of bookNote objects 
    // The bookNote objects must have a bookId property on their related userBook object with a value equal to the value of the bookId variable declared with the useParams() hook (see line 13) 
    const filteredNotes = bookNotes.filter(n => n.userBook?.bookId === parseInt(bookId))

    return (
        <>
            <div className="btn-container">
                <Button className="addNote-btn" onClick={() => { history.push(`/mybooks/${bookId}/addnote`) }}>{filteredNotes.length > 0 ? "Add additional notes" : "Add notes"}</Button>
            </div>
            <h4 className="notes-container__title">{filteredNotes.length > 0 ? `Notes for "${book?.title}" by ${book?.author}` : `You don't have any notes for "${book?.title}"`}</h4>
            <div className="notes-container">

                {
                    // Here we are iterating through the filteredNotes array using the .map() method and returning the BookNote component for each object in that array
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