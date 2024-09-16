import { StyleSheet, ViewProps, View } from 'react-native';

import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";

import { ThemedText } from '@/components/ThemedText';

export type SpringInViewProps = ViewProps;

export function SpringInView(props: SpringInViewProps) {
    const sv = useSharedValue(0);

    sv.value = withSpring(sv.value + 100);

    const springAnimatedStyle = useAnimatedStyle(() => ({

    }));

    return (
        <Animated.View style={{marginLeft: sv, ...styles.text}}>
            <ThemedText>Balls</ThemedText>
        </Animated.View>
        // <Animated.View style={springAnimatedStyle}/>
    )
}

const styles = StyleSheet.create({
    text: {
    },
  });