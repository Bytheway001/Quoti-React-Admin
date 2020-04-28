import React from 'react';

import { Row, Col, Form, FormControl, FormGroup, Button } from 'react-bootstrap';

import Axios from 'axios';
import { APIHEADERS, API } from '../../utils';
import { useState } from 'react';


const FileNew = ({history}) => {
    const [file, setFile] = useState(null);
    const [lang, setLang] = useState('');
    const [category, setCategory] = useState('');
    const [company_id, setCompanyId] = useState('');
    const [file_desc, setFileDesc] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', file);
        formData.set('file_desc', file_desc);
        formData.set('category', category);
        formData.set('company_id', company_id);
        formData.set('year', year);
        formData.set('lang',lang)
        Axios.post(API + 'files', formData, { headers: { ...APIHEADERS, 'Content-Type': 'multipart/form-data' } }).then(res => res.data)
            .then(result => {
                if (!result.errors) {
                    alert('Subido Con exito')
                 history.push('/files');
                }
            })
    }


    return (
        <Row style={{ padding: 30 }}>
            <Col xs={12}>
                <h1 className='text-center'>Nuevo Documento</h1>
            </Col>
            <Col xs={6}>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="">Categoria</label>
                        <FormControl name='category' value={category} onChange={({target})=>setCategory(target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="">Compañia</label>
                        <FormControl as='select' name='company_id' value={company_id} onChange={({target})=>setCompanyId(target.value)}>
                            <option value="">Seleccione...</option>
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
                        <FormControl name='file_desc' value={file_desc} onChange={({target})=>setFileDesc(target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <label>Idioma</label>
                        <FormControl as='select' name='lang' value={lang} onChange={({target})=>setLang(target.value)}>
                            <option value="">Seleccione...</option>
                            <option value='EN'>INGLES</option>
                            <option value='ES'>ESPAÑOL</option>
                            <option value='PT'>PORTUGUES</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Año</label>
                        <FormControl as='select' name='year' value={year} onChange={({target})=>setYear(target.value)}>
                            <option value="">Seleccione...</option>
                            <option value='2018'>2018</option>
                            <option value='2019'>2019</option>
                            <option value='2020'>2020</option>
                        </FormControl>
                    </FormGroup>
                    <Button type='submit'>Guardar</Button>
                </Form>

            </Col>
            <Col xs={6}>
                <FormGroup>
                    <label htmlFor="">Archivo</label>
                    <FormControl name='file' type='file' onChange={({target})=>setFile(target.files[0])} />
                </FormGroup>

            </Col>

        </Row>
    )
}


export default FileNew;