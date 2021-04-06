/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/manufactures/manufacturesActions";
import { useManufacturesUIContext } from "../ManufacturesUIContext";

export function ManufacturesDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.manufactures.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected manufactures we should close modal
  useEffect(() => {
    if (!manufacturesUIProps.ids || manufacturesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manufacturesUIProps.ids]);

  const deleteManufactures = () => {
    // server request for deleting Manufacture by seleted ids
    dispatch(actions.deleteManufactures(manufacturesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchManufactures(manufacturesUIProps.queryParams)).then(() => {
        // clear selections list
        manufacturesUIProps.setIds([]);
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
          Manufactures Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected manufactures?</span>
        )}
        {isLoading && <span>Manufactures are deleting...</span>}
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
            onClick={deleteManufactures}
            className="btn btn-danger btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
