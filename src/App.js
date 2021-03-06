import React,{useEffect, useState}from "react";

import api from './services/api'

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(resp => {
        setRepositories(resp.data); 
    })
}, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
   const resp = await api.post(`repositories/${id}/like`)
   
   const repository = resp.data;

   setRepositories([repository])
    

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>Repository 1</Text>

          <View style={styles.techsContainer}>
            <FlatList 
              data={repositories}
              keyExtractor={ repository => repository.id}
              renderItem={({item: repository}) => (
                <Text style={styles.tech}>
                  {repository.title}
                </Text>
            )}
            />
            <FlatList
              data={repositories}
              keyExtractor={repository => repository.id}
              renderItem={({item: repository}) => (
                <Text style={styles.tech}>
                {repository.techs}
              </Text>
            )}
            />
            
            
          </View>

          <View style={styles.likesContainer}>
            {repositories.map(repository => (
              
              <Text 
              key={repository.id} 
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-${repository.id}`}
            >
              {repository.likes} curtidas
            </Text>

            ))}
            
          </View>
          {repositories.map( repository => (
            <TouchableOpacity key={repository.id} 
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${repository.id}`}
          >
            <Text key={repository.id} style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
          ))}
          
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
