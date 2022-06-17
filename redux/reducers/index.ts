import { combineReducers } from "redux";
import userProfile from "./userProfile";
import userRepo from "./userRepo";
import usersReducer from "./usersReducer";
import searchList from "./searchList";


const rootReducers = combineReducers({
  usersList: usersReducer,
  userProfile: userProfile,
  userRepo: userRepo,
  searchList: searchList,
});

export default rootReducers;
