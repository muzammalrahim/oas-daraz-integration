import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CategoryStatusCssClasses } from "../CategoriesUIHelpers";
import * as actions from "../../../_redux/categories/categoriesActions";
import { useCategoriesUIContext } from "../CategoriesUIContext";

const selectedCategories = (entities, ids) => {
  const _categories = [];
  ids.forEach((id) => {
    const category = entities.find((el) => el.id === id);
    if (category) {
      _categories.push(category);
    }
  });
  return _categories;
};

export function CategoriesUpdateStatusDialog({ show, onHide }) {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      setIds: categoriesUIContext.setIds,
      queryParams: categoriesUIContext.queryParams,
    };
  }, [categoriesUIContext]);

  // Categories Redux state
  const { categories, isLoading } = useSelector(
    (state) => ({
      categories: selectedCategories(state.categories.entities, categoriesUIProps.ids),
      isLoading: state.categories.actionsLoading,
    }),
    shallowEqual
  );

  // if there weren't selected categories we should close modal
  useEffect(() => {
    if (categoriesUIProps.ids || categoriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for updateing category by ids
    dispatch(actions.updateCategoriesStatus(categoriesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCategories(categoriesUIProps.queryParams)).then(
          () => {
            // clear selections list
            categoriesUIProps.setIds([]);
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
          Status has been updated for selected categories
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
            {categories.map((category) => (
              <div className="list-timeline-item mb-3" key={category.id}>
                <span className="list-timeline-text">
                  <span
                    className={`label label-lg label-light-${
                      CategoryStatusCssClasses[category.status]
                    } label-inline`}
                    style={{ width: "60px" }}
                  >
                    ID: {category.id}
                  </span>{" "}
                  <span className="ml-5">
                    {category.manufacture}, {category.model}
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
            className={`form-control ${CategoryStatusCssClasses[status]}`}
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
