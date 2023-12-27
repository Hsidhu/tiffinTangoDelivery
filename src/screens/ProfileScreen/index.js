import React from "react";
import { useSelector } from 'react-redux';
import { View, Text, Image } from "react-native";
import UserLocation from '../../utils/UserLocation'

export default function ProfileScreen() {
    
    const {userDetails, dailyDeliveries} = useSelector(state => state)

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                paddingHorizontal: 15,
                paddingVertical: 30,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: '100%',
                    height: 60,
                    position: "relative",
                }}
            >
                <Image
                    source={{ uri: "https://github.com/josafamarengo.png" }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        resizeMode: "contain",
                        position: "absolute",
                        left: 0,
                        top: 0,
                    }}
                />
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginHorizontal: "auto"
                    }}
                >
                    {userDetails.user.full_name}
                </Text>
            </View>

                <UserLocation />
        </View>
    );
}
