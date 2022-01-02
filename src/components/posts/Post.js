import useSimpleAuth from "../../hooks/useSimpleAuth"
import { useState, useEffect } from "react"
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap"
import PostsRepository from "../../repositories/PostsRepository"
import FollowsRepository from "../../repositories/FollowsRepository"
import LikesRepository from "../../repositories/LikesRepository"
import blankStar from "../../images/blank-star.png"
import yellowStar from "../../images/yellow-star.png"
import "./Post.css"
import moment from "moment"

const Post = (props) => {
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const [follows, setFollows] = useState([])
    const [likes, setLikes] = useState([])
    const [isShown, setIsShown] = useState(false)

    const syncLikes = () => {
        LikesRepository.getAll().then(setLikes)
    }
    useEffect(() => {
        FollowsRepository.getAll().then(setFollows)
    }, [])

    useEffect(() => {
        syncLikes()
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
            if (follow.followedUserId === props.userId && follow.userId === currentUser.id) {
                return true
            }
        }
    }
    const isFollowed = checkIsFollowed()

    const handleDeletePost = () => {
        PostsRepository.delete(props.postId)
            .then(props.syncPosts)
    }


    const handleLikePost = () => {
        const newLikeObj = {
            userId: currentUser.id,
            postId: props.postId
        }
        LikesRepository.add(newLikeObj)
            .then(props.syncPosts)
            .then(syncLikes)
    }
    const handleDeleteLike = (id) => {
        LikesRepository.delete(id)
            .then(props.syncPosts)
            .then(syncLikes)
    }

    const postIsLikedByCurrentUser = likes.find(l => l.userId === currentUser.id && l.postId === props.postId)
    const likesPerPost = likes.filter(l => l.postId === props.postId)

    return (
        isFollowed || isCurrentUsersPost
            ?
            <>
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
                            {moment(props.dateCreated).format('MMMM Do YYYY, h:mm:ss a')}
                        </CardText>
                        <div className="likeDeleteContainer">
                            {
                                postIsLikedByCurrentUser
                                    ?
                                    <div>
                                        <img onClick={() => {
                                            LikesRepository.getLikeByUserAndPost(currentUser.id, props.postId)
                                                .then(likeObj => {
                                                    handleDeleteLike(likeObj[0].id)
                                                })
                                        }}
                                            onMouseEnter={() => setIsShown(true)}
                                            onMouseLeave={() => setIsShown(false)}
                                            id="starIcon" src={yellowStar} alt="yellow star indicating a liked post" />
                                        <span className="numberOfPostLikes">{likesPerPost.length}</span>
                                    </div>
                                    :
                                    <div>
                                        <img onClick={handleLikePost}
                                            onMouseEnter={() => setIsShown(true)}
                                            onMouseLeave={() => setIsShown(false)}
                                            id="starIcon" src={blankStar} alt="blank star indicating an unliked post" />
                                        <span className="numberOfPostLikes">{likesPerPost.length}</span>
                                    </div>
                            }
                            {
                                isCurrentUsersPost
                                    ?
                                    <Button id="deletePost" onClick={handleDeletePost}>
                                        Delete
                                    </Button>
                                    : ""
                            }
                        </div>
                    </CardBody>

                </Card>
                {
                    isShown && (
                        <div className="showUsersThatLiked">
                            {
                                likesPerPost.map(likeObj => {
                                    return <div key={likeObj.id}>{likeObj.user?.firstName} {likeObj.user?.lastName} liked this post!</div>
                                })
                            }
                        </div>
                    )
                }
            </>
            : ""
    )
}
export default Post