import React from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Text
} from "react-native";
import Modal from "react-native-modal";
import icons from "../../../asset/icons";
import { scaledFontSize, scaledHorizontal, scaledVertical } from "../../helper/scale.helper";
import colors from "../../theme/colors";
import IconButtonComponent from "../button/icon.button";

interface ModalProps {
  coverScreen?: boolean;
  isOpen?: boolean;
  onClosed?: any;
  onOpened?: any;
  children?: any;
  footerRef?: any;
  showHeader?: boolean;
  showBackButton?: boolean;
  headerTitle?: string;
  subtitle?: string
  rightColumn?: any;
  style?: any;
  footerRadius?: boolean;
  title?: string;
}

const BottomSlideModal = (props: ModalProps) => {

  const onClosed = () => {
    props.onClosed();
  }

  return (
    <Modal
      isVisible={props.isOpen}
      // onBackdropPress={onClosed}
      onBackButtonPress={onClosed}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={800}
      animationOutTiming={800}
      backdropColor={colors.flickrBlue}
      backdropOpacity={1}
      style={{
        margin: 0,
        justifyContent: "flex-end"
      }}
    >
        <View
          style={[
            styles.modalContainer,
            {
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }]
          }
        >
          <View
            style={
              styles.titleContainer
            }
          >
            <IconButtonComponent
              source={icons.ic_back}
              onPress={() => {
                onClosed();
              }}
              width={scaledVertical(32)}
              height={scaledVertical(32)}
              tintColor={colors.flickrBlue}
              style={{ marginRight: scaledHorizontal(15) }}
            />

            <Text
            style={styles.titleText}
            >
              {props.title}
            </Text>
          </View>
          {props.children}
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.primary,
    height: Dimensions.get("screen").height * 0.9
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaledVertical(28),
    paddingHorizontal: scaledHorizontal(20),
  },
  titleText: {
    color: colors.flickrPink,
    fontWeight: "700",
    fontSize: scaledFontSize(36)
  }
});

export default BottomSlideModal;