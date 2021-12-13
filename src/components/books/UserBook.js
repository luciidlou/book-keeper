import moment from "moment"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Input } from "reactstrap"
import useSimpleAuth from "../../hooks/useSimpleAuth"
import PostsRepository from "../../repositories/PostsRepository"
import ShelvesRepository from "../../repositories/ShelvesRepository"
import UserBooksRepository from "../../repositories/UserBooksRepository"
import "./UserBook.css"

// This function is responsible for rendering the UserBook component. It returns a single userBook object as a <tr>(table row)</tr> element (JSX)
const UserBook = (props) => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const history = useHistory()
    const [shelves, setShelves] = useState([])
    // Here we are declaring the post state variable with the useState() hook and initializing it as an object with 4 key:value pairs
    const [post] = useState({
        bookId: 0,
        userId: currentUser.id,
        shelfId: 0,
        dateCreated: 0
    })
    // This function is responsible for updating the shelves state variable with the data that we FETCH from the API (function is called in the following useEffect hook)
    const syncShelves = () => {
        // see the ShelvesRepository module for the getAll() function declaration
        ShelvesRepository.getAll().then(setShelves)
    }

    useEffect(() => {
        syncShelves()
    }, [])
    
    // This function is responsible for deleting a userBook object, and THEN updating the userBooks state located in the BookRoutes module...
    const handleRemoveBook = () => {
        // This is where the DELETE fetch call is executed on the specified userBook object. (See the userBooksRepository module to understand the delete function)
        UserBooksRepository.delete(props.userBookId)
            // THEN it updates the userBooks state located in the BookRoutes module
            .then(props.syncUserBooks)
    }
    // This function is responsible for updating the shelfId property of a specified userBook object, and THEN creates a new post object... 
    const handleShelfChange = (event) => {
        // The value of newShelf is the primary key of the shelf object that the user selected in the dropdown 
        const newShelf = parseInt(event.target.value)
        const currentDate = new Date()

        post.shelfId = newShelf
        post.dateCreated = moment(currentDate).format('MMMM Do YYYY, h:mm:ss a')

        // This object is an exact copy of the userBook object being altered in the userBookList component. The only difference is that the shelfId property is being updated
        const editedUserBook = {
            id: props.userBookId,
            bookId: props.bookId,
            shelfId: newShelf,
            userId: props.userId,
            url: props.url,
            dateAdded: props.dateAdded,
            dateRead: props.dateRead
        }
        // This is where the PUT fetch call is executed on the specified userBook object. (See the userBooksRepository module to understand the updateShelf function)
        UserBooksRepository.updateShelf(editedUserBook)
            // THEN it sets the bookId foreign key on the post object with the same bookId foreign key from the userBook object we just updated
            .then(userBookResponse => { post.bookId = userBookResponse.bookId })
            // THEN it creates a post object that will have the same bookId foreign key from the userBook we just updated 
            .then(() => PostsRepository.add(post))
            // THEN it updates the userBooks state located in the BookRoutes module
            .then(props.syncUserBooks)
            // THEN it updates the shelves state
            .then(() => syncShelves())
    }
    // This function is responsible for updating the dateRead property of a specified userBook object... 
    const handleDateReadChange = (event) => {
        // The value of newDateRead is the date string that the user chose in the date input field 
        const newDateRead = event.target.value

        // This object is an exact copy of the userBook object being altered in the userBookList component. The only difference is that the dateRead property is being updated
        const editedUserBook = {
            id: props.userBookId,
            bookId: props.bookId,
            shelfId: props.shelf?.id,
            userId: props.userId,
            url: props.url,
            dateAdded: props.dateAdded,
            dateRead: newDateRead
        }
        // This is where the PUT fetch call is executed on the specified userBook object. (See the userBooksRepository module to understand the updateDateRead function)
        UserBooksRepository.updateDateRead(editedUserBook)
            // THEN it updates the userBooks state located in the BookRoutes module
            .then(props.syncUserBooks)
    }
    // This function is responsible for returning an <Input /> element based on the conditions set in the IF ELSE statements...
    const generateDateRead = () => {
        // The value of hasBeenRead is a BOOLEAN. It is TRUE if the userBook object has a shelfId equal to 3
        const hasBeenRead = props.shelf?.id === 3

        // IF the userBook does NOT have a shelfId of 3 AND it's dateRead property is equal to a FALSEY value 
        if (!hasBeenRead && !props.dateRead) {
            return <Input
                disabled
                placeholder="mm/dd/yyyy"
                className="form__control dateRead"
                type="date"
                onChange={handleDateReadChange} />
        }
        // ELSE IF the userBook DOES have a shelfId of 3 AND it's dateRead property is equal to a FALSEY value            
        else if (hasBeenRead && !props.dateRead) {
            return <Input
                placeholder="mm/dd/yyyy"
                className="form__control dateRead"
                type="date"
                onChange={handleDateReadChange} />
        }
        // ELSE IF the userBook does NOT have a shelfId of 3 AND it's dateRead property is equal to a TRUTHY value            
        else if (!hasBeenRead && props.dateRead) {
            return <Input
                disabled
                defaultValue={props.dateRead}
                className="form__control dateRead"
                type="date"
                onChange={handleDateReadChange} />
        }
        // ELSE IF the userBook has it's dateRead property equal to a TRUTHY value (since this is the final ELSE IF statement, it is implied that the userBook object has a shelfId property equal to 3)          
        else if (props.dateRead) {
            return <Input
                defaultValue={props.dateRead}
                className="form__control dateRead"
                type="date"
                onChange={handleDateReadChange} />
        }
        //  This ELSE statement is used as a failsafe to help show that something may be wrong with the userBook object if none of the above conditions are met (which, one of them should always be met)
        else {
            return "N/A"
        }
    }
    const displayDateRead = generateDateRead()

    // This function is responsible for returning JSX dependent upon the conditions set within...
    const generateDynamicTitle = () => {
        // IF the userBook object's url property is equal to a TRUTHY value
        if (props.url) {
            // RETURN the title of the book in an anchor tag (clickable link)
            return <div><a target="_blank" rel="noreferrer" href={props.url}>{props.title}</a> ({props.publicationYear})</div>
        }
        // ELSE (meaning the userBook object's url property is equal to a FALSEY value)
        else {
            // RETURN the title of the book in a plain div tag 
            return <div>{props.title} ({props.publicationYear})</div>
        }
    }
    const displayDynamicTitle = generateDynamicTitle()


    return (
        <tr className="bookRow">
            <th scope="row">
                {displayDynamicTitle}
            </th>
            <td>
                {props.author}
            </td>
            <td>
                <select
                    value={props.shelf.id}
                    onChange={handleShelfChange}
                    className="readOptions" >
                    {
                        shelves.map(shelf => {
                            return <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                        })
                    }
                </select>
            </td>
            <td>
                {props.dateAdded}
            </td>
            <td>
                {displayDateRead}
            </td>
            <td>
                <Button id="notesBtn" onClick={() => { history.push(`/mybooks/${props.bookId}`) }}>Notes ({props.userBook?.bookNotes.length})</Button>
            </td>
            <td>
                <Button id="deleteNoteBtn" onClick={handleRemoveBook}>Delete</Button>
            </td>
        </tr>
    )
}
export default UserBook