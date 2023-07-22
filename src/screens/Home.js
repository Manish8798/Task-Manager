import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import {H, W, dimensions} from '../../util/Dimension';
import {Colors, getCurrentLocalTime} from '../../util/Constant';
import LinearGradient from 'react-native-linear-gradient';
import {Input, Button} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConsistencyGraph from '../components/ConsistencyGraph';

const Home = props => {
  const [isCreateClicked, setIsCreateClicked] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [text, setText] = React.useState({
    title: '',
    description: '',
  });
  const handleTouchablePress = () => {
    // Dismiss the keyboard when the user taps outside the TextInput
    Keyboard.dismiss();
  };

  const handleCreatePress = type => {
    switch (type) {
      case 'create':
        setIsCreateClicked(!isCreateClicked);
        break;
      case 'save':
        saveTask();
        break;
    }
  };

  const saveTask = () => {
    if (text.title.trim() == '') return;
    const task = {
      title: text.title,
      description: text.description,
      time: getCurrentLocalTime(),
      status: 'incomplete'
    };
    tasks.push(task);
    setIsCreateClicked(!isCreateClicked);
  };

  const handleTextChange = (inputText, type) => {
    setText({
      title: type == 'title' ? inputText : text.title,
      description: type == 'desc' ? inputText : text.description,
    });
  };

  const textInputRef = React.useRef(null);

  const handleTextInputLayout = () => {
    // Set the cursor position to the beginning when the TextInput layout is ready
    if (textInputRef.current) {
      textInputRef.current.setNativeProps({ selection: { start: 0, end: 0 } });
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <LinearGradient colors={['#868BFE', '#EAF0FF']} style={styles.gradient}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: 20,
            }}>
            <Image source={require('../../assets/avatar.png')} />
            <Text style={styles.signupText}>
              {isCreateClicked ? 'New Task' : 'Rohit Chu'}
            </Text>
          </View>
          <View style={styles.createView}>
            {!isCreateClicked && (
              <View style={styles.mainView}>
                <ScrollView contentContainerStyle={{paddingBottom: H(10)}}>
                  <Button
                    title={'CREATE'}
                    buttonStyle={{
                      backgroundColor: Colors.CreateButton,
                      borderRadius: 24,
                    }}
                    titleStyle={{fontWeight: 'bold', fontSize: 24}}
                    containerStyle={{
                      height: H(6),
                      width: '80%',
                      marginVertical: H(4),
                      alignSelf: 'center',
                    }}
                    onPress={() => handleCreatePress('create')}
                  />
                  {tasks.length == 0 ? (
                    <>
                      <Image
                        style={styles.image}
                        source={require('../../assets/peep.png')}
                      />
                      <Text style={styles.fadeText}>
                        Create a task to get started
                      </Text>
                    </>
                  ) : (
                    <View style={styles.listContainer}>
                      <ConsistencyGraph />
                      {tasks.map((val, i) => {
                        return (
                          <View key={i} style={styles.itemView}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <Text style={styles.itemText}>{val.title}</Text>
                              <Image
                                source={require('../../assets/notebook.png')}
                              />
                            </View>
                            <Text>{val.time}</Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </ScrollView>
              </View>
            )}
            {isCreateClicked && (
              <View style={styles.formContainer}>
                <Input
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                  inputStyle={styles.inputStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  value={text.title}
                  onChangeText={title => handleTextChange(title, 'title')}
                  placeholder="Title"
                />
                <View style={styles.formatContainer}>
                  <MaterialIcons name="format-bold" size={32} />
                  <MaterialIcons name="format-italic" size={32} />
                  <MaterialIcons name="format-underline" size={32} />
                  <MaterialIcons name="format-line-spacing" size={32} />
                </View>
                <Input
                 ref={textInputRef}
                 onLayout={handleTextInputLayout}
                  containerStyle={styles.inputContainer}
                  style={styles.descInput}
                  inputStyle={styles.inputStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  value={text.description}
                  onChangeText={desc => handleTextChange(desc, 'desc')}
                  multiline={true}
                />
                <View style={[styles.formatContainer, {width: '80%'}]}>
                  <Ionicons name="stopwatch-outline" size={32} />
                  <Ionicons name="briefcase-outline" size={32} />
                  <Ionicons name="body-outline" size={32} />
                </View>
                <Button
                  title={'CREATE'}
                  buttonStyle={{
                    backgroundColor: Colors.CreateButton,
                    borderRadius: 24,
                  }}
                  titleStyle={{fontWeight: 'bold', fontSize: 24}}
                  containerStyle={{
                    height: H(6),
                    width: '60%',
                    marginVertical: H(4),
                    alignSelf: 'center',
                  }}
                  onPress={() => handleCreatePress('save')}
                />
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  mainView: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  signupText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 10,
  },
  image: {
    alignSelf: 'center',
  },
  fadeText: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#D9D9D9',
    fontFamily: 'Poppins-Regular',
  },
  createView: {
    width: '100%',
    height: '85%',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    bottom: 0,
    position: 'absolute',
    backgroundColor: Colors.BackgroundColor,
  },
  input: {
    width: '80%',
    height: H(8),
    padding: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    marginTop: H(5),
    borderColor: '#E3E3E3',
    borderWidth: 1,
  },
  inputContainer: {
  },
  inputStyle: {
  },
  inputContainerStyle: {
    borderColor: 'transparent',
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  descInput: {
    width: '80%',
    height: H(25),
    paddingHorizontal: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -H(2),
    borderColor: '#E3E3E3',
    borderWidth: 1,
    textAlignVertical: 'top',
    paddingVertical: 40
  },
  formatContainer: {
    borderRadius: 40,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginHorizontal: 40,
    // paddingVertical: 8,
    zIndex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '55%',
    alignSelf: 'center',
    height: H(8)
  },
  listContainer: {
    alignSelf: 'center',
  },
  itemView: {
    backgroundColor: '#fff',
    marginTop: H(2),
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#868BFE',
  },
});

export default Home;
