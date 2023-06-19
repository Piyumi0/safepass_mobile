import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity,Vibration  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';
import animalinfo from './screen/data/AnimalInfo';
import GuideLine from './screen/Notification';
import { Audio } from 'expo-av';
// import Sound from 'react-native-sound';
//app.js

// import Sound from 'react-native-sound';
// import { Platform } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [selectedAnimal, setSelectedProduct] = useState(null);

  // const audioPath = Platform.select({
  //   ios: './assets/alert/audio1.mp3', // Path relative to the Xcode project
  //   android: './assets/alert/audio1.mp3', // Path relative to the Android project
  // });

// const audioPath = './assets/alert/audio1.mp3';
//   const alarmSound = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
//     if (error) {
//       console.log('Failed to load the sound', error);
//     }

//     // For iOS, enable audio session
//     if (Platform.OS === 'ios') {
//       alarmSound.setCategory('Playback');
//     }
//   });

// const sound = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//     console.log('Failed to load the sound', error);
//     return;
//   }
// });

  const handleProductClick = async (item) => {
    setSelectedProduct(item);
    Vibration.vibrate(500); //vibration alert
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/alert/audio1.mp3')
      );
  
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing audio: ', error);
    }
    // sound.play((success) => {
    //   if (success) {
    //     console.log('Sound played successfully');
    //   } else {
    //     console.log('Failed to play the sound');
    //   }
    // });
    // voice alert
  //   alarmSound.play((success) => {
  //   if (success) {
  //     console.log('Sound played successfully');
  //   } else {
  //     console.log('Sound playback failed');
  //   }
  // });

   };

  const handleModalClose = () => {
    setSelectedProduct(null);
    
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductClick(item)}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={animalinfo}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
      />

      <Modal isVisible={selectedAnimal !== null}>
        <View style={styles.modalContent}>
        <Image source={require('./assets/animal/Alert.jpg')} style={styles.modalImage} />
          <Text style={styles.notificationText}>Animal Detected</Text>
          <Text style={styles.selectedProductTitle}>{selectedAnimal?.title}</Text>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => {
              navigation.navigate('GuideLines', { itemNumber: selectedAnimal?.id });
              handleModalClose();
            }}
          >
            <Text style={styles.viewDetailsButtonText}>View GuideLines</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleModalClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GuideLines" component={GuideLine} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productItem: {
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  modalImage: {
    width: 'auto',
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  notificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 8,
  },
  selectedProductTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
  },
  viewDetailsButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default App;
