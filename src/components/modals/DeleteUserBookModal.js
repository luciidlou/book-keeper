import { Button } from "reactstrap"

const DeleteUserBookModal = () => {
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <Button>X</Button>
                <div className="modalTitle">
                    <h3>Are you sure you want to continue?</h3>
                </div>
                <div className="modalBody">
                    <p>Removing a book from your library will also remove all of the associated book notes</p>
                </div>
                <div className="modalFooter">
                    <Button>Delete</Button>
                    <Button>Cancel</Button>
                </div>
            </div>
        </div>
    )
}
export default DeleteUserBookModal