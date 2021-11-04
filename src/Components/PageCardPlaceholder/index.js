import React from "react";
import { View } from "react-native";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import { Circle, Rect } from "react-native-svg";

const PageCardPlaceholder = () => {
    return (
        <View>
            <SvgAnimatedLinearGradient
                primaryColor="#eee"
                secondaryColor="#BEBEBE"
                height={100}
            >
                <Rect x="10" y="5" rx="4" ry="4" width="70" height="70" />
                <Rect x="100" y="15" rx="4" ry="4" width="350" height="13" />
                <Rect x="100" y="35" rx="4" ry="4" width="350" height="30" />
            </SvgAnimatedLinearGradient>
            <SvgAnimatedLinearGradient
                primaryColor="#eee"
                secondaryColor="#BEBEBE"
                height={100}
            >
                <Rect x="10" y="5" rx="4" ry="4" width="70" height="70" />
                <Rect x="100" y="15" rx="4" ry="4" width="350" height="13" />
                <Rect x="100" y="35" rx="4" ry="4" width="350" height="30" />
            </SvgAnimatedLinearGradient>
            <SvgAnimatedLinearGradient
                primaryColor="#eee"
                secondaryColor="#BEBEBE"
                height={100}
            >
                <Rect x="10" y="5" rx="4" ry="4" width="70" height="70" />
                <Rect x="100" y="15" rx="4" ry="4" width="350" height="13" />
                <Rect x="100" y="35" rx="4" ry="4" width="350" height="30" />
            </SvgAnimatedLinearGradient>
        </View>
    );
};

export default PageCardPlaceholder;