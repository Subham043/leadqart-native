import React from "react";
import { View } from "react-native";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import { Circle, Rect } from "react-native-svg";

const GroupSelectionPlaceholder = () => {
  return (
    <View>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={50}
      >
        <Rect x="10" y="20" rx="3" ry="3" width="350" height="50" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={50}
      >
        <Rect x="10" y="20" rx="3" ry="3" width="350" height="50" />
      </SvgAnimatedLinearGradient>
      <SvgAnimatedLinearGradient
        primaryColor="#eee"
        secondaryColor="#BEBEBE"
        height={50}
      >
        <Rect x="10" y="20" rx="3" ry="3" width="350" height="50" />
      </SvgAnimatedLinearGradient>
    </View>
  );
};

export default GroupSelectionPlaceholder;