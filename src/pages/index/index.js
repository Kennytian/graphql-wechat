import { Component } from '@tarojs/taro'
import { Button, Text, View } from '@tarojs/components'
import { gql } from 'apollo-boost';
import graphqlClient from "../../utils/graphql-client";
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  getData = () => {
    const query = gql`{
       hello { message info version }
       product(id: "R4MGX4") { title city routeDays totalSellNum minHeadCount,id }
       products { items { id } }
    }`;
    graphqlClient.query({query}).then(result => {
      console.log('result===', result.data);
    });
  };

  render() {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <Button onClick={this.getData}>获取数据</Button>
      </View>
    )
  }
}
