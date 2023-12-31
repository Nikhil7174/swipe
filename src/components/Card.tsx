import { View , Text, Image, StyleSheet, Dimensions, Animated } from "react-native";
const { width , height } = Dimensions.get("screen");
import { Fragment, useCallback } from "react";
import tick from '../../assets/tick.png';
import cross from '../../assets/cross.png';

const Card = ({ isFirst, swipe, color, titlSign, ...rest })=>{

    // Calculate the rotation of the card based on swipe gesture
    const rotate = Animated.multiply(swipe.x,titlSign).interpolate({
        inputRange: [-100,0,100],
        outputRange: ['8deg', '0deg', '-8deg']
    });

     // Animated style for the card with rotation and translation
    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    }

    // Opacity animation for the "like" button
    const likeOpacity = swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0,1],
        extrapolate: 'clamp'
    });

    // Opacity animation for the "nope" button
    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1,0],
        extrapolate: 'clamp'
    });

    // Function to render the "like" and "nope" buttons conditionally
    const renderChoice = useCallback(()=>{
        return (
           <Fragment>
              <Animated.View
               style={[
                styles.choiceContainer, 
                styles.likeContainer,
                { opacity: likeOpacity }
                ]}>
                 {/* <Choice type="like" /> */}
                    <Image source={tick} style={{width: 90, height: 90, top:0, left:200}} />
              </Animated.View>
              <Animated.View 
                style={[
                    styles.choiceContainer, 
                    styles.nopeContainer,
                { opacity: nopeOpacity }
                    ]}>
                 <Image source={cross} style={{width: 70, height: 70, top:0, right:200}} />
              </Animated.View>
           </Fragment>
        )
    },[likeOpacity, nopeOpacity])

    return (
        <Animated.View style={[
            styles.container,
            isFirst && animatedCardStyle
            ]} {...rest}>
            {/* <Image source={image} style={styles.image} /> */}
            <View>
            <View style={[styles.card, {backgroundColor:color}]} className={`bg-${color}`} />
            </View>
            {/* <LinearGradient 
              colors={['transparent', 'rgba(0,0,0,.9)']}
              style={styles.gradient}/> */}
              {/* <View style={styles.userContainer}>
                <Text style={styles.name}>{name}, {age} </Text>
                <Text style={styles.location}>Live in {location}</Text>
                <Text style={styles.distance}>{distance} miles away</Text>
              </View> */}
            {isFirst && renderChoice()}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 200,
    },
    image: {
        width: width * 0.9,
        height: height * 0.78,
        borderRadius: 20,
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        borderRadius: 20,
    },
    userContainer: {
        position: "absolute",
        bottom: 24,
        left: 24,
    },
    name: {
        fontSize: 30,
        color: "#FFFFFF",
        fontWeight: "400",
    },
    location: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "300",
    },
    distance: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "300",
    },
    choiceContainer: {
        position: "absolute",
        top: 100,
    },
    likeContainer: {
        left: 45,
        transform: [{ rotate: "-30deg" }],
    },
    nopeContainer: {
        right: 45,
        transform: [{ rotate: "30deg" }],
    },
    card: {
        width: 300,
        height: 400,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 15,
        position: "relative", // Added position relative
        top: 0, // Adjust the top property to control the overlap
        zIndex: 1, // Ensure the current card is rendered on top
    },
});

export default Card