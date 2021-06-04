import React from "react";
import {
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import Modal from "react-native-modal";
import { scaledHorizontal, scaledVertical } from "../../helper/scale.helper";
import colors from "../../theme/colors";

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
}

const BottomSlideModal = (props: ModalProps) => {

  const onClosed = () => {
    props.onClosed();
  }

  return (
    <>
      <Modal
        isVisible={props.isOpen}
        onBackdropPress={onClosed}
        onBackButtonPress={onClosed}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={800}
        animationOutTiming={800}
        backdropColor={'transparent'}
        style={{
          margin: 0,
          justifyContent: "flex-end"
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: Dimensions.get('screen').height * 0.8,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25
          }}
        >
          {props.children}
        </View>
      </Modal>
    </>
  );
}

export default BottomSlideModal;