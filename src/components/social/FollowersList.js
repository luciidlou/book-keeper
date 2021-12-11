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

    const syncFollowList = () => {
        FollowsRepository.getAll().then(setFollows)
    }

    useEffect(() => {
        syncFollowList()
    }, [])

    useEffect(() => {
        UsersRepository.getAll().then(setUsers)
    }, [])

    useEffect(() => {
        BooksRepositiory.getAll().then(setBooks)
    }, [])

    const currentUsersFollows = follows.filter(follow => follow.userId === currentUser.id)
    const findFollowedUser = (followedUserId) => {
        for (const user of users) {
            if (user.id === followedUserId) {
                return user
            }
        }
    }
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