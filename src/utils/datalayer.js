// dataLayer.js
import { db } from "./index.js";
import * as firebaseMethods from "../firebase/index.js";
import * as apiMethods from "../api/index.js";

const useFirebase = !!db;

export const addItem = useFirebase
  ? firebaseMethods.addItemFirebase
  : apiMethods.addItem;
export const removeItem = useFirebase
  ? firebaseMethods.removeItemFirebase
  : apiMethods.removeItem;
export const getItems = useFirebase
  ? firebaseMethods.getItemsFirebase
  : apiMethods.getItems;
export const updateItem = useFirebase
  ? firebaseMethods.updateItemFirebase
  : apiMethods.updateItem;
