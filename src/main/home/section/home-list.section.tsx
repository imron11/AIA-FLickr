import React from "react";
import {
  Alert,
  Platform,
  ToastAndroid
} from "react-native";
import { observer } from "mobx-react";
import HomeStore from "../home.store";
import { container } from "tsyringe";
import { scaledVertical } from "../../../shared/helper/scale.helper";
import _ from "lodash";
import MasonryList from '@react-native-seoul/masonry-list';
import ImageCardComponent from "../../../shared/component/card/image.card";
import { addImage, getAllSavedImage } from "../../../database/flickr-image.database";
import NotFoundSection from "../../../shared/component/section/not-found.section";

@observer
class HomeListSection extends React.Component<any, any> {

  private _homeStore = container.resolve(HomeStore);

  state = {
    imageWidth: 0,
    isModalVisible: false,
    selectedUrl: '',
  }

  addImage = async (item) => {
    await addImage(
      _.get(item, 'url'),
      _.get(item, 'title'),
      _.get(item, 'link')
    );

    if (Platform.OS === "android") {
      ToastAndroid.show("Image Loved", ToastAndroid.SHORT);
    } else {
      Alert.alert("Hei!", "Image Loved");
    }

    const images = await getAllSavedImage();
    this._homeStore.dataSavedImages = images;
  }

  renderCard = ({ item }) => {
    const isShowLove = _.find(this._homeStore.dataSavedImages, ['link', _.get(item, 'link')]);;

    return (
      <ImageCardComponent
        key={_.get(item, 'link')}
        item={item}
        onPressWeb={(link) => {
          this._homeStore.selectedLink = link;
          this._homeStore.isWebViewShown = true;
        }}
        isShowLove={!isShowLove}
        onPressLove={(selectedItem) => {
          this.addImage(selectedItem);
        }}
      />
    );
  }

  render() {
    const dataImages = this._homeStore.dataImages;
    const dataSavedImages = this._homeStore.dataSavedImages;

    return (
      <>
        {dataImages.length === 0 ?
          <NotFoundSection
            title={'Data Image not Found'}
            description={'no image loaded on this deviceplease check\nyour connection\n:('}
          />
          :
          <MasonryList
            data={dataImages.slice()}
            extraData={dataSavedImages.slice()}
            onRefresh={() => { this._homeStore.doRefresh() }}
            refreshing={this._homeStore.isLoading}
            keyExtractor={item => item.id}
            renderItem={this.renderCard}
            numColumns={2}
            contentContainerStyle={{
              paddingTop: scaledVertical(20),
              paddingBottom: scaledVertical(50)
            }}
          />
        }
      </>
    )
  }

}

export default HomeListSection;