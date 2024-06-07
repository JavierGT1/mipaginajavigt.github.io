import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Table, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const data = [
  { id: 1, nombre: "Luis", apellido: "Vásquez", telefono: "48134752" },
  { id: 2, nombre: "Juan", apellido: "Guzman", telefono: "48134752" },
  { id: 3, nombre: "Maria", apellido: "Hernandez", telefono: "48134752" },
  { id: 4, nombre: "Pedro", apellido: "Tay", telefono: "48134752" },
  { id: 5, nombre: "Farruko", apellido: "Lopez", telefono: "48134752" },
];

class App extends React.Component {
  state = {
    data: data,
    modalOpen: false, // Modo no visible
    newElement: { // Nuevo elemento con datos vacíos
      id: "",
      nombre: "",
      apellido: "",
      telefono: ""
    },
    editingElementId: null, // ID del elemento que se está editando
  }

  toggleModal = () => { // Método para cambiar el estado del modal, abrir o cerrar
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  handleChange = (e) => { // Función que se ejecuta en el momento del cambio
    this.setState({
      newElement: {
        ...this.state.newElement,
        [e.target.name]: e.target.value
      }
    });
  }

  addElement = () => { // Función para agregar el elemento
    const newElement = this.state.newElement;
    newElement.id = this.state.data.length + 1;
    const newData = [...this.state.data, newElement];
    this.setState({ data: newData, modalOpen: false, newElement: { id: "", nombre: "", apellido: "", telefono: "" } });
  }

  editElement = (id) => { // Método para editar un elemento
    // Encuentra el elemento a editar
    const elementToEdit = this.state.data.find(element => element.id === id);
    // Actualiza el estado para abrir el modal con los datos del elemento a editar
    this.setState({
      editingElementId: id,
      newElement: { ...elementToEdit }
    });
    // Abre el modal de edición
    this.toggleModal();
  }

  updateElement = () => { // Método para actualizar el elemento editado
    const updatedData = this.state.data.map(element => {
      if (element.id === this.state.editingElementId) {
        return this.state.newElement;
      }
      return element;
    });
    // Actualiza el estado con los datos editados
    this.setState({ data: updatedData, modalOpen: false, editingElementId: null, newElement: { id: "", nombre: "", apellido: "", telefono: "" } });
  }

  deleteElement = (id) => { // Método para eliminar un elemento
    // Filtra los elementos diferentes al elemento a eliminar
    const newData = this.state.data.filter(element => element.id !== id);
    // Actualiza el estado con los datos filtrados
    this.setState({ data: newData });
  }

  render() {
    return (
      <>
        <Container>
          <Button color='dark' onClick={this.toggleModal}>Insertar nuevo registro</Button>
          <br /><br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.apellido}</td>
                  <td>{elemento.telefono}</td>
                  <td>
                    <Button color="primary" onClick={() => this.editElement(elemento.id)}>Editar</Button>{"  "}
                    <Button color='danger' onClick={() => this.deleteElement(elemento.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} >
          <ModalHeader>Modal para agregar nuevo elemento</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='nombre'>Nombre</Label>
              <Input type='text' name='nombre' id='nombre' value={this.state.newElement.nombre} onChange={this.handleChange}></Input>
            </FormGroup>
            <FormGroup>
              <Label for='apellido'>Apellido</Label>
              <Input type='text' name='apellido' id='apellido' value={this.state.newElement.apellido} onChange={this.handleChange}></Input>
            </FormGroup>
            <FormGroup>
              <Label for='telefono'>Teléfono</Label>
              <Input type='text' name='telefono' id='telefono' value={this.state.newElement.telefono} onChange={this.handleChange}></Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            {this.state.editingElementId ? (
              <Button color='primary' onClick={this.updateElement}>Actualizar</Button>
            ) : (
              <Button color='primary' onClick={this.addElement}>Agregar</Button>
            )}
            <Button color='danger' onClick={this.toggleModal}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;