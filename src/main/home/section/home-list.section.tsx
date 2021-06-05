import React from "react";
import {
  Animated,
  StyleSheet,
  View
} from "react-native";
import { observer } from "mobx-react";
import HomeStore from "../home.store";
import { container } from "tsyringe";
import { scaledHorizontal, scaledVertical } from "../../../shared/helper/scale.helper";
import colors from "../../../shared/theme/colors";
import _ from "lodash";
import IconButtonComponent from "../../../shared/component/button/icon.button";
import icons from "../../../asset/icons";
import BottomSlideModal from "../../../shared/component/modal/bottom-slide.modal";
import { WebView } from 'react-native-webview';
import MasonryList from '@react-native-seoul/masonry-list';
import AutoHeightImage from 'react-native-auto-height-image';

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
      <View
        key={item.link}
        style={styles.imageContainer}
        onLayout={(e) => {
          const { width } = e.nativeEvent.layout;
          this.setState({
            imageWidth: width
          })
        }}
      >
        <AutoHeightImage
          source={{ uri: _.get(item, 'url') }}
          width={this.state.imageWidth}
          animated
          resizeMode={"cover"}
        />

        <View style={styles.iconButtonContainer}>

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.flickrBlue,
                marginRight: scaledHorizontal(10)
              }
            ]}
          >
            <IconButtonComponent
              source={icons.ic_web}
              onPress={() => {
                this.setState({
                  isModalVisible: true,
                  selectedUrl: _.get(item, 'link')
                });
              }}
              width={scaledVertical(24)}
              height={scaledVertical(24)}
            />
          </View>

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.border
              }
            ]}
          >
            <IconButtonComponent
              source={icons.ic_love}
              onPress={() => {

              }}
              width={scaledVertical(24)}
              height={scaledVertical(24)}
            />
          </View>

        </View>
      </View>
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
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: scaledVertical(10),
    marginHorizontal: scaledHorizontal(10),
    backgroundColor: 'white',
  },
  iconButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: scaledVertical(15),
    right: scaledHorizontal(15),
  },
  iconContainer: {
    padding: scaledVertical(15),
    borderRadius: 35,
  }
});

export default HomeListSection;