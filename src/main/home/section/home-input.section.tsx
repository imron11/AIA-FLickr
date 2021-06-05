import React from "react";
import { 
  StyleSheet,
  View 
} from "react-native";
import { observer } from "mobx-react";
import HomeStore from "../home.store";
import { container } from "tsyringe";
import TextInputComponent from "../../../shared/component/input/text.input";
import IconButtonComponent from "../../../shared/component/button/icon.button";
import { scaledHorizontal, scaledVertical } from "../../../shared/helper/scale.helper";
import icons from "../../../asset/icons";
import colors from "../../../shared/theme/colors";

@observer
class HomeInputSection extends React.Component<any, any> {

  private _homeStore = container.resolve(HomeStore);

  state = {
    tags: ''
  }

  getListImage = async () => {
    await this._homeStore.getListImage();
  }

  onChangeSearch = (value) => {
    this._homeStore.tags = value;
  }

  render() {
    const valSearch = this._homeStore.tags;

    return (
      <View
        style={styles.inputContainer}
      >
        <TextInputComponent
          value={valSearch}
          color={colors.flickrBlue}
          autoCapitalize={'none'}
          placeholder={'Search image by tag ...'}
          onChangeText={(value) => {
            this.onChangeSearch(value);
          }}
          onSubmit={() => {
            this.getListImage();
          }}
          clearButton={valSearch.length > 0 ? true : false}
          onClearText={() => {
            this._homeStore.doRefresh();
          }}
          style={{ flex: 1 }}
        />

        <IconButtonComponent
          source={icons.ic_refresh}
          onPress={() => {
            this._homeStore.doRefresh();
          }}
          tintColor={colors.flickrPink}
          width={scaledVertical(40)}
          height={scaledVertical(40)}
          style={{ marginHorizontal: scaledHorizontal(28) }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default HomeInputSection;