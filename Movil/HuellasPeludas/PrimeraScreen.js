import {View, StyleSheet, Image} from 'react-native';
import Icono from './src/assets/logoperrito.png';

export default function PrimeraScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={Icono} style={styles.Image} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    Image: {
        width: 350,
        height: 350,
        resizeMode: 'cover',
    },
});
