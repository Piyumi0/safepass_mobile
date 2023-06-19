import React from 'react';
import { View, Text } from 'react-native';
import dataArray from './data/GuideLines'; 
import { StyleSheet} from 'react-native';


const Notification = ({ route }) => {
  const { itemNumber } = route.params;

  const getTitleData = (id) => {
    const data = dataArray.find(item => item.id === id);
    return data;
  };

  const matchedData = getTitleData(itemNumber);

  // Use the itemNumber to fetch and display the details

  return (
    <View>
    {matchedData && (
      <View>
        <Text style={styles.container}>{matchedData.title}</Text>
        <Text>{matchedData.description}</Text>
      </View>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
        fontSize: 30,
        
        
      
    },
});

export default Notification;
