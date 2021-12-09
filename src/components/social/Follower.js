import { Button } from "reactstrap"

const Follower = (props) => {
    return (
        <tr>
            <th scope="row">
                {props.firstName} {props.lastName}
            </th>
            <td>
                {props.currentTitle} by {props.currentAuthor}
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
                <Button>unfollow</Button>
            </td>
        </tr >
    )
}
export default Follower