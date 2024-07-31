import { Image, StyleSheet, Button, View } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {  
  const [data, setData] = useState<DictionaryEntry>({name: "", definition: ""});

  function handleWod() {
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
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">The Word of the Day!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.wordOfTheDay}>Word Of The Day</ThemedText>
      </ThemedView>
      <View>
        <Button 
          title='WOD'
          onPress={handleWod}
        />
      </View>
      {data ? <ThemedText>{data.word}</ThemedText> : <ThemedText>Loading...</ThemedText>}
      {data ? <ThemedText>{data.definition}</ThemedText> : <ThemedText>Loading...</ThemedText>}
    </ParallaxScrollView>
  );
}

interface DictionaryEntry {
  word: string;
  definition: string;
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
