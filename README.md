
## GraphQL 在小程序中的调用示例

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

#### 前置条件
我们以小程序框架 Taro 为前提，在项目中使用 GraphQL 查询数据，具体步骤如下：

#### 一、安装
`yarn add graphql apollo-boost`，安装好后，package.json 中添加如下两个依赖：
```
  "dependencies": {
    ...
    "apollo-boost": "^0.3.1",
    "graphql": "^14.2.1"
    ...
  },

```
###### apollo-boost 是什么
Apollo Boost 是一个零配置的 Apollo Client，包含很多省心的默认配置，比如 `InMemoryCache` 和 `HttpLink`，我们都是用的合理默认配置。当然也包含 `graphql-tag`，用 apollo 全家桶，真香！

#### 二、封装 client
graphql-client.js
```
import Taro from '@tarojs/taro'
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://openapi.baichanghui.com/graphql',
  fetch: (url, options) => Taro.request({
    url,
    method: options.method,
    data: options.body,
    header: options.headers,
  }).then(({data, statusCode}) => {
    return {
      ok: () => {
        return statusCode >= 200 && statusCode < 300;
      },
      text: () => {
        return Promise.resolve(JSON.stringify(data));
      }
    }
  })
});
export default client
```
>注：这里的 openapi.baichanghui.com 是一个可供临时测试用的接口

#### 三、引用
```
import { gql } from 'graphql-boost';
import graphqlClient from "../../utils/graphql-client";

```
#### 四、获取数据

```
 getData = () => {
    const query = gql`{
       hello { message info version }
       product(id: "R4MGX4") { title city routeDays totalSellNum minHeadCount id }
       products { items { id } }
    }`;
    graphqlClient.query({query, variables: {}}).then(result => {
      console.log('result===', result.data);
    });
  };
```

>友情提示：字段间可以用空格，逗号或者换行

#### 五、调用
```
<Button onClick={this.getData}>
获取数据
</Button>
```
#### 六、请求
虽然我们在写 query 语句 ` { title city routeDays totalSellNum minHeadCount id }` 时字段之间是空格分隔的，但被 `gql` 转换成  `\n    title\n    city\n    routeDays\n    totalSellNum\n    minHeadCount\n    id\n `

如图所示：

![](https://upload-images.jianshu.io/upload_images/16119129-5771e76160e419f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 七、响应
在微信开发工具的 network 里就能看到返回数据，实现 1 次请求返回传统要请求 3 次接口的数据量。

如图所示：

![](https://upload-images.jianshu.io/upload_images/16119129-e53a3dae016534e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

今天，你 GraphQL 了吗？
