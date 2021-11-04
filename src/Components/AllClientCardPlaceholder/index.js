import React from "react";
import { View } from "react-native";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import { Circle, Rect } from "react-native-svg";

const AllClientCardPlaceholder = () => {
  return (
    <View>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={200}
      >
        <Circle cx="40" cy="40" r="40" />
        <Rect x="100" y="17" rx="4" ry="4" width="350" height="13" />
        <Rect x="100" y="40" rx="3" ry="3" width="250" height="30" />
        <Rect x="0" y="100" rx="3" ry="3" width="350" height="50" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={200}
      >
        <Circle cx="40" cy="40" r="40" />
        <Rect x="100" y="17" rx="4" ry="4" width="350" height="13" />
        <Rect x="100" y="40" rx="3" ry="3" width="250" height="30" />
        <Rect x="0" y="100" rx="3" ry="3" width="350" height="50" />
      </SvgAnimatedLinearGradient>
    </View>
  );
};

export default AllClientCardPlaceholder;