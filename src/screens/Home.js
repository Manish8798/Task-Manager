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
import {
  Colors,
  getAccessToken,
  getCurrentFormattedDate,
  getDayNumber,
  storeTasks,
  getTasks,
} from '../../util/Constant';
import LinearGradient from 'react-native-linear-gradient';
import {Input, Button} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConsistencyGraph from '../components/ConsistencyGraph';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const Home = props => {
  const [isCreateClicked, setIsCreateClicked] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [text, setText] = React.useState({
    title: '',
    description: '',
  });
  const [username, setUsername] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [accessToken, setAccessToken] = React.useState('');
  const [taskCategory, setTaskCategory] = React.useState({
    name: null,
    index: null,
  });
  const iconList = [
    {default: 'stopwatch-outline', sharp: 'stopwatch-sharp'},
    {default: 'briefcase-outline', sharp: 'briefcase-sharp'},
    {default: 'body-outline', sharp: 'body-sharp'},
  ];
  const [completedTasks, setCompletedTasks] = React.useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [pendingTasks, setPendingTasks] = React.useState([0, 0, 0, 0, 0, 0, 0]);
  const handleTouchablePress = () => {
    // Dismiss the keyboard when the user taps outside the TextInput
    Keyboard.dismiss();
  };

  React.useEffect(() => {
    const unsubscribe = props?.navigation.addListener('focus', () => {
      makeGetRequest();
    });
    // Clean up the listener when the component is unmounted
    return unsubscribe;
  }, [isCreateClicked]);

  const handleCreatePress = type => {
    switch (type) {
      case 'create':
        setIsCreateClicked(true);
        break;
      case 'save':
        saveTask();
        break;
    }
  };

  const handleChangeValueAtIndex = async (index, newPendingTasks) => {
    // console.log(index, newValue)
    // Create a copy of the original array to avoid directly mutating the state
    const tempTasks = newPendingTasks?.pendingTasks;
    const newData = tempTasks ? [...tempTasks] : [...pendingTasks];
    newData[index] += 1;
    setPendingTasks(newData);
    let tasks = {
      pendingTasks: newData,
      completedTasks: completedTasks,
    };
    // console.log(newData);
    tasks = JSON.stringify(tasks);
    await storeTasks(tasks);
  };

  const showToast = (status, message) => {
    Toast.show({
      type: status, // 'info', 'error', or 'success'
      text1: `${message}!`,
      // text2: message,
      position: 'bottom', // 'top' or 'bottom'
      visibilityTime: 2000, // Duration in milliseconds
    });
  };

  const saveTask = async () => {
    if (text?.title?.trim() == '' || text?.title?.length < 3) {
      showToast('error', 'Title should contain atleast 3 characters');
      return;
    }
    try {
      const accessToken = await getAccessToken();
      const url = 'http://13.126.244.224/api/task';
      const data = {
        phone: phone,
        name: text?.title,
        details: text?.description,
        category: taskCategory?.name,
        expiry_date: getCurrentFormattedDate(),
      };
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken?.token}`,
          'Content-Type': 'application/json',
        },
      };
      console.log('saveTask', data);
      const response = await axios.post(url, data, config);
      const dayNumber = getDayNumber();
      const newPendingTasks = await getTasks();
      handleChangeValueAtIndex(dayNumber - 1, newPendingTasks);
      setIsCreateClicked(!isCreateClicked);
      const phoneUri = encodeURIComponent(phone);
      await getAllTasks(phoneUri, accessToken?.token);
      // console.log('Response data:', response.data);
    } catch (error) {
      console.error('Save Task Error:', error);
    }
  };

  const getAllTasks = async (phone, accessToken) => {
    console.log('getAllTasks');
    try {
      const url = 'http://13.126.244.224/api/task';
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(`${url}?phone=${phone}`, config);
      // Process the response data here
      // console.log('getAllTasks data:', response.data);
      if (response.data.code == '200') {
        setTasks(response?.data?.data?.task);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  };

  // const saveTask = async () => {
  //   if (text.title.trim() == '') return;
  //   const task = {
  //     phone: phone,
  //     name: text?.title,
  //     details: text?.description,
  //     category: 'work',
  //     expiry_date: getCurrentFormattedDate(),
  //   };
  //   console.log(task);
  //   await makePostRequest(task);
  // };

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
      textInputRef.current.setNativeProps({selection: {start: 0, end: 0}});
    }
  };

  const makeGetRequest = async () => {
    console.log('makeGetRequest');
    try {
      const accessToken = await getAccessToken();
      setPhone(`+91${accessToken?.phone}`);
      setAccessToken(accessToken?.token);
      // console.log(accessToken);
      const url = 'http://13.126.244.224/api/user';
      const phoneUri = encodeURIComponent(`+91${accessToken?.phone}`);
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken?.token}`,
        },
      };
      const response = await axios.get(`${url}?phone=${phoneUri}`, config);
      setUsername(response?.data?.data?.user?.username);
      await getAllTasks(phoneUri, accessToken?.token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onPressCategory = (name, index) => {
    setTaskCategory({
      name:
        name == 'stopwatch-outline'
          ? 'work'
          : name == 'briefcase-outline'
          ? 'work'
          : 'personal',
      index: index,
    });
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
              {isCreateClicked ? 'New Task' : username}
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
                      height: H(7),
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
                      <ConsistencyGraph
                        pendingTasks={pendingTasks}
                        completedTasks={completedTasks}
                      />
                      {tasks.map((val, i) => {
                        return (
                          <TouchableWithoutFeedback
                            key={i}
                            onPress={() => console.log('Card')}>
                            <View style={styles.itemView}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text style={styles.itemText}>{val?.name}</Text>
                                <Image
                                  source={require('../../assets/notebook.png')}
                                />
                              </View>
                              <Text style={{color: 'gray'}}>{val?.date_created}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      })}
                    </View>
                  )}
                </ScrollView>
              </View>
            )}
            {isCreateClicked && (
              <ScrollView style={styles.formContainer}>
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
                  {[
                    'format-bold',
                    'format-italic',
                    'format-underline',
                    'format-line-spacing',
                  ].map((name, i) => (
                    <MaterialIcons
                      key={i}
                      name={name}
                      size={32}
                      color={'grey'}
                      onPress={() => console.log(name)}
                    />
                  ))}
                  {/* <MaterialIcons name="format-bold" size={32} />
                  <MaterialIcons name="format-italic" size={32} />
                  <MaterialIcons name="format-underline" size={32} />
                  <MaterialIcons name="format-line-spacing" size={32} /> */}
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
                  {iconList.map((name, i) => (
                    <Ionicons
                      key={i}
                      color={
                        taskCategory.index == i ? 'green' : Colors.IconColor
                      }
                      name={taskCategory.index == i ? name.sharp : name.default}
                      size={32}
                      onPress={() => onPressCategory(name.default, i)}
                    />
                  ))}
                  {/* <Ionicons name="stopwatch-outline" size={32} />
                  <Ionicons name="briefcase-outline" size={32} />
                  <Ionicons name="body-outline" size={32} /> */}
                </View>
                <Button
                  title={'CREATE'}
                  buttonStyle={{
                    backgroundColor: Colors.CreateButton,
                    borderRadius: 24,
                  }}
                  titleStyle={{fontWeight: 'bold', fontSize: 24}}
                  containerStyle={{
                    height: H(7),
                    width: '60%',
                    marginVertical: H(4),
                    alignSelf: 'center',
                  }}
                  onPress={() => handleCreatePress('save')}
                />
              </ScrollView>
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
  inputContainer: {},
  inputStyle: {},
  inputContainerStyle: {
    borderColor: 'transparent',
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  descInput: {
    width: '80%',
    height: H(35),
    paddingHorizontal: 25,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -H(5),
    borderColor: '#E3E3E3',
    borderWidth: 1,
    textAlignVertical: 'top',
    paddingVertical: 50,
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
    height: H(8),
  },
  listContainer: {
    alignSelf: 'center',
  },
  itemView: {
    backgroundColor: '#fff',
    marginTop: H(2),
    borderRadius: 20,
    paddingVertical: H(1),
    paddingHorizontal: W(5),
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#868BFE',
  },
});

export default Home;
