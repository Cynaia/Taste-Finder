import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar
  } from 'react-native';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';

export function Result({ navigation, route }) {
    const [food, setFood] = useState([""]);
    //value sent form the home page
    let findvalue = route.params.paramkey;
    useEffect(() => {
        const url = "http://localhost:8000/"
        fetch(url)
          .then(x => x.json())
          .then(json => {
            setFood(json.filter((data) =>
            data.food_name.toLowerCase().includes(findvalue.toLowerCase()))
          )
          })
    }, []);
  
    return (
      <SafeAreaView style={[styles.containerResult, (Platform.os == "android" ? {paddingTop: StatusBar.currentHeight} : {})]}>
        
          <Text style={styles.searchTextResult}>
            Searched for "{route.params.paramkey}"
          </Text>
          {food.length == 0 ? (
            <Text style={styles.noResultText}>No food found</Text>
          ) : (
            <Text style={styles.resultText}>Here are the search results</Text>
          )}
          <FlatList
            data={food}
            renderItem={({ item }) => (
              <View style={styles.itemsResult}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Food', { paramkey: item._id });
                  }}>
                  <View style={styles.foodNameContainer}>
                    <Text style={styles.foodNameTextResult}>{item.food_name}</Text>
                  </View>
                </TouchableOpacity>
    
                <View style={styles.reviewsContainerResult}>
                  {/* Add code to display reviews here */}
                </View>
              </View>
            )}
          />
          {food.length == 0 ? (
            <Text style={styles.searchAgainText}>
              Please search for another food
            </Text>
          ) : (
            <Text style={styles.detailsText}>
              Click on a food item to see details
            </Text>
          )}
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    containerResult: {
      padding: 10,
      backgroundColor: 'white',
      height: "100%"
    },
    searchTextResult: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    noResultText: {
      fontSize: 18,
      color: 'red',
      marginBottom: 10,
    },
    resultText: {
      fontSize: 18,
      marginBottom: 10,
    },
    itemsResult: {
      flex: 1,
      flexDirection: 'column',
      marginBottom: 10,
    },
    foodNameContainer: {
      width: "25%",
      backgroundColor: '#FFE5DF',
      padding: 10,
      borderRadius: 5,
    },
    foodNameTextResult: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    reviewsContainerResult: {
      marginTop: 5,
    },
    searchAgainText: {
      marginTop: 10,
      color: '#999',
    },
    detailsText: {
      marginTop: 10,
      fontWeight: 'bold',
    },
  });
  