import React from 'react';

import { View, Button, StyleSheet } from 'react-native';

import { useAuth } from '../../contexts/auth.context';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

const SignIn: React.FC = () => {
    const { signed, user, signIn } = useAuth();

    async function handleSignIn() {
        const response = await signIn();
        console.log('SignIn', response);
        console.log('Signed', signed);
        console.log('User', user);
    }

    return (
        <View style={styles.container}>
            <Button title="Entrar" onPress={handleSignIn} />
        </View>
    );
};

export default SignIn;