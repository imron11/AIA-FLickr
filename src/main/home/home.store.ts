import { observable } from "mobx";
import {singleton} from "tsyringe";

@singleton()
class HomeStore {
  @observable isLoading: boolean = false;
  @observable namePage: string = "Home Page";
}

export default HomeStore;