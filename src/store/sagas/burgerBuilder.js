import axios from '../../api/axios-order';
import { put } from 'redux-saga/effects';
import * as actions from '../actions';

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(
      'https://burguer-builder-94096.firebaseio.com/ingredients.json'
    );
    yield put(actions.setIngredients(response.data));
  } catch (err) {
    yield put(actions.fetchIngredientsFailed());
  }
}
