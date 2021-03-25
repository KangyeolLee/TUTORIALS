import { createAction, ActionType, createReducer } from 'typesafe-actions';

// const INCREASE = 'counter/INCREASE';
// const DECREASE = 'counter/DECREASE';
// const INCREASE_BY = 'counter/INCREASE_BY';

// export const increase = () => ({
//   type: INCREASE,
// });
export const increase = createAction('counter/INCREASE')();
// export const decrease = () => ({
//   type: DECREASE,
// });
export const decrease = createAction('counter/DECREASE')();
// export const increaseBy = (diff: number) => ({
//   type: INCREASE_BY,
//   payload: diff,
// });
export const increaseBy = createAction(
  'counter/INCREASE_BY',
  (diff: number) => ({
    diff,
  })
)();

// type CounterAction =
//   | ReturnType<typeof increase>
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>;
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

// function counter(
//   state: CounterState = initialState,
//   action: CounterAction
// ): CounterState {
//   switch (action.type) {
//     case INCREASE:
//       return { count: state.count + 1 };
//     case DECREASE:
//       return { count: state.count - 1 };
//     case INCREASE_BY:
//       return { count: state.count + action.payload };
//     default:
//       return state;
//   }
// }

// const counter = createReducer<CounterState, CounterAction>(initialState, {
//   [INCREASE]: (state) => ({ count: state.count + 1 }),
//   [DECREASE]: (state) => ({ count: state.count - 1 }),
//   [INCREASE_BY]: (state, action) => ({
//     count: state.count + action.payload.diff,
//   }),
// });

const counter = createReducer<CounterState, CounterAction>(initialState)
  .handleAction(increase, (state) => ({ count: state.count + 1 }))
  .handleAction(decrease, (state) => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload.diff,
  }));

export default counter;
