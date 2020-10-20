import {all} from 'redux-saga/effects'
import {authWatcher} from "./sagas/auth.sagas";
import {alertWatcher} from "./sagas/alert.sagas";
import {categoriesWatcher} from "./sagas/category.sagas";
import {productsWatcher} from "./sagas/product.sagas";

export function* allSagas() {
    yield all([authWatcher(), alertWatcher(), categoriesWatcher(), productsWatcher()])
}
