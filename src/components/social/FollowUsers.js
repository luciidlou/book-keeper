import moment from "moment"
import { useEffect, useState } from "react"
import { Button } from "reactstrap"
import useSimpleAuth from "../hooks/useSimpleAuth"
import FollowsRepository from "../repositories/FollowsRepository"
import UsersRepository from "../repositories/UsersRepository"
import "./FollowUsers.css"

const FollowUsers = (props) => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const [users, setUsers] = useState([])
    const [follows, setFollows] = useState([])

    const syncUsers = () => {
        UsersRepository.getAll().then(setUsers)
    }

    const syncFollows = () => {
        FollowsRepository.getAll().then(setFollows)
    }

    useEffect(() => {
        syncUsers()
    }, [props.syncFollowList])

    useEffect(() => {
        syncFollows()
    }, [props.syncFollowList])

    const isolateFollowIds = () => {
        const followIdArr = []
        for (const follow of follows) {
            followIdArr.push(follow.followedUserId)
        }
        return followIdArr
    }
    const arrOfFollowIds = isolateFollowIds()

    return (
        <div className="container">
            <h4 className="container-header">Want to follow more people?</h4>
            <aside className="add-friends">
                {
                    users.map(user => {
                        const handleFollow = () => {
                            const currentDate = new Date()
                            const newFollow = {
                                userId: currentUser.id,
                                followedUserId: user.id,
                                dateFollowed: moment(currentDate).format('MMMM Do YYYY')
                            }
                            FollowsRepository.add(newFollow)
                                // .then(isolateFollowIds)
                                // .then(syncUsers)
                                // .then(syncFollows)
                                .then(props.syncFollowList)
                        }
                        if (user.id !== currentUser.id && !arrOfFollowIds.includes(user.id)) {
                            return (
                                <div className="add-friends__list" key={user.id}>
                                    <div className="user-name">
                                        {user.firstName} {user.lastName}
                                    </div>
                                    <div className="btn friend-btn">
                                        <Button onClick={handleFollow}>Follow</Button>
                                    </div>
                                </div>
                            )
                        }
                        else {
                            return ""
                        }
                    })
                }
            </aside>
        </div>
    )
}
export default FollowUsers