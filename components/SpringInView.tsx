import { StyleSheet, ViewProps, View } from 'react-native';

import Animated, {useAnimatedStyle, useSharedValue, withSpring, withDelay} from "react-native-reanimated";

import { ThemedText } from '@/components/ThemedText';

 /* 
 * This component manages two critical text fields inside of a shared parent view: the word and its definition. 
 * The component displays them to users using a 'spring-in' effect.
 */
export type SpringInViewProps = {isClicked: boolean, text: {word: string, definition: string}} & ViewProps;

export function SpringInView(props: SpringInViewProps) {
    const wordSv = useSharedValue(-100);
    const definitionSv = useSharedValue(-250);
    const DELAY = 500;


    if (props.isClicked) {
      wordSv.value = withDelay((DELAY * 1), withSpring(wordSv.value + 200));
      definitionSv.value = withDelay((DELAY * 2), withSpring(definitionSv.value + 350));
    }

    return (
        <View style={styles.container}>
            <Animated.View style={{marginLeft: wordSv, backgroundColor: 'red'}}>
                <ThemedText>{props.text.word}</ThemedText>
            </Animated.View>
            <Animated.View style={{marginLeft: definitionSv, backgroundColor: 'green', width: 250}}>
                <ThemedText>{props.text.definition}</ThemedText>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    animatedViewStyle : {
        backgroundColor: 'red'
    },
    container: {
        backgroundColor: 'yellow', 
        width: 400,
        height: 300,
        alignSelf: 'center',
        flexDirection: 'column',
    }
});