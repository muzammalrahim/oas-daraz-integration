import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { ManufactureStatusCssClasses } from "../ManufacturesUIHelpers";
import { useManufacturesUIContext } from "../ManufacturesUIContext";

const selectedManufactures = (entities, ids) => {
  const _manufactures = [];
  ids.forEach((id) => {
    const manufacture = entities.find((el) => el.id === id);
    if (manufacture) {
      _manufactures.push(manufacture);
    }
  });
  return _manufactures;
};

export function ManufacturesFetchDialog({ show, onHide }) {
  // Manufactures UI Context
  const manufacturesUIContext = useManufacturesUIContext();
  const manufacturesUIProps = useMemo(() => {
    return {
      ids: manufacturesUIContext.ids,
      queryParams: manufacturesUIContext.queryParams,
    };
  }, [manufacturesUIContext]);

  // Manufactures Redux state
  const { manufactures } = useSelector(
    (state) => ({
      manufactures: selectedManufactures(state.manufactures.entities, manufacturesUIProps.ids),
    }),
    shallowEqual
  );

  // if there weren't selected ids we should close modal
  useEffect(() => {
    if (!manufacturesUIProps.ids || manufacturesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manufacturesUIProps.ids]);

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
            {manufactures.map((manufacture) => (
              <div className="list-timeline-item mb-3" key={manufacture.id}>
                <span className="list-timeline-text">
                  <span
                    className={`label label-lg label-light-${
                      ManufactureStatusCssClasses[manufacture.status]
                    } label-inline`}
                    style={{ width: "60px" }}
                  >
                    ID: {manufacture.id}
                  </span>{" "}
                  <span className="ml-5">
                    {manufacture.manufacture}, {manufacture.model}
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
