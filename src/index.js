import { createStore, applyMiddleware, combineReducers } from "redux";

let students = {
  name: ""
};

let products = {
  id: 0
};

const productReducer = (state = products, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return {
        ...products,
        id: action.id
      };
    }
    default:
      return state;
  }
};
const studentReducer = (state = students, action) => {
  switch (action.type) {
    case "ADD_STUDENT": {
      return {
        ...students,
        name: action.name
      };
    }

    default: {
      return state;
    }
  }
};

const loggingMiddleware = store => next => action => {
  console.log("logging actions", action);
  next(action);
};
const multiActionMiddleware = store => next => actions => {
  if (Array.isArray(actions)) {
    actions.forEach(action => {
      next(action);
    });
  } else {
    next(actions);
  }
};

const Midelewares = applyMiddleware(multiActionMiddleware, loggingMiddleware);
const rootReducer = combineReducers({
  productReducer,
  studentReducer
});
const store = createStore(rootReducer, Midelewares);

store.subscribe(() => console.log(store.getState()));

const actions = [
  { type: "ADD_STUDENT", name: "var" },
  { type: "ADD_PRODUCT", id: 6 }
];

store.dispatch(actions);
