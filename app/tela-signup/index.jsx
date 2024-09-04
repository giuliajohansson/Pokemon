import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';

export default telaSignup = () => {
        const [nome, setNome] = useState('ramon b');
        const [email, setEmail] = useState('ramon.brignoli@edu.sc.senai.br');
        const [senha, setSenha] = useState('senhasupersegura');
      
        const handleSignup = async () => {
            const user = {
              nome: nome,
              email: email,
              senha: senha,
            };
        
            try {
              const response = await fetch('https://taskhub-s37f.onrender.com/auth/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
              });
        
              if (response.ok) {
                const data = await response.json();
                console.log('Signup successful', data);
              } else {
                const errorData = await response.json();
                console.error('Signup failed', errorData);
              }
            } catch (error) {
              console.error('Error during signup', error);
            }
          };

        return (
            <View style={styles.container}>
              <Text style={styles.title}>Sign Up</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />
                 <Pressable style={styles.button} onPress={handleSignup}>
                 <Text style={styles.buttonText}>Sign Up</Text>
                 </Pressable>
            </View>
          );
        };
        
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            padding: 16,
            justifyContent: 'center',
          },

          title: {
            fontSize: 24,
            marginBottom: 16,
            textAlign: 'center',
          },
          input: {
            backgroundColor: '#f9fafb',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#001d6e',
            height: 50,
            width: 230,
            borderColor: '#ccc',
            borderWidth: 1,
            marginBottom: 12,
            paddingHorizontal: 8,
          },

          button: {
            width: 230,
            height: 58,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1f2937',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#1f2937',
          },
        });