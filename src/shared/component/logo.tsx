import React from "react";
import { Image } from "react-native";
import { scaledHorizontal, scaledVertical } from "../helper/scale.helper";

interface logoProps {
    source: any;
    width?: number;
    height?: number,
    tintColor?: any;
}

const LogoComponent = (props: logoProps) => {
    return (
        <Image
            source={props.source}
            resizeMode={'stretch'}
            style={{
                width: props.width ? props.width : scaledHorizontal(120),
                height: props.height ? props.height : scaledVertical(60),
                tintColor: props.tintColor ? props.tintColor : "white"
            }}
        />
    );
}

export default LogoComponent;