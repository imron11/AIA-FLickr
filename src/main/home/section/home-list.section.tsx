import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View
} from "react-native";
import { observer } from "mobx-react";
import HomeStore from "../home.store";
import { container } from "tsyringe";
import { scaledHorizontal, scaledVertical } from "../../../shared/helper/scale.helper";
import colors from "../../../shared/theme/colors";
import _ from "lodash";

@observer
class HomeListSection extends React.Component<any, any> {

  private _homeStore = container.resolve(HomeStore);

  state = {
    imageWidth: 0
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
      <>
        <FlatList
          data={dataImages}
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
      </>
    )
  }

}

const styles = StyleSheet.create({
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

export default HomeListSection;