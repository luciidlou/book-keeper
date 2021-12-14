import { Button } from "reactstrap"
import FollowsRepository from "../../repositories/FollowsRepository"
import "./Follower.css"

// This function is responsible for rendering our Follower component. It returns a single follow object as a <tr>(table row)</tr> element (JSX)
const Follower = (props) => {
    // This function is responsible for deleting a follow object, and THEN updating the follows state located in the FollowersList module... 
    const handleUnfollow = () => {
        // (see the FollowsRepository module for the delete() function declaration)
        FollowsRepository.delete(props.followId)
            // (see the FollowersList module for the syncFollowList function declaration)
            .then(props.syncFollowList)
    }
    return (
        <tr className="followsRow">
            <th scope="row">
                {props.firstName} {props.lastName}
            </th>
            <td>
                {props.currentTitle ? `${props.currentTitle} by ${props.currentAuthor}` : "Not currently reading"}
            </td>
            <td>
                {props.totalBookCount}
            </td>
            <td>
                {props.dateFollowed}
            </td>
            <td>
            </td>
            <td>
                <Button onClick={handleUnfollow}>unfollow</Button>
            </td>
        </tr>
    )
}
export default Follower