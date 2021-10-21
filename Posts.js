import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from "react-native";
import Post from "./Post";
const Posts = () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  // TODO add your code  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [filteredPost, setFilteredPost] = useState(posts);
  const [isLoading, setIsLoading] = useState(false);
  const fetchPost = async () => {
    setIsLoading(true);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setLoaded(true);
        setPosts(responseJson);
        setFilteredPost(responseJson);
        return responseJson;
      })
      .catch((error) => console.log(error))
      .finally(setIsLoading(false));
  };
  const handleSearch = (search) => {
    // let value = allPosts.target.value.toLowerCase();    // console.log(allPosts.toLowerCase())    if (!searchWord) return setFilteredPost(posts);
    let result = posts.filter((data) => {
      return (
        data.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        data.body.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    });
    console.log(result);
    setFilteredPost(result);
  };
  return (
    <View>
      {isLoading && <ActivityIndicator color="red" />}
      {!loaded && (
        <Button
          onPress={() => fetchPost()}
          title="Load posts"
          testID="load-posts"
        />
      )}
      <View style={styles.postContainer}>
        <TextInput
          testID="search"
          placeholder="Search"
          placeholderTextColor="black"
          style={styles.input}
          onChangeText={(search) => {
            handleSearch(search);
          }}
          style={styles.input}
        />
        <FlatList
          data={filteredPost}
          keyExtractor={(posts) => posts.id.toString()}
          renderItem={({ item }) => <Post post={item} />}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
  },
  postContainer: {
    marginRight: 20,
    marginLeft: 20,
  },
});
export default Posts;
