import React, { useState } from 'react';
import FormRegistro from '../organismos/FormRegistro';
import v from '../../styles/variables';
import { useNavigate } from 'react-router-dom';
import AccionesModal from '../moleculas/ModalAcciones';
import axios from 'axios';



export const Registro = () => {

  const navigate = useNavigate()
  //mensaje para mostrar mensajes de éxito o error.
  const [mensaje, setMensaje] = useState('')
//modalAcciones para controlar la visibilidad del modal.
  const [modalAcciones, setModalAcciones] = useState(false)

  // datos almacenados en el formulario, se guardan
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    rol: 'administrador',
  });

//handleChange actualiza el estado formData cuando el usuario cambia los valores del formulario.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//handleSubmit envía los datos del formulario a la API 
//para registrar un nuevo usuario y muestra un mensaje de éxito o error.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = 'http://localhost:3000/usuario/registrarAdmin';
      await axios.post(baseURL, formData);
      setMensaje('Usuario Registrado exitosamente')
      setModalAcciones(true)
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Usuario Registrado Con Exito",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/iniciosesion')
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center bg-cover bg-center h-screen' style={{ backgroundImage: `url(${v.Image1})`,  backgroundRepeat: 'no-repeat' }}>
      <FormRegistro />
      <AccionesModal
            isOpen={modalAcciones}
            onClose={() => setModalAcciones(false)}
            label={mensaje}
          />
    </div>
  );
};

export default Registro;
