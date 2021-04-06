import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { EnquiryStatusCssClasses } from "../EnquiriesUIHelpers";
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

export function EnquiriesFetchDialog({ show, onHide }) {
  // Enquiries UI Context
  const enquiriesUIContext = useEnquiriesUIContext();
  const enquiriesUIProps = useMemo(() => {
    return {
      ids: enquiriesUIContext.ids,
      queryParams: enquiriesUIContext.queryParams,
    };
  }, [enquiriesUIContext]);

  // Enquiries Redux state
  const { enquiries } = useSelector(
    (state) => ({
      enquiries: selectedEnquiries(state.enquiries.entities, enquiriesUIProps.ids),
    }),
    shallowEqual
  );

  // if there weren't selected ids we should close modal
  useEffect(() => {
    if (!enquiriesUIProps.ids || enquiriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enquiriesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            onClick={onHide}
            className="btn btn-info btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
