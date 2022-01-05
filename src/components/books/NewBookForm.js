import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import useSimpleAuth from "../../hooks/useSimpleAuth"
import BooksRepositiory from "../../repositories/BooksRepositiory"
import PostsRepository from "../../repositories/PostsRepository"
import ShelvesRepository from "../../repositories/ShelvesRepository"
import UserBooksRepository from "../../repositories/UserBooksRepository"
import SearchBar from "../search/SearchBar"
import blankStar from "../../images/blank-star.png"
import yellowStar from "../../images/yellow-star.png"
import "./NewBookForm.css"

// This function is responsible for rendering our BookForm component. It returns a <Form> element (JSX)
const NewBookForm = ({ syncUserBooks, showSearchBar, toggleSearchBar }) => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const history = useHistory()
    const [shelves, setShelves] = useState([])
    const [mouseHasEntered, setMouseHasEntered] = useState(0)


    // Here we are declaring the book state variable with the useState() hook and initializing it as an object with 4 key:value pairs 
    const [book, updateBook] = useState({
        title: "",
        author: "",
        publicationYear: "2021",
        url: ""
    })
    // Here we are declaring the userBook state variable with the useState() hook and initializing it as an object with 5 key:value pairs 
    const [userBook, updateUserBook] = useState({
        bookId: 0,
        userId: currentUser.id,
        shelfId: 0,
        dateAdded: "",
        dateRead: "",
        rating: 0
    })
    // Here we are declaring the post state variable with the useState() hook and initializing it as an object with 4 key:value pairs 
    const [post, updatePost] = useState({
        bookId: 0,
        userId: currentUser.id,
        shelfId: 0,
        dateCreated: ""
    })

    // This useEffect is responsible for updating the shelves state variable with the data we FETCH from the API (only runs once b/c of empty dependency array)
    useEffect(() => {
        // (see the ShelvesRepository module for the getAll() function declaration)
        ShelvesRepository.getAll().then(setShelves)
    }, [])

    // The value of hasBeenRead is a boolean. It is TRUE if the userBook object has a shelfId with a value of 3
    const hasBeenRead = userBook.shelfId === 3

    // This function is responsible for sending three new objects to the API using the POST fetch method. Those objects are book, userBook, and post.
    const handleSubmit = (event) => {
        // The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
        event.preventDefault()
        // This is where we send the new book object to the API with a POST fetch method. (see the BooksRepository module for the add() function declaration)
        BooksRepositiory.add(book)
            // THEN, capture the response from the fetch call and use it to change the value of the bookId property on the userBook object
            .then((bookResponse) => {
                userBook.dateAdded = Date.now()
                post.dateCreated = Date.now()
                userBook.bookId = bookResponse.id
                // This is where we send the userBook object to the API using the POST fetch method (see the UserBooksRepository module for the add() function)
                UserBooksRepository.add(userBook)
                    // THEN, capture the response from the fetch call and use it to change the value of the bookId property on the post object
                    .then((userBookResponse) => post.bookId = userBookResponse.bookId)
                    // THEN, send the post object to the API using the POST fetch method. (see the PostsRepository module for the add() function declaration)
                    .then(() => PostsRepository.add(post))
                    // THEN, update the userBooks state variable by calling the syncUserBooks function (see BookRoutes module for function declaration)
                    .then(syncUserBooks)
            })
            // THEN, send the user back to the "/mybooks" url extension using history.push
            .then(() => history.push("/mybooks"))
    }
    const handleRateBook = (rating) => {
        const copy = { ...userBook }
        copy.rating = rating
        updateUserBook(copy)
        setMouseHasEntered(0)
    }

    const generateFiveStars = () => {
        if (mouseHasEntered === 0) {
            return (
                <>
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(1)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                </>
            )
        }
        else if (mouseHasEntered === 1) {
            return (
                <>
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(1)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(1)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                </>
            )
        }
        else if (mouseHasEntered === 2) {
            return (
                <>
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(1)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(2)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                </>
            )
        }
        else if (mouseHasEntered === 3) {
            return (
                <>
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(1)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(3)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                </>
            )
        }
        else if (mouseHasEntered === 4) {
            return (
                <>
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(1)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(4)} />
                    <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                </>
            )
        }
        else if (mouseHasEntered === 5) {
            return (
                <>
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(1)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                    <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(5)} />
                </>
            )
        }
    }
    const displayFiveStars = generateFiveStars()


    const generateStarRating = () => {
        if (userBook.rating === 1) {
            if (mouseHasEntered === 0) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 2) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(2)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 3) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(3)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 4) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(4)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 5) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(5)} />
                    </>
                )
            }
        }
        else if (userBook.rating === 2) {
            if (mouseHasEntered === 0) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onClick={() => handleRateBook(1)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 3) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(3)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 4) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(4)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 5) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(5)} />
                    </>
                )
            }
        }
        else if (userBook.rating === 3) {
            if (mouseHasEntered === 0) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onClick={() => handleRateBook(1)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" onClick={() => handleRateBook(2)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 4) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(1)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(4)} />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 5) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(1)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(4)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(5)} />
                    </>
                )
            }
        }
        else if (userBook.rating === 4) {
            if (mouseHasEntered === 0) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onClick={() => handleRateBook(1)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" onClick={() => handleRateBook(2)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" onClick={() => handleRateBook(3)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" />
                        <img src={blankStar} alt="blank star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} />
                    </>
                )
            }
            else if (mouseHasEntered === 5) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(1)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(2)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(3)} onMouseLeave={() => setMouseHasEntered(0)} />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" />
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onMouseEnter={() => setMouseHasEntered(5)} onMouseLeave={() => setMouseHasEntered(0)} onClick={() => handleRateBook(5)} />
                    </>
                )
            }
        }
        else if (userBook.rating === 5) {
            if (mouseHasEntered === 0) {
                return (
                    <>
                        <img src={yellowStar} alt="yellow star" id="blankRateStars" onClick={() => handleRateBook(1)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" onClick={() => handleRateBook(2)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" onClick={() => handleRateBook(3)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" onClick={() => handleRateBook(4)} />
                        <img src={yellowStar} alt="blank star" id="blankRateStars" />
                    </>
                )
            }
        }
    }
    const displayStarRating = generateStarRating()
    
    return (
        showSearchBar
            ?
            <SearchBar toggleSearchBar={toggleSearchBar} handleSubmit={handleSubmit} />
            :
            <Form className="form" onSubmit={handleSubmit}>
                <h2 className="form__header">Add a new book to your library!</h2>
                <FormGroup className="form__field">
                    <Label for="title" className="form__label">Title: </Label>
                    <Input
                        className="form__control title"
                        id="title"
                        type="text"
                        required autoFocus
                        placeholder="Title of book..."
                        onChange={(event) => {
                            // This onChange event is responsible for updating the value of the title property on the book object
                            const bookCopy = { ...book }
                            bookCopy.title = event.target.value
                            updateBook(bookCopy)
                        }} />
                </FormGroup>
                <FormGroup className="form__field">
                    <Label for="author" className="form__label">Author: </Label>
                    <Input
                        className="form__control author"
                        id="author"
                        type="text"
                        required
                        placeholder="Name of author..."
                        onChange={(event) => {
                            // This onChange event is responsible for updating the value of the author property on the book object
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
                            // This onChange event is responsible for updating the value of the publicationYear property on the book object
                            const bookCopy = { ...book }
                            bookCopy.publicationYear = event.target.value
                            updateBook(bookCopy)
                        }} />
                </FormGroup>
                <FormGroup className="form__field">
                    <Label for="url" className="form__label">URL: (ex. wikipedia, goodreads, amazon, etc) </Label>
                    <Input
                        className="form__control"
                        id="url"
                        type="url"
                        pattern="https?://.+" title="Include http://"
                        placeholder="https://www..."
                        onChange={(event) => {
                            // This onChange event is responsible for updating the value of the url property on the book object
                            const bookCopy = { ...book }
                            bookCopy.url = event.target.value
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
                            // This onChange event is responsible for updating the value of the shelfId property on the userBook object
                            const userBookCopy = { ...userBook }
                            userBookCopy.shelfId = parseInt(event.target.value)
                            updateUserBook(userBookCopy)

                            // It also updates the value of the shelfId property on the post object
                            const postCopy = { ...post }
                            postCopy.shelfId = parseInt(event.target.value)
                            updatePost(postCopy)
                        }}>
                        <option hidden value="">Choose a shelf...</option>
                        {
                            // Here we are iterating through the shelves array using the .map method and returning an <option> element for each shelf object
                            shelves.map((s) => {
                                return <option key={s.id} value={s.id}>{s.name}</option>
                            })
                        }
                    </Input>
                </FormGroup>
                {
                    // IF the value of the shelfId property on the userBook object is equal to 3...
                    hasBeenRead
                        ?
                        // Render the following <FormGroup> element
                        <>
                            <FormGroup className="form__field">
                                <Label for="dateRead" className="form__label">Date read: </Label>
                                <Input
                                    required
                                    className="form__control"
                                    type="date"
                                    id="date"
                                    onChange={(event) => {
                                        // This onChange event is responsible for updating the value of the dateRead property on the userBook object
                                        const userBookCopy = { ...userBook }
                                        userBookCopy.dateRead = event.target.value
                                        updateUserBook(userBookCopy)
                                    }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="rating" className="form__label">Rating: </Label>
                                {
                                    userBook.rating === 0
                                        ?
                                        displayFiveStars
                                        :
                                        displayStarRating
                                }
                            </FormGroup>
                        </>
                        // ELSE (meaning userBook.shelfId is NOT equal to 3), do NOT render the above <FormGroup> element
                        : ""
                }
                <Button className="btn submit-book">Submit</Button>
                <Button className="btn cancel-book" onClick={() => { history.push("/mybooks") }}>Cancel</Button>
                <Button className="btn search-book" onClick={() => toggleSearchBar(true)}>Back to search</Button>
            </Form>
    )
}
export default NewBookForm