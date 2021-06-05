import React, { useState } from "react";
import {
    StyleSheet,
    View
} from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import _ from "lodash";
import { scaledHorizontal, scaledVertical } from "../../helper/scale.helper";
import IconButtonComponent from "../button/icon.button";
import icons from "../../../asset/icons";
import colors from "../../theme/colors";

interface ImageCardProps {
    item: any;
    isShowLove?: boolean;
    onPressWeb?: (link) => void;
    onPressLove?: (item) => void;
    onPressDelete?: (id) => void;
}

const ImageCardComponent = (props: ImageCardProps) => {

    const [imageWidth, setImageWidth] = useState(0);

    return (
        <View
            key={_.get(props.item, "link")}
            style={styles.imageContainer}
            onLayout={(e) => {
                const { width } = e.nativeEvent.layout;
                setImageWidth(width);
            }}
        >
            <AutoHeightImage
                source={{ uri: _.get(props.item, 'url') }}
                width={imageWidth}
                animated
                resizeMode={"cover"}
            />

            <View style={styles.iconButtonContainer}>

                {props.onPressWeb &&

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
                                props.onPressWeb(_.get(props.item, 'link'));
                            }}
                            width={scaledVertical(24)}
                            height={scaledVertical(24)}
                        />
                    </View>
                }

                {props.isShowLove &&
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
                                props.onPressLove(props.item)
                            }}
                            width={scaledVertical(24)}
                            height={scaledVertical(24)}
                        />
                    </View>
                }

                {props.onPressDelete &&
                    <IconButtonComponent
                        source={icons.ic_clear}
                        onPress={() => {
                            props.onPressDelete(_.get(props.item, 'id'));
                        }}
                        tintColor={"red"}
                    />
                }
            </View>
        </View>
    );
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

export default ImageCardComponent;