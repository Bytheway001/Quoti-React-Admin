import React from 'react';
import { Row, Col, Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import Axios from 'axios';
import { APIHEADERS, API } from '../../utils';

const InitialState = {
    file:null,
    lang:'',
    category:'',
    company_id:'',
    file_desc:'',
    year:''
}
class FileEdit extends React.Component {
    
    state={
        lang:'',
        category:'',
        company_id:'',
        file_desc:'',
        year:''
    }
    handleChange=(e)=>{
       this.setState({file:e.target.files[0]})
    }

    componentDidMount(){
      
            Axios.get(API + 'files/' + this.props.match.params.id, { headers: APIHEADERS }).then(res => res.data)
                .then(result => {
                    this.setState({
                        ...this.state,
                        ...result.data
                    })
                })
        
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        let formData=new FormData();
       
        formData.set('file_desc',this.state.file_desc)
        formData.set('category',this.state.category)
        formData.set('lang',this.state.lang)
        formData.set('company_id',this.state.company_id)
        formData.set('year',this.state.year)
        Axios.post(API+'files/' + this.props.match.params.id,formData,{ headers: {...APIHEADERS,'Content-Type': 'multipart/form-data'} }).then(res=>res.data)
        .then(result=>{
            if(!result.errors){
                alert('Subido con exito');
                this.setState(InitialState)
            }
        })
    }

    handleInput=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        })
    }

    render() {
        return (
                <Row style={{ padding: 30 }}>
                    <Col xs={12}>
                        <h1 className='text-center'>Admin</h1>
                    </Col>
                    <Col xs={6}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <label htmlFor="">Categoria</label>
                                <FormControl name='category' value={this.state.category} onChange={this.handleInput}/>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="">Compañia</label>
                                <FormControl as='select' name='company_id' value={this.state.company_id} onChange={this.handleInput}>
                                    <option value='1'>Allianz</option>
                                    <option value='2'>Vumi</option>
                                    <option value='3'>Best Doctors</option>
                                    <option value='4'>Megabrokers Latam</option>
                                    <option value='5'>Bupa</option>
                                    <option value='6'>BMI</option>
                                    </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <label>Nombre de archivo</label>
                                <FormControl name='file_desc' value={this.state.file_desc} onChange={this.handleInput}/>
                            </FormGroup>
                            <FormGroup>
                                <label>Idioma</label>
                                <FormControl as='select' name='lang' value={this.state.lang} onChange={this.handleInput}>
                                    <option value='EN'>INGLES</option>
                                    <option value='ES'>ESPAÑOL</option>
                                    <option value='PT'>PORTUGUES</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <label>Año</label>
                                <FormControl as='select' name='year' value={this.state.year} onChange={this.handleInput}>
                                    <option value='2018'>2018</option>
                                    <option value='2019'>2019</option>
                                    <option value='2020'>2020</option>
                                </FormControl>
                            </FormGroup>
                            <Button type='submit'>Guardar</Button>
                        </Form>
                        
                    </Col>
                  
                    
                </Row>

        )
    }
}

export default FileEdit;