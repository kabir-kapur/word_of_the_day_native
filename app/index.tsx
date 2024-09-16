import { Image, StyleSheet, Button, View, ViewStyle, Pressable, Text } from 'react-native';
import React, { useState, PropsWithChildren } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { DictionaryEntry } from '@/model/DictionaryEntry';
import { processColorsInProps } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

import { FadeInView } from '@/components/FadeInView';
import { SpringInView } from '@/components/SpringInView';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

export default function HomeScreen() {
  const [data, setData] = useState<DictionaryEntry>({name: "", definition: ""});

  function handleWod() {
    // TODO: refactor this to @/handle folder later
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/words'); // performed synchronously -- blocking
    /* 
      fetching time right after completing synch request above should be accurate, 
      ONLY because the request is synchronous 
    */
    const completeRequestTime = new Date();
    console.log("completeRequestTime: " + completeRequestTime);
    xhr.onload = function() {
      if(xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText));
        setData(JSON.parse(xhr.responseText));
      } else {
        const error_msg = "Unable to receive valid WOD response."; 
        console.log(error_msg);
        setData({"error_msg": error_msg}); // figure out typing here
      }
    }
    xhr.send();
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <HelloWave />
        <ThemedText type="title">gm to you pookie </ThemedText>
      </View>
      <SpringInView style={{justifyContent:"center", alignItems: "center"}}>
        <Text>
          the mothefuckign text
        </Text>
      </SpringInView>
      <View
        style={styles.wodContainer}>
        { (data.word !== "" && data.definition !== "") ? 
        <View> 
          <FadeInView
            // TODO: implement individual fade-in for WOD and definition
            // link: https://trello.com/c/6j6Sam1O
            style={styles.wodInternalTextContainerView}
          >
            <ThemedText>{data.word}</ThemedText>
          </FadeInView>
          <FadeInView
            // TODO: implement individual fade-in for WOD and definition
            // link: https://trello.com/c/6j6Sam1O
            style={styles.wodInternalTextContainerView}
          >
            <ThemedText>{data.definition}</ThemedText>
          </FadeInView>
        </View> : <View/>
        }
      </View>
      <View style={styles.wodPressableContainer}>
        <Pressable style={styles.wodPressable} onPress={handleWod}>
          <Text style={styles.wodButtonText}>WOD</Text>
        </Pressable> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    paddingTop: 70,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    flex: 1
  },
  wodContainer: {
    flex: 3, // Takes up most of the space in the center
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, // Adds spacing from top and bottom components
  },
  wodInternalTextContainerView: {
    width: 250,
    height: 100,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  wodPressableContainer: {
    paddingBottom: 0,
    justifyContent: 'flex-end',
    flex: 1
  },
  wodPressable: {
    alignItems: 'center', // aligns along cross-axis (default flex axis)
    justifyContent: 'center', // justifies along long axis
    borderRadius: 20,
    borderWidth: 3.5,
    height: 70,
  },
  wodButtonText: {
    fontSize: 22,
    // lineHeight: 5,
    fontWeight: 'ultralight',
    letterSpacing: 25,
    color: 'black',
  },
});
