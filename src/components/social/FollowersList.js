import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Table } from "reactstrap"
import useSimpleAuth from "../../hooks/useSimpleAuth"
import FollowsRepository from "../../repositories/FollowsRepository"
import UsersRepository from "../../repositories/UsersRepository"
import BooksRepositiory from "../../repositories/BooksRepositiory"
import FollowUsers from "./FollowUsers"
import Follower from "./Follower"
import "./FollowersList.css"
const FollowersList = () => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const [follows, setFollows] = useState([])
    const [users, setUsers] = useState([])
    const [books, setBooks] = useState([])

    // This function is responsible for updating our follows state variable. It is called in the following useEffect hook.
    const syncFollowList = () => {
        // (see the FollowsRepository module for the getAll() function declaration)
        FollowsRepository.getAll().then(setFollows)
    }

    useEffect(() => {
        syncFollowList()
    }, [])

    // This useEffect is responsible for updating the shelves state variable with the data we FETCH from the API (only runs once b/c of empty dependency array)
    useEffect(() => {
        // (see the UsersRepository for the getAll() function declaration)
        UsersRepository.getAll().then(setUsers)
    }, [])

    // This useEffect is responsible for updating the shelves state variable with the data we FETCH from the API (only runs once b/c of empty dependency array)
    useEffect(() => {
        // (see the BooksRepository for the getAll() function declaration)
        BooksRepositiory.getAll().then(setBooks)
    }, [])

    // The value of currentUsersFollows is an array of follow objects that have a userId property with a value equal to the primary key of the currentUser
    const currentUsersFollows = follows.filter(follow => follow.userId === currentUser.id)

    // This function is responsible for returning a user object that has a primary key with a value equal to whatever is passed into the function as an argument
    const findFollowedUser = (followedUserId) => {
        for (const user of users) {
            if (user.id === followedUserId) {
                return user
            }
        }
    }

    // This function is responsible for returning an array of userBook objects that are embedded in the user object that satisfies the conditions set in the if statement
    const getUserBooksByFollowedUserId = (followedUserId) => {
        for (const user of users) {
            if (user.id === followedUserId) {
                return user.userBooks
            }
        }
    }

    return (
        <>
            <div className="header-friends">
                <h2>People I follow</h2>
            </div>
            <main className="friends-container">
                <Table className="friends-container__table" borderless>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Currently reading
                            </th>
                            <th>
                                Total books
                            </th>
                            <th>
                                Date followed
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUsersFollows.map(follow => {
                                const followedUser = findFollowedUser(follow.followedUserId)

                                const followedUserBooks = getUserBooksByFollowedUserId(follow.followedUserId)
                                const getFollowedsCurrentRead = () => {
                                    if (followedUserBooks?.length) {
                                        for (const userBook of followedUserBooks) {
                                            if (userBook.shelfId === 2) {
                                                return userBook
                                            }
                                        }
                                    }
                                    else {
                                        return null
                                    }
                                }

                                const followedsCurrentRead = getFollowedsCurrentRead()

                                const findBook = () => {
                                    if (followedsCurrentRead) {
                                        for (const book of books) {
                                            if (book.id === followedsCurrentRead.bookId) {
                                                return book
                                            }
                                        }
                                    }
                                    else {
                                        return ""
                                    }
                                }
                                const foundBook = findBook()


                                return <Follower key={follow.id}
                                    followId={follow.id}
                                    firstName={followedUser?.firstName}
                                    lastName={followedUser?.lastName}
                                    currentTitle={foundBook?.title}
                                    currentAuthor={foundBook?.author}
                                    totalBookCount={followedUserBooks ? followedUserBooks.length : "0"}
                                    dateFollowed={follow.dateFollowed}
                                    syncFollowList={syncFollowList}
                                />
                            })
                        }
                    </tbody>
                </Table>
                <FollowUsers
                    className="add-friends"
                    syncFollowList={syncFollowList}
                />
            </main>
        </>
    )
}
export default FollowersList