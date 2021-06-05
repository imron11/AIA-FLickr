import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
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
import HomeListSection from './section/home-list.section';
import HomeDownloadSection from './section/home-download.section';
import { getAllSavedImage } from "../../database/flickr-image.database";
import HomeWebviewSection from './section/home-webview.section';
@observer
class HomeComponent extends React.Component<any, any> {

  private _homeStore = container.resolve(HomeStore);

  async componentDidMount() {
    this._homeStore.tags = "";
    this._homeStore.dataSavedImages = await getAllSavedImage();
    await this._homeStore.getListImage();
  }

  showDownloadImage = async () => {
    const images = await getAllSavedImage();
    this._homeStore.dataSavedImages = images;
    this._homeStore.isDownloadShown = true;
  }

  render() {
    const dataSavedImages = this._homeStore.dataSavedImages;
    const imageLength = dataSavedImages.length;
    return (
      <>
        <SafeAreaView style={styles.mainContainer}>
          <StatusBar backgroundColor={colors.flickrBlue} barStyle={'light-content'} />
          <View
            style={styles.headerContainer}
          >
            <LogoComponent
              source={images.img_logo_flickr}
            />

            <View
              style={styles.headerButtonContainer}
            >
              <IconButtonComponent
                source={icons.ic_download}
                onPress={() => {
                  this.showDownloadImage();
                }}
                width={scaledVertical(44)}
                height={scaledVertical(44)}
                style={{ marginHorizontal: scaledHorizontal(10) }}
                badgeLength={imageLength}
              />
            </View>
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
                <HomeListSection />
              }
            </View>
          </View>
        </SafeAreaView>

        <HomeDownloadSection />
        <HomeWebviewSection />

        <SafeAreaView style={{ flex: 0, backgroundColor: colors.primary }} />
      </>
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
    paddingTop: scaledVertical(30),
    paddingHorizontal: scaledHorizontal(30)
  },
  headerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default HomeComponent;
