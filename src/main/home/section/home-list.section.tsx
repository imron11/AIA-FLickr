import React from "react";
import {
  StyleSheet,
} from "react-native";
import { observer } from "mobx-react";
import HomeStore from "../home.store";
import { container } from "tsyringe";
import { scaledVertical } from "../../../shared/helper/scale.helper";
import _ from "lodash";
import BottomSlideModal from "../../../shared/component/modal/bottom-slide.modal";
import { WebView } from 'react-native-webview';
import MasonryList from '@react-native-seoul/masonry-list';
import ImageCardComponent from "../../../shared/component/card/image.card";

@observer
class HomeListSection extends React.Component<any, any> {

  private _homeStore = container.resolve(HomeStore);

  state = {
    imageWidth: 0,
    isModalVisible: false,
    selectedUrl: '',
  }

  renderCard = ({ item }) => {
    return (
      <ImageCardComponent 
        item={item}
        onPressWeb={(link) => {
          this.setState({
            isModalVisible: true,
            selectedUrl: link
          })
        }}
        onPressLove={(selectedItem) => {
          console.log(selectedItem);
        }}
      />
    );
  }

  render() {
    const dataImages = this._homeStore.dataImages;
    return (
      <>
        <MasonryList
          data={dataImages.slice()}
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

        <BottomSlideModal
          isOpen={this.state.isModalVisible}
          onClosed={() => {
            this.setState({
              isModalVisible: false,
              selectedUrl: ''
            });
          }}
          title={"Detail Image"}
        >
          <WebView source={{ uri: this.state.selectedUrl }} />
        </BottomSlideModal>
      </>
    )
  }

}

const styles = StyleSheet.create({
  
});

export default HomeListSection;