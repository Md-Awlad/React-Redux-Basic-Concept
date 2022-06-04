// const { createStore } = require("redux");

// const INCREMENT = "INCREMENT";
// const DECREMENT = "DECREMENT";
// const RESET = "RESET";
// const INCREMENT_BY_VALUE = "INCREMENT_BY_VALUE";
// const ADD_USER = "ADD_USER";

// const initializeCounterState = {
//   count: 0,
// };

// const initialState = {
//   users: ["Awlad"],
//   count: 1,
// };

// const addUser = (user) => {
//   return {
//     type: ADD_USER,
//     payload: user,
//   };
// };

// const incrementCounter = () => {
//   return {
//     type: "INCREMENT",
//   };
// };
// const decrementCounter = () => {
//   return {
//     type: "DECREMENT",
//   };
// };
// const resetCounter = () => {
//   return {
//     type: "RESET",
//   };
// };
// const incrementByValue = (value) => {
//   return {
//     type: "INCREMENT_BY_VALUE",
//     payload: value,
//   };
// };

// const counterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT:
//       return {
//         ...state,
//         count: state.count + 1,
//       };
//     case DECREMENT:
//       return {
//         ...state,
//         count: state.count - 1,
//       };
//     case RESET:
//       return {
//         ...state,
//         count: 0,
//       };
//     case INCREMENT_BY_VALUE:
//       return {
//         ...state,
//         count: state.count + action.payload,
//       };
//     case ADD_USER:
//       return {
//         users: [...state.users, action.payload],
//         count: state.count + 1,
//       };

//     default:
//       state;
//   }
// };

// const store = createStore(counterReducer);
// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch(incrementCounter());
// store.dispatch(incrementCounter());
// store.dispatch(incrementCounter());
// store.dispatch(incrementCounter());
// store.dispatch(incrementCounter());
// store.dispatch(incrementCounter());
// store.dispatch(incrementCounter());
// store.dispatch(decrementCounter());
// store.dispatch(decrementCounter());
// store.dispatch(decrementCounter());
// store.dispatch(incrementByValue(6));
// store.dispatch(incrementByValue(20));
// store.dispatch(addUser("Emran"));

// const GET_PRODUCTS = "GET_PRODUCTS";
// const ADD_PRODUCT = "ADD_PRODUCT";

// const initialProductState = {
//   products: ["Redmi", "Samsung"],
//   count: 2,
// };

// const getProducts = () => {
//   return {
//     type: GET_PRODUCTS,
//   };
// };

// const addProduct = (product) => {
//   return {
//     type: ADD_PRODUCT,
//     payload: product,
//   };
// };

// const productReducer = (state = initialProductState, action) => {
//   switch (action.type) {
//     case GET_PRODUCTS:
//       return {
//         ...state,
//       };
//     case ADD_PRODUCT:
//       return {
//         products: [...state.products, action.payload],
//         count: state.count + 1,
//       };

//     default:
//       state;
//   }
// };

// const store = createStore(productReducer, applyMiddleware(logger));
// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch(getProducts());
// store.dispatch(addProduct("Realme"));
// store.dispatch(addProduct("techno"));

const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const thunk = require("redux-thunk").default;

//constant
const GET_TODOS_REQUEST = "GET_TODO_REQUEST";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILED = "GET_TODO_FAILED";
const APP_URL = "https://jsonplaceholder.typicode.com/todos";

//states
const initialTodosState = {
  todos: [],
  isLoading: false,
  error: null,
};

//action
const getTodosRequest = () => {
  return {
    type: GET_TODOS_REQUEST,
  };
};
const getTodosFailed = (error) => {
  return {
    type: GET_TODOS_FAILED,
    payload: error,
  };
};
const getTodosSuccess = (todos) => {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  };
};

//reducer
const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    case GET_TODOS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//async action create
const fetchData = () => {
  return (dispatch) => {
    dispatch(getTodosRequest());
    axios
      .get(APP_URL)
      .then((res) => {
        // console.log(res.data);
        const todos = res.data;
        const titles = todos.map((todo) => todo.id);
        // console.log(titles);
        dispatch(getTodosSuccess(titles));
      })
      .catch((error) => {
        // console.log(error.message);
        const errorMessage = error.message;
        dispatch(getTodosFailed(errorMessage));
      });
  };
};

//store
const store = createStore(todosReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchData());
