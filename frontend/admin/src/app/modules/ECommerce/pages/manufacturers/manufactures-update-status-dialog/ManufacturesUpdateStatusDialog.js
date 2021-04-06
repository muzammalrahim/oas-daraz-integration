import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ManufactureStatusCssClasses } from "../ManufacturesUIHelpers";
import * as actions from "../../../_redux/manufactures/manufacturesActions";
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

export function ManufacturesUpdateStatusDialog({ show, onHide }) {
  // Manufactures UI Context
  const manufacturesUIContext = useManufacturesUIContext();
  const manufacturesUIProps = useMemo(() => {
    return {
      ids: manufacturesUIContext.ids,
      setIds: manufacturesUIContext.setIds,
      queryParams: manufacturesUIContext.queryParams,
    };
  }, [manufacturesUIContext]);

  // Manufactures Redux state
  const { manufactures, isLoading } = useSelector(
    (state) => ({
      manufactures: selectedManufactures(state.manufactures.entities, manufacturesUIProps.ids),
      isLoading: state.manufactures.actionsLoading,
    }),
    shallowEqual
  );

  // if there weren't selected Manufactures we should close modal
  useEffect(() => {
    if (manufacturesUIProps.ids || manufacturesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manufacturesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for updateing manufacture by ids
    dispatch(actions.updateManufacturesStatus(manufacturesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchManufactures(manufacturesUIProps.queryParams)).then(
          () => {
            // clear selections list
            manufacturesUIProps.setIds([]);
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
          Status has been updated for selected manufactures
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className={`form-control ${ManufactureStatusCssClasses[status]}`}
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
