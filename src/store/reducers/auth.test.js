import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    };
  });

  it('should return the initial state', () => {
    // is the case when the state is just getting set up at the beggining of our
    // app and the action is just an empty object
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon login', () => {
    const newState = {
      ...initialState,
      token: 'some-id-token',
      userId: 'some-user-id'
    };
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'some-id-token',
        userId: 'some-user-id'
      })
    ).toEqual(newState);
  });
});
