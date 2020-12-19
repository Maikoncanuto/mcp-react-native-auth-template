import React from 'react';

import { View, Button, StyleSheet, Text } from 'react-native';

import { useAuth } from '../../contexts/auth.context';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();

    function handleLogout() {
        signOut();
    }

    return (
        <View style={styles.container}>
            <Text>{user?.name}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default Dashboard;