/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/enquiries/enquiriesActions";
import { useEnquiriesUIContext } from "../EnquiriesUIContext";

export function EnquiriesDeleteDialog({ show, onHide }) {
  // Enquiries UI Context
  const enquiriesUIContext = useEnquiriesUIContext();
  const enquiriesUIProps = useMemo(() => {
    return {
      ids: enquiriesUIContext.ids,
      setIds: enquiriesUIContext.setIds,
      queryParams: enquiriesUIContext.queryParams,
    };
  }, [enquiriesUIContext]);

  // Enquiries Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.enquiries.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected enquiries we should close modal
  useEffect(() => {
    if (!enquiriesUIProps.ids || enquiriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiriesUIProps.ids]);

  const deleteEnquiries = () => {
    // server request for deleting enquiry by seleted ids
    dispatch(actions.deleteEnquiries(enquiriesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchEnquiries(enquiriesUIProps.queryParams)).then(() => {
        // clear selections list
        enquiriesUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Enquiries Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected enquiries?</span>
        )}
        {isLoading && <span>Enquiries are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteEnquiries}
            className="btn btn-danger btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
