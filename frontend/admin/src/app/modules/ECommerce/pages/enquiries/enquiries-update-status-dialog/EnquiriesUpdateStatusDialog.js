import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EnquiryStatusCssClasses } from "../EnquiriesUIHelpers";
import * as actions from "../../../_redux/enquiries/enquiriesActions";
import { useEnquiriesUIContext } from "../EnquiriesUIContext";

const selectedEnquiries = (entities, ids) => {
  const _enquiries = [];
  ids.forEach((id) => {
    const enquiry = entities.find((el) => el.id === id);
    if (enquiry) {
      _enquiries.push(enquiry);
    }
  });
  return _enquiries;
};

export function EnquiriesUpdateStatusDialog({ show, onHide }) {
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
  const { enquiries, isLoading } = useSelector(
    (state) => ({
      enquiries: selectedEnquiries(state.enquiries.entities, enquiriesUIProps.ids),
      isLoading: state.enquiries.actionsLoading,
    }),
    shallowEqual
  );

  // if there weren't selected enquiries we should close modal
  useEffect(() => {
    if (enquiriesUIProps.ids || enquiriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiriesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for updateing enquiry by ids
    dispatch(actions.updateEnquiriesStatus(enquiriesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchEnquiries(enquiriesUIProps.queryParams)).then(
          () => {
            // clear selections list
            enquiriesUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected enquiries
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {isLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-warning" />
          </div>
        )}
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
            {enquiries.map((enquiry) => (
              <div className="list-timeline-item mb-3" key={enquiry.id}>
                <span className="list-timeline-text">
                  <span
                    className={`label label-lg label-light-${
                      EnquiryStatusCssClasses[enquiry.status]
                    } label-inline`}
                    style={{ width: "60px" }}
                  >
                    ID: {enquiry.id}
                  </span>{" "}
                  <span className="ml-5">
                    {enquiry.manufacture}, {enquiry.model}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className={`form-control ${EnquiryStatusCssClasses[status]}`}
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Selling</option>
            <option value="1">Sold</option>
          </select>
        </div>
        <div className="form-group">
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
            onClick={updateStatus}
            className="btn btn-info btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
