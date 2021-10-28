export default function DeleteButton({ buttonText, name, deleteFunction }) {
    const handleClick = () => {
        deleteFunction();
    };

    return (
        <div className="row pt-2">
            <div className="col-md-6 offset-md-3">
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                    >
                        Delete {buttonText}
                    </button>
                    <div className="modal" tabIndex="-1" id="staticBackdrop">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete {buttonText}</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete {name}?</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-bs-dismiss="modal"
                                        onClick={handleClick}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}