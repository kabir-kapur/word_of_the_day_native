import { StyleSheet, ViewProps, View } from 'react-native';

import Animated, {useAnimatedStyle, useSharedValue, withSpring, withDelay} from "react-native-reanimated";

import { ThemedText } from '@/components/ThemedText';

// TODO: implement springInDelay such that it springs in n milliseconds after the prior 
// component does
export type SpringInViewProps = {isClicked: boolean, text: {word: string, definition: string}} & ViewProps;

export function SpringInView(props: SpringInViewProps) {
    const wordSv = useSharedValue(-100);
    const definitionSv = useSharedValue(-100);
    const DELAY = 500;


    if (props.isClicked) {
      wordSv.value = withDelay((DELAY * 1), withSpring(wordSv.value + 200));
      definitionSv.value = withDelay((DELAY * 2), withSpring(definitionSv.value + 200));
    }

    return (
        <View>
            <Animated.View style={{marginLeft: wordSv, backgroundColor: 'red'}}>
                <ThemedText>{props.text.word}</ThemedText>
            </Animated.View> 
            <Animated.View style={{marginLeft: definitionSv, backgroundColor: 'yellow'}}>
                <ThemedText>{props.text.definition}</ThemedText>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    animatedViewStyle : {
        backgroundColor: 'red'
    }
});