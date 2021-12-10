import { Button } from "reactstrap"
import FollowsRepository from "../repositories/FollowsRepository"

const Follower = (props) => {
    const handleUnfollow = () => {
        FollowsRepository.delete(props.followId)
            .then(props.syncFollowList)
        // debugger
    }
    return (
        <tr>
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