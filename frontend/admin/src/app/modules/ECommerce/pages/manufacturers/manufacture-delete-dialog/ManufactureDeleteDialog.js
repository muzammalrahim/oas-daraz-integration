/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/manufactures/manufacturesActions";
import { useManufacturesUIContext } from "../ManufacturesUIContext";

export function ManufactureDeleteDialog({ id, show, onHide }) {
  // Manufactures UI Context
  const manufacturesUIContext = useManufacturesUIContext();
  const manufacturesUIProps = useMemo(() => {
    return {
      setIds: manufacturesUIContext.setIds,
      queryParams: manufacturesUIContext.queryParams,
    };
  }, [manufacturesUIContext]);

  // manufactures Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.manufactures.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteManufacture = () => {
    // server request for deleting Manufacture by id
    dispatch(actions.deleteManufacture(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchManufactures(manufacturesUIProps.queryParams));
      // clear selections list
      manufacturesUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Manufacture Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this manufacture?</span>
        )}
        {isLoading && <span>Manufacture is deleting...</span>}
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
            onClick={deleteManufacture}
            className="btn btn-danger btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
