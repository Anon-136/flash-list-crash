import { StyleSheet, Text, View, ViewProps } from "react-native";

import { FlashList, FlashListRef } from "@shopify/flash-list";
import React from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 500;
export default function HomeScreen() {
  const animatedRef = useAnimatedRef<FlashListRef<any>>();
  const safeAreaInsets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      "worklet";
      const y = event.contentOffset.y;
      scrollY.value = y;
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -scrollY.value }],
    };
  });
  return (
    <View style={{ paddingTop: safeAreaInsets.top, flex: 1 }}>
      <Animated.View
        style={[styles.header, animatedStyle, { top: safeAreaInsets.top }]}
      >
        <Text>This is header</Text>
      </Animated.View>
      <AnimatedFlashList
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        ref={animatedRef}
        onScroll={scrollHandler}
        data={Array.from({ length: 100 }, (_, i) => i)}
        renderItem={({ item }) => <CardSkeleton />}
      />
    </View>
  );
}

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export const CardSkeleton = (props: ViewProps) => {
  return (
    <View style={styles.cardContainer} {...props}>
      <View style={styles.cardHeader}>
        <View style={styles.cardAvatar} />
        <View style={styles.cardTitleContainer}>
          <View style={styles.cardTitle} />
          <View style={styles.cardSubtitle} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: "lightblue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 16,
  },
  cardHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
    marginRight: 12,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitleContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 4,
    gap: 8,
  },
  cardTitle: {
    width: 160,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
  cardSubtitle: {
    width: 100,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
});
