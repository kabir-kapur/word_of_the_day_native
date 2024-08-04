import { Image, StyleSheet, Button, View, ViewStyle, Animated } from 'react-native';
import React, { useState, PropsWithChildren } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { DictionaryEntry } from '@/model/DictionaryEntry';
import { processColorsInProps } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

import { FadeInView } from '@/components/FadeInView';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

export default function HomeScreen() {  
  const [data, setData] = useState<DictionaryEntry>({name: "", definition: ""});

  function handleWod() {
    // TODO: refactor this to @/handle folder later 
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/words');
    xhr.onload = function() {
      if(xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText));
        setData(JSON.parse(xhr.responseText));
      }
    }
    xhr.send();
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#03694a', dark: '#01261b' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <HelloWave />
        <ThemedText type="title">The Word of the Day!</ThemedText>
      </ThemedView>
      <View>
        <Button 
          title='WOD'
          onPress={handleWod}
          color="#220126"
        />
      </View>
      <View>
        { (data.word !== "" && data.definition !== "") ? <FadeInView
          style={{
            width: 250,
            height: 100,
            backgroundColor: 'powderblue',
          }}>
          <ThemedText>{data.word}</ThemedText>
          <ThemedText>{data.definition}</ThemedText>
        </FadeInView> : <View/>
        }
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  wordOfTheDay: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    textAlign: 'center',
  }
});
