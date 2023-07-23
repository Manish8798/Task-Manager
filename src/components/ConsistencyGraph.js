// ConsistencyGraph.js

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Colors} from '../../util/Constant';
import {H} from '../../util/Dimension';

const ConsistencyGraph = () => {
  // Sample data: Replace this with your actual data of completed and pending tasks per day
  const completedTasks = [3, 5, 2, 7, 4, 0, 0];
  const pendingTasks = [1, 3, 2, 4, 5, 0, 0];

  // Labels for X-axis (days of the week)
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const chartData = {
    labels,
    datasets: [
      {
        data: completedTasks,
        color: (opacity = 1) => `rgba(27, 33, 181, ${opacity})`, // Green color for completed tasks
        strokeWidth: 2,
      },
      {
        data: pendingTasks,
        color: (opacity = 1) => `rgba(253, 186, 93, ${opacity})`, // Red color for pending tasks
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Consistency</Text>
      <LineChart
        data={chartData}
        width={350}
        height={250}
        yAxisLabel="Tasks "
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: H(2),
              width: H(2),
              backgroundColor: Colors.SubText,
              borderRadius: H(2) / 2,
              marginHorizontal: 5,
            }}></View>
          <Text style={{marginHorizontal: 5}}>{'Completed'}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: H(2),
              width: H(2),
              backgroundColor: Colors.Yellow,
              borderRadius: H(2) / 2,
              marginHorizontal: 5,
            }}></View>
          <Text style={{marginHorizontal: 5}}>{'Pending'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 350,
    paddingVertical: 20,
    borderRadius: 20,
  },
  chart: {
    marginVertical: 10,
    alignSelf: 'center'
  },
  headText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.SubText,
    alignSelf: 'flex-start',
    paddingBottom: H(2),
    paddingStart: 10,
    fontFamily: 'Poppins-Regular'
  },
});

export default ConsistencyGraph;
