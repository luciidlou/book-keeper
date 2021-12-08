import useSimpleAuth from "../hooks/useSimpleAuth"
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap"
import PostsRepository from "../repositories/PostsRepository"
import "./Post.css"

const Post = (props) => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()

    const handleDynamicText = () => {
        if (props.shelfId === 1) {
            return "wants to read"
        }
        else if (props.shelfId === 2) {
            return "is currently reading"
        }
        else {
            return "just finished reading"
        }
    }
    const displayDynamicText = handleDynamicText()

    const isCurrentUsersPost = props.userId === currentUser.id


    const handleDeletePost = () => {
        PostsRepository.delete(props.postId)
            .then(props.syncPosts)
    }

    return (
        <Card className="noteCard">
            <CardBody className="noteCard__body">
                <CardTitle className="noteCard__title">
                    <span className="user-name">{props.firstName} {props.lastName}</span> {displayDynamicText} {props.title} by {props.author}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted noteCard__date"
                    tag="h6"
                >
                    {props.dateCreated}
                </CardSubtitle>
                <CardText>
                    What do I put here???
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
    )
}
export default Post