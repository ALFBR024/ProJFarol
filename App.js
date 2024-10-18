import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login.js';
import Cadastro from './pages/Cadastro.js';
import Home from './pages/Home.js';
import AgendamentoQuarto from './pages/AgendamentoQuarto.js';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="cadastro"
          component={Cadastro}
          options={{
            title: '',
            headerTintColor: '#FFF',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: '',
            headerTintColor: '#FFF',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="agendamentoquarto"
          component={AgendamentoQuarto}
          options={{
            title: '',
            headerTintColor: '#FFF',
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes