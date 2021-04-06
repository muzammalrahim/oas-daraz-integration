import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { CategoryStatusCssClasses } from "../CategoriesUIHelpers";
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

export function CategoriesFetchDialog({ show, onHide }) {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      queryParams: categoriesUIContext.queryParams,
    };
  }, [categoriesUIContext]);

  // Categories Redux state
  const { categories } = useSelector(
    (state) => ({
      categories: selectedCategories(state.categories.entities, categoriesUIProps.ids),
    }),
    shallowEqual
  );

  // if there weren't selected ids we should close modal
  useEffect(() => {
    if (!categoriesUIProps.ids || categoriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesUIProps.ids]);

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
