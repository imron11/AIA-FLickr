import { observable, action } from "mobx";
import { Image } from "react-native";
import { singleton } from "tsyringe";
import { container } from "tsyringe";
import HomeRestService from "../../service/rest/home-rest.service";
import _ from "lodash";

@singleton()
class HomeStore {

  private _homeRestService = container.resolve(HomeRestService);

  @observable isLoading: boolean = false;
  @observable tags: string = "";
  @observable dataImages: any = [];

  @observable isWebViewShown: boolean = false;
  @observable selectedLink: string = '';

  @observable isDownloadShown: boolean = false;
  @observable dataSavedImages: any = [];

  @action getListImage = () => {

    this.dataImages = [];
    this.isLoading = true;

    return this._homeRestService.getListImage(this.tags)
      .subscribe(async (response) => {
        await this.prepareImage(_.get(response, 'items'));
      });
  }

  @action prepareImage = (response) => {
    for (let i = 0; i < response.length; i++) {
      Image.getSize(_.get(response[i], 'media.m'), (width, height) => {
        this.dataImages.push({
          id: `image${i+1}`,
          url: _.get(response[i], 'media.m'),
          width,
          height,
          title: _.get(response[i], 'title'),
          link: _.get(response[i], 'link')
        });
      });
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  @action doRefresh = () => {
    this.tags = "";
    this.getListImage();
  }
}

export default HomeStore;