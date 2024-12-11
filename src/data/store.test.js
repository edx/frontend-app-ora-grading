import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createLogger } from 'redux-logger';

import rootReducer, { actions, selectors } from 'data/redux';

import exportedStore, { createStore } from './store';

jest.mock('data/redux', () => ({
  __esModule: true,
  default: 'REDUCER',
  actions: 'ACTIONS',
  selectors: 'SELECTORS',
}));

jest.mock('redux-logger', () => ({
  createLogger: () => 'logger',
}));
jest.mock('redux-thunk', () => 'thunkMiddleware');
jest.mock('redux', () => ({
  applyMiddleware: (...middleware) => ({ applied: middleware }),
  createStore: (reducer, middleware) => ({ reducer, middleware }),
}));
jest.mock('@redux-devtools/extension', () => ({
  composeWithDevTools: (middleware) => ({ withDevTools: middleware }),
}));

describe('store aggregator module', () => {
  describe('exported store', () => {
    it('is generated by createStore', () => {
      expect(exportedStore).toEqual(createStore());
    });
    it('creates store with connected reducers', () => {
      expect(createStore().reducer).toEqual(rootReducer);
    });
    describe('middleware', () => {
      it('exports thunk and logger middleware, composed and applied with dev tools', () => {
        expect(createStore().middleware).toEqual(
          composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger())),
        );
      });
    });
  });
  describe('dev exposed tools', () => {
    beforeEach(() => {
      window.store = undefined;
      window.actions = undefined;
      window.selectors = undefined;
    });
    it('exposes redux tools if in development env', () => {
      process.env.NODE_ENV = 'development';
      const store = createStore();
      expect(window.store).toEqual(store);
      expect(window.actions).toEqual(actions);
      expect(window.selectors).toEqual(selectors);
    });
    it('does not expose redux tools if in production env', () => {
      process.env.NODE_ENV = 'production';
      createStore();
      expect(window.store).toEqual(undefined);
      expect(window.actions).toEqual(undefined);
      expect(window.selectors).toEqual(undefined);
    });
  });
});
