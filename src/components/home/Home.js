import { useHistory } from "react-router-dom"
import "./Home.css"

const Home = () => {
    const history = useHistory()

    return (
        <main className="container">
            <aside className="aside">
                <button className="new-book-btn" onClick={() => {history.push("/mybooks/register")}}>Add new book</button>
                <div className="aside__book">
                    Display current book
                </div>
                <div className="aside__shelves">
                    Display book count in shelves
                </div>
            </aside>
            <section className="feed">
                Display shelf updates here
            </section>
        </main>
    )
}
export default Home