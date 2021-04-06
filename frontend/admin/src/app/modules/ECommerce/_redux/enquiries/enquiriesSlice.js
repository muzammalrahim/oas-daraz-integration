import {createSlice} from "@reduxjs/toolkit";

const initialEnquiriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  enquiryForEdit: undefined,
  lastError: null,
  pageNumber:1
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState: initialEnquiriesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getEnquiryById
    enquiryFetched: (state, action) => {
      state.actionsLoading = false;
      state.enquiryForEdit = action.payload.enquiryForEdit;
      state.error = null;
    },
    // findEnquiries
    enquiriesFetched: (state, action) => {
      const { count, results, pageNumber } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = results;
      state.totalCount = count;
      state.pageNumber = pageNumber;
    },
    // createEnquiry
    enquiryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.enquiry);
    },
    // updateEnquiry
    enquiryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.enquiry.id) {
          return action.payload.enquiry;
        }
        return entity;
      });
    },
    // deleteEnquiry
    enquiryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteEnquiries
    enquiriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // enquiriesUpdateState
    enquiriesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
