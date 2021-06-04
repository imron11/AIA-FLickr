import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { observer } from "mobx-react";
import { container } from 'tsyringe';
import HomeStore from './home.store';
import colors from '../../shared/theme/colors';
import LogoComponent from '../../shared/component/logo';
import images from '../../asset/images';
import icons from '../../asset/icons';
import IconButtonComponent from '../../shared/component/button/icon.button';
import { scaledHorizontal, scaledVertical } from "../../shared/helper/scale.helper";
import HomeInputSection from './section/home-input.section';
import _ from "lodash";

@observer
class HomeComponent extends React.Component<any, any> {

  private _homeStore = container.resolve(HomeStore);

  state = {
    imageWidth: 0
  }

  async componentDidMount() {
    this._homeStore.tags = "";
    await this._homeStore.getListImage();
  }

  renderCard = ({ index, item }) => {

    const actualWidth = _.get(item, 'width');
    const actualHeight = _.get(item, 'height');

    if (this._homeStore.isLoading) {
      return (
        <ActivityIndicator
          size={'small'}
          color={colors.flickrPink}
        />
      );
    }

    return (
      <View
        key={index}
        style={styles.imageContainer}
        onLayout={(e) => {
          const { width } = e.nativeEvent.layout;
          this.setState({
            imageWidth: width
          })
        }}
      >
        <Image
          source={{ uri: _.get(item, 'url') }}
          resizeMode={'cover'}
          style={{
            width: "100%",
            height: actualWidth * (this.state.imageWidth / actualHeight)
          }}
        />
      </View>
    );
  }

  render() {
    const dataImages = this._homeStore.dataImages;

    return (
      <SafeAreaView style={styles.mainContainer}>
        <View
          style={styles.headerContainer}
        >
          <LogoComponent
            source={images.img_logo_flickr}
          />

          <IconButtonComponent
            source={icons.ic_setting}
            onPress={() => {

            }}
          />
        </View>

        <View
          style={styles.contentContainer}
        >
          <HomeInputSection />

          <View style={{ flex: 1, width: '100%', paddingTop: scaledVertical(20) }}>
            {this._homeStore.isLoading ?
              <ActivityIndicator
                size={'large'}
                color={colors.flickrPink}
                style={{
                  marginTop: scaledVertical(100)
                }}
              />
              :
              <FlatList
                data={dataImages}
                onRefresh={() => { this._homeStore.doRefresh()}}
                refreshing={this._homeStore.isLoading}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderCard}
                numColumns={2}
                contentContainerStyle={{
                  
                  paddingTop: scaledVertical(20),
                  paddingBottom: scaledVertical(50)
                }}
              />
            }
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.flickrBlue
  },
  headerContainer: {
    height: Dimensions.get("screen").height * 0.13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scaledVertical(30)
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: scaledVertical(30)
  },

  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: "center",
    alignItems: "center",
    marginVertical: scaledVertical(10),
    flex: 1 / 2,
    marginHorizontal: scaledHorizontal(10),
    backgroundColor: 'white',
  }
});

export default HomeComponent;
