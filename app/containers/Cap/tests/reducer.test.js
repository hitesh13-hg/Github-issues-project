import { fromJS } from 'immutable';
import capReducer from '../reducer';

describe('capReducer', () => {
  it('returns the initial state', () => {
    expect(capReducer(undefined, {})).toEqual(fromJS({}));
  });
});
