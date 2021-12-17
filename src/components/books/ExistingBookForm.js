import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import useSimpleAuth from "../../hooks/useSimpleAuth"
import PostsRepository from "../../repositories/PostsRepository"
import ShelvesRepository from "../../repositories/ShelvesRepository"
import UserBooksRepository from "../../repositories/UserBooksRepository"
import "./NewBookForm.css"

// This function is responsible for rendering our BookForm component. It returns a <Form> element (JSX)
const ExistingBookForm = ({ books, syncBooks, syncUserBooks, toggleSearchBar }) => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const history = useHistory()
    const [shelves, setShelves] = useState([])
    const { bookId } = useParams()

    // Here we are declaring the userBook state variable with the useState() hook and initializing it as an object with 5 key:value pairs 
    const [userBook, updateUserBook] = useState({
        bookId: 0,
        userId: currentUser.id,
        shelfId: 0,
        dateAdded: "",
        dateRead: ""
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

    // This useEffect is responsible for updating the books state variable with the data we FETCH from the API (only runs once b/c of empty dependency array)
    useEffect(() => {
        // (see the BookRoutes module for the syncBooks() function declaration)
        syncBooks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // The value of hasBeenRead is a boolean. It is TRUE if the userBook object has a shelfId with a value of 3
    const hasBeenRead = userBook.shelfId === 3

    const foundBook = books.find(b => b.id === parseInt(bookId))

    // This function is responsible for sending three new objects to the API using the POST fetch method. Those objects are book, userBook, and post.
    const handleSubmit = (event) => {
        // The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
        event.preventDefault()
        userBook.dateAdded = Date.now()
        post.dateCreated = Date.now()
        userBook.bookId = parseInt(bookId)
        // This is where we send the userBook object to the API using the POST fetch method (see the UserBooksRepository module for the add() function)
        UserBooksRepository.add(userBook)
            // THEN, capture the response from the fetch call and use it to change the value of the bookId property on the post object
            .then((userBookResponse) => post.bookId = userBookResponse.bookId)
            // THEN, send the post object to the API using the POST fetch method. (see the PostsRepository module for the add() function declaration)
            .then(() => PostsRepository.add(post))
            // THEN, update the userBooks state variable by calling the syncUserBooks function (see BookRoutes module for function declaration)
            .then(syncUserBooks)
            // THEN, send the user back to the "/mybooks" url extension using history.push
            .then(() => history.push("/mybooks"))
    }

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <h2 className="form__header">Add "{foundBook?.title}" to your library!</h2>
            <FormGroup className="form__field">
                <Label for="title" className="form__label">Title: </Label>
                <div>{foundBook?.title}</div>
            </FormGroup>
            <FormGroup className="form__field">
                <Label for="author" className="form__label">Author: </Label>
                <div>{foundBook?.author}</div>
            </FormGroup>
            <FormGroup className="form__field">
                <Label for="publicationYear" className="form__label">Publication year: </Label>
                <div>{foundBook?.publicationYear}</div>
            </FormGroup>
            <FormGroup className="form__field">
                <Label for="url" className="form__label">URL: (ex. wikipedia, goodreads, amazon, etc) </Label>
                <div><a target="_blank" rel="noreferrer" href={foundBook?.url}>{foundBook?.url}</a></div>
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
                    // ELSE (meaning userBook.shelfId is NOT equal to 3), do NOT render the above <FormGroup> element
                    : ""
            }
            <Button className="btn submit-book">Submit</Button>
            <Button className="btn cancel-book" onClick={() => { history.push("/mybooks") }}>Cancel</Button>
            <Button className="btn search-book" onClick={() => history.push("/mybooks/addbook")}>Back to search</Button>
        </Form>
    )
}
export default ExistingBookForm