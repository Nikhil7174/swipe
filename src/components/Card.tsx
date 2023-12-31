import { View, Text, Animated, PanResponder } from 'react-native'
import React,{useState, useRef} from 'react'
import { Dimensions } from 'react-native'
import { Image } from 'react-native-elements'
import p3 from '../../assets/p3.png'
import p2 from '../../assets/p1.png'

const Card = () => {
  const [data, setData] = useState([
    {image: p3, id: 1},
    {image: p2, id: 2},
])
  const {height, width} = Dimensions.get('window')
  const swipe = useRef(new Animated.ValueXY()).current;
  return (
    <Animated.View className='absolute'>
      {data.map((item,index) => (
        <Image source={item.image} style={{ width:200, height: 200, borderRadius: 10 }} key={item.id} swipe={swipe}/>
      )).reverse()}
    </Animated.View>
  )
}

export default Card