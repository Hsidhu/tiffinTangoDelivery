import { View, Text, Image, StyleSheet } from 'react-native';
import restaurants from '../../../assets/data/restaurants';
import { MaterialIcons} from '@expo/vector-icons';
import { styles } from './styles';

const restaurant = restaurants[0];

const Header = ({ restaurant }) => {

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: restaurant.image }} />
        <Text style={styles.title}>{ restaurant.name }</Text>
        <View style={styles.deliveryInfo}>
            <MaterialIcons 
                name="delivery-dining" 
                size={24} 
                color="black"
            /> 
            <Text style={styles.subtitle} > { restaurant.deliveryFee.toLocaleString('en-US', {style: 'currency', currency: 'USA'}) }  •  { restaurant.minDeliveryTime } - { restaurant.maxDeliveryTime } min
            </Text>
            <View style={styles.ratingGroup}>
                <MaterialIcons 
                    name="star" 
                    color="darkorange" 
                    size={18} 
                />
                <Text style={styles.rating}>
                 { restaurant.rating }</Text>
            </View>
        </View>
        <Text style={styles.menuTitle}>Menu</Text>
    </View>
  );
}

export default Header;