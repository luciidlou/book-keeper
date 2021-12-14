import { useEffect, useState } from "react"
import { Button } from "reactstrap"
import BooksRepositiory from "../../repositories/BooksRepositiory"
import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from "react-router-dom";

const SearchBar = ({ toggleSearchBar }) => {
    const [books, setBooks] = useState([])
    const [searchResults, updateSearchResults] = useState([])
    const [userInput, updateUserInput] = useState("")
    const history = useHistory()

    useEffect(() => {
        BooksRepositiory.getAll().then(setBooks)
    }, [])


    const handleSearch = (event) => {
        const searchCriteria = event.target.value
        updateUserInput(searchCriteria)
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchCriteria.toLowerCase()) || book.author.toLowerCase().includes(searchCriteria.toLowerCase()))
        if (searchCriteria === "") {
            updateSearchResults([])
        }
        else {
            updateSearchResults(filteredBooks)
        }
    }

    const clearInput = () => {
        updateSearchResults([])
        updateUserInput("")
    }

    return (
        <div className="search">
            <h4>Let's find a book!</h4>
            <div className="searchInput">
                <input type="text" autoFocus value={userInput} onChange={handleSearch} />
                <div className="searchIcon">
                    {searchResults.length ? <CloseIcon id="clearBtn" onClick={clearInput} /> : <SearchIcon />}
                </div>
            </div>{
                searchResults.length
                    ?
                    <div className="searchResults">
                        {
                            searchResults.slice(0, 15).map((book, key) => {
                                return (
                                    <div key={book.id} className="bookItem" onClick={() => history.push(`/books/addbook/${book.id}`)}>
                                        <div>{book.title}</div>
                                        <div>By {book.author}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : ""
            }
            <div><Button className="exitSearchBtn" onClick={() => toggleSearchBar(false)}>Can't find the book you're after?</Button></div>
        </div>
    )
}
export default SearchBar