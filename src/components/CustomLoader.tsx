import { View, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "../utils/styles";

interface Props {
  showLoader: boolean;
}

const CustomLoader: React.FC<Props> = (props: Props) => {
  const { showLoader } = props;

  if (showLoader) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    );
  } else {
    return <></>;
  }
};

export default CustomLoader;
