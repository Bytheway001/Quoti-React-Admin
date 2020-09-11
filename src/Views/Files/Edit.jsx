import React from 'react';
import { Row, Col, Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import Axios from 'axios';
import { APIHEADERS, API } from '../../utils';
import { useState, useEffect } from 'react';



export const FileEdit = ({match}) => {
    const [company_id, setCompanyID] = useState();
    const [category, setCategory] = useState();
    const [file_desc, setFileDesc] = useState();
    const [lang, setLang] = useState();
    const [year, setYear] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        let data={category,company_id,lang,year,file_desc}
        Axios.post(API + 'files/' + match.params.id,data).then(res => res.data)
            .then(result => {
                if (!result.errors) {
                    alert('Subido con exito');

                }
            })

    }

    useEffect(() => {
        Axios.get(API + 'files/' +match.params.id, { headers: APIHEADERS }).then(({data}) =>{
            console.log(data)
            setCompanyID(data.data.company_id);
            setCategory(data.data.category)
            setFileDesc(data.data.file_desc)
            setLang(data.data.lang)
            setYear(data.data.year)

        })
            
    }, [])
    return (
        <Row style={{ padding: 30 }}>
            <Col xs={12}>
                <h1 className='text-center'>Admin</h1>
            </Col>
            <Col xs={6}>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="">Categoria</label>
                        <FormControl value={category} onChange={({ target }) => setCategory(target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="">Compañia</label>
                        <FormControl as='select' value={company_id} onChange={({ target }) => setCompanyID(target.value)}>
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
                        <FormControl value={file_desc} onChange={({ target }) => setFileDesc(target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <label>Idioma</label>
                        <FormControl as='select' name='lang' value={lang} onChange={({ target }) => setLang(target.value)}>
                            <option value='EN'>INGLES</option>
                            <option value='ES'>ESPAÑOL</option>
                            <option value='PT'>PORTUGUES</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Año</label>
                        <FormControl as='select' name='year' value={year} onChange={({ target }) => setYear(target.value)}>
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
export default FileEdit;