import React from 'react';
import {
    StyleSheet,
    View,
    StyleProp,
    TextStyle,
    TextInput,
    KeyboardTypeOptions,
    TouchableOpacity,
    Image
} from 'react-native';
import icons from "../../../asset/icons/index";
import colors from '../../theme/colors';
import { scaledFontSize, scaledHorizontal, scaledVertical } from "../../helper/scale.helper";

interface Props {
    placeholder?: string;
    placeholderTextColor?: any;
    autoCapitalize?: 'none';
    style?: StyleProp<TextStyle>;
    color?: any;
    onChangeText?: (value) => void;
    clearButton?: boolean;
    onClearText?: () => void;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    leftColumn?: any;
    rightColumn?: any;
    value?: any
}

const TextInputComponent = (props: Props) => {
    return (
        <View
            style={[
                styles.textInputContainer,
                props.style,
                {
                    borderColor: props.color
                }
            ]}
        >
            {props.leftColumn &&
                props.leftColumn()
            }
            <TextInput
                value={props.value}
                secureTextEntry={props.secureTextEntry}
                style={{ flex: 1, color: colors.flickrBlue, fontSize: scaledFontSize(24) }}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : colors.placeholder}
                autoCapitalize={props.autoCapitalize}
                onChangeText={(value) => { props.onChangeText(value) }}
                keyboardType={props.keyboardType || 'default'}
            />
            {(props.clearButton) && (
                <TouchableOpacity
                    onPress={() => props.onClearText()}
                    style={{ height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image
                        source={icons.ic_clear}
                        resizeMode={'stretch'}
                        style={{
                            width: scaledVertical(32),
                            height: scaledVertical(32),
                            tintColor: colors.flickrPink
                        }}
                    />
                </TouchableOpacity>
            )}

            {props.rightColumn &&
                props.rightColumn()
            }
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: scaledHorizontal(15),
        height: scaledVertical(72),
        borderWidth: 1
    }
});

export default TextInputComponent;