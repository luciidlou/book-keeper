import useSimpleAuth from "../hooks/useSimpleAuth"
import { useState, useEffect } from "react"
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap"
import PostsRepository from "../repositories/PostsRepository"
import FollowsRepository from "../repositories/FollowsRepository"
import "./Post.css"

const Post = (props) => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const [follows, setFollows] = useState([])

    useEffect(() => {
        FollowsRepository.getAll().then(setFollows)
    }, [])

    const handleDynamicText = () => {
        if (props.shelfId === 1) {
            return "wants to read"
        }
        else if (props.shelfId === 2) {
            return "is currently reading"
        }
        else {
            return "finished reading"
        }
    }
    const displayDynamicText = handleDynamicText()

    const isCurrentUsersPost = props.userId === currentUser.id

    const checkIsFollowed = () => {
        for (const follow of follows) {
            if (follow.followId === props.userId && follow.userId === currentUser.id) {
                return true
            }
        }
    }
    const isFollowed = checkIsFollowed()

    const handleDeletePost = () => {
        PostsRepository.delete(props.postId)
            .then(props.syncPosts)
    }

    return (
        isFollowed || isCurrentUsersPost
            ?
            <Card className="postCard">
                <CardBody className="postCard__body">
                    <CardTitle className="postCard__title">
                        <span className="user-name">{props.firstName} {props.lastName}</span>
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted postCard__date"
                        tag="h6"
                    >
                        {displayDynamicText} <span style={{ fontWeight: "bold" }}>{props.title}</span> by {props.author}
                    </CardSubtitle>
                    <CardText>
                        {props.dateCreated}
                    </CardText>
                    {
                        isCurrentUsersPost
                            ?
                            <Button onClick={handleDeletePost}>
                                Delete
                            </Button>
                            : ""
                    }
                </CardBody>
            </Card>
            : ""
    )
}
export default Post