import {createSlice} from "@reduxjs/toolkit";

const initialManufacturesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  manufactureForEdit: undefined,
  lastError: null,
  pageNumber: 1,
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const manufacturesSlice = createSlice({
  name: "manufactures",
  initialState: initialManufacturesState,
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
    // getManufactureById
    manufactureFetched: (state, action) => {
      state.actionsLoading = false;
      state.manufactureForEdit = action.payload.manufactureForEdit;
      state.error = null;
    },
    // findManufactures
    manufacturesFetched: (state, action) => {
      const { count, results, pageNumber } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = results;
      state.totalCount = count;
      state.pageNumber = pageNumber;
    },
    // createManufacture
    manufactureCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.manufacture);
    },
    // updateManufacture
    manufactureUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.manufacture.id) {
          return action.payload.manufacture;
        }
        return entity;
      });
    },
    // deleteManufacture
    manufactureDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteManufactures
    manufacturesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // manufacturesUpdateState
    manufacturesStatusUpdated: (state, action) => {
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
