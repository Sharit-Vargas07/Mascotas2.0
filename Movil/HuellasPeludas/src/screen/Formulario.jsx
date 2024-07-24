import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import axiosClient from '../axiosClient.js';
import { ip } from '../IP.jsx';
import { SelectList } from 'react-native-dropdown-select-list';
import { launchImageLibrary } from 'react-native-image-picker';

const FormularioMascota = ({ closeModal, data }) => {
  const [foto, setFoto] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.pngtree.com%2Ffreepng%2Fcamara-icon-design_7770222.html&psig=AOvVaw21sqnhgQ08U-ZjahhXbg_Q&ust=1721868214190000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCK9Iu5vocDFQAAAAAdAAAAABAE");
  const [selectedImage, setSelectedImage] = useState(null);
  
  const openLib = async () => {
    const result = await launchImageLibrary();
    if (result.assets && result.assets.length > 0) {
      setFoto(result.assets[0].uri);
      setSelectedImage(result.assets[0]);
    }
  }

  const [categorias, setCategoria] = useState([]);
  const [razas, setRaza] = useState([]);

  const [formData, setFormData] = useState({
    nombre_mascota: '',
    edad: '',
    descripcion: '',
    peso: '',
    esterilizacion: '',
    desparacitacion: '',
    genero: '',
    nombre_categoria: '',
    nombre_raza: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key] === '') {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      const baseURL = `http://${ip}:3000/mascotas/registrarMascota`;
      const token = await AsyncStorage.getItem('token');

      const formDataToSubmit = new FormData();
      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }

      if (selectedImage) {
        const uriParts = selectedImage.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formDataToSubmit.append('foto', {
          uri: selectedImage.uri,
          name: `foto.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      await axios.post(baseURL, formDataToSubmit, {
        headers: {
          token: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Mascota registrada exitosamente');
      closeModal();
      data();
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error al registrar mascota. Por favor, revisa la consola para más detalles.');
    }
  };

  useEffect(() => {
    axiosClient.get(`http://${ip}:3000/listarcategoria`).then((response) => {
      let atemp = response.data.resultado.map((item) => ({
        key: item.id,
        value: item.nombre_categoria
      }));
      setCategoria(atemp);
    });

    axiosClient.get(`http://${ip}:3000/listaraza`).then((response) => {
      let atemp = response.data.resultado.map((item) => ({
        key: item.id,
        value: item.nombre_raza
      }));
      setRaza(atemp);
    });
  }, []);

  const dataSelect = [
    { key: 'si', value: 'si' },
    { key: 'no', value: 'no' }
  ];

  const dataSelectGenero = [
    { key: 'Hembra', value: 'Hembra' },
    { key: 'Macho', value: 'Macho' }
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Foto</Text>
        <View style={styles.container}>
          <Image 
            resizeMode='contain' 
            style={styles.img} 
            source={{ uri: foto }} 
          />
          <TouchableOpacity onPress={openLib} style={styles.btnCam}>
            <Text style={styles.text}>Seleccione la foto</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={formData.nombre_mascota}
          onChangeText={(text) => handleChange('nombre_mascota', text)}
        />
        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          value={formData.edad}
          onChangeText={(text) => handleChange('edad', text)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          value={formData.descripcion}
          onChangeText={(text) => handleChange('descripcion', text)}
        />
        <Text style={styles.label}>Peso</Text>
        <TextInput
          style={styles.input}
          value={formData.peso}
          onChangeText={(text) => handleChange('peso', text)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>¿Su Mascota está Desparacitada?</Text>
        <SelectList
          setSelected={(value) => handleChange('desparacitacion', value)}
          data={dataSelect}
          defaultOption={{ key: formData.desparacitacion, value: dataSelect.find(m => m.key === formData.desparacitacion)?.value }}
        />
        <Text style={styles.label}>¿Su Mascota está Esterilizada?</Text>
        <SelectList
          setSelected={(value) => handleChange('esterilizacion', value)}
          data={dataSelect}
          defaultOption={{ key: formData.esterilizacion, value: dataSelect.find(m => m.key === formData.esterilizacion)?.value }}
        />
        <Text style={styles.label}>Género</Text>
        <SelectList
          setSelected={(value) => handleChange('genero', value)}
          data={dataSelectGenero}
          defaultOption={{ key: formData.genero, value: dataSelectGenero.find(m => m.key === formData.genero)?.value }}
        />
        <Text style={styles.label}>Categoría</Text>
        <SelectList
          setSelected={(value) => handleChange('nombre_categoria', value)}
          data={categorias}
          defaultOption={{ key: formData.nombre_categoria, value: categorias.find(m => m.key === formData.nombre_categoria)?.value }}
        />
        <Text style={styles.label}>Raza</Text>
        <SelectList
          setSelected={(value) => handleChange('nombre_raza', value)}
          data={razas}
          defaultOption={{ key: formData.nombre_raza, value: razas.find(m => m.key === formData.nombre_raza)?.value }}
        />
        <Button title="Registrar Mascota" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  img: {
    width: '50%',
    height: 200,
    alignSelf: 'center'
  },
  btnCam: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'green',
  },
  text: {
    color: '#fff'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5
  }
});

export default FormularioMascota;
