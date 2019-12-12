import React from 'react';
import Axios from 'axios';
import { API, APIHEADERS } from '../../utils';
import { parseCSV } from '../../utils';

class PlansLogic extends React.Component {
    state = {
        plan: null,
        companies: [],
        regions: [],
        new_record_id:-1
    }

    componentDidMount() {

        Axios.get(API + 'plans/' + this.props.match.params.id, { headers: APIHEADERS }).then(res => res.data)
            .then(result => {
                this.setState({
                    ...this.state,
                    plan: result.data
                })
            })
        this.getRegions()

    }
    
    createRateObject(deductible){
     
    }

    generateNewId=()=>{
       let id = this.state.new_record_id;
        this.setState({
            ...this.state,
            new_record_id:id--
        })
        return id-1;
    }

    getRegions = () => {
        Axios.get(API + 'regions', { headers: APIHEADERS }).then(res => res.data)
            .then(result => {
                this.setState({
                    ...this.state,
                    regions: result.data
                })
            })
    }
    // Cambios a Inputs del objeto raiz
    handleMainChange = (e) => {

        let plan = this.state.plan;
        plan[e.target.name] = e.target.value;
        this.setState({
            ...this.state,
            plan: plan
        })
    }
    // Cambios a los rates
    handleRateChange = (e) => {
        let plan = this.state.plan
        let id = parseInt(e.target.getAttribute('data-rate-id'));
        plan.rates.find(x=>x.id===id)[e.target.name]=e.target.value
        this.setState({
            ...this.state,
            plan: plan
        })

    }
    // Eliminar el Rate
    destroyRate = (e) => {
        let plan = this.state.plan;
        let id = parseInt(e.target.getAttribute('data-id'));
        plan.rates.find(x=>x.id===id).destroy=true;
        this.setState({
            ...this.state,
            plan:plan
        })

    }
    // Maneja el boton de Subir CSV
    handleRateCSVUpload = (files, evt) => {
        let reader = new FileReader()
        let csvFile = files[0]
        reader.readAsText(csvFile);
        reader.onload = event => {
            let csv = event.target.result;
            let parsedCSV = parseCSV(csv, ';', '\n','plan_rates');
            if (parsedCSV) {
                let first_id = this.generateNewId();
                let rates = parsedCSV.map(x=>{
                    first_id--;
                    return {...x,id:first_id}
                });
                let plan = this.state.plan;
                plan.rates = rates;
                this.setState({
                    ...this.state,
                    plan: plan
                })


            }

        }

    }

    handleKidRateCSVUpload= (files,evt)=>{
        let reader = new FileReader();
        let csvFile = files[0]
        reader.readAsText(csvFile);
        reader.onload = event=>{
            let csv = event.target.result;
            let parsedCSV = parseCSV(csv,';','\n','kid_rates')
            if(parsedCSV){
                let first_id = this.generateNewId();
                let kid_rates = parsedCSV.map(x=>{
                    first_id--;
                    return{...x,id:first_id}
                })
                let plan = this.state.plan;
                plan.kid_rates=kid_rates;
                this.setState({
                    ...this.state,
                    plan:plan
                })
            }
        }
    }

    // Submit al formulario
    handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(API + 'plans/' + this.props.match.params.id, this.state.plan, { headers: APIHEADERS }).then(res => res.data)
            .then(result => {
                if(result.errors===false){
                    alert('Guardado con Exito')
                }
            })
    }
    // Clickear en la pestaña de agregar deducible
    createNewDeductible = (key) => {
        if (key === 'newDed') {
            let ded = window.prompt('Indique el valor del nuevo deducible');
            
            if(ded!==''){
                let plan = this.state.plan;
                plan.rates.push({ id:this.generateNewId(),min_age: 0, max_age: 99, deductible:parseInt(ded), yearly_price: 0, biyearly_price: 0,newRecord:true});
                this.setState({
                    ...this.state,
                    plan: plan
                })
            }
        }
    }
    // Nueva pestaña de endosos
    createNewEndoso = (key)=>{
        if(key==='newEndoso'){
            let endoso = window.prompt("Indique el nombre del nuevo endoso")
            let price = window.prompt("Cual es el costo de este endoso?")
            if(endoso){
                let newEndoso = {
                    id:this.generateNewId(),
                    name:endoso,
                    price:price,
                    endoso_configs:[]
                }
                let deductibles=[...new Set(this.state.plan.rates.map(item => item.deductible))]
                deductibles.map((x,index)=>newEndoso.endoso_configs.push({id:this.generateNewId()-index,selected:0,deductible:x,avaliable:0,included:0}))
                let plan = this.state.plan;
                plan.endosos.push(newEndoso)
                this.setState({
                    ...this.state,
                    plan: plan
                })
                
            }
          
        }
    }
   
    // Nuevo rate
    addNewRate=(ded)=>{
        let plan = this.state.plan;
        let newId = this.generateNewId();
        plan.rates.push({id:newId,min_age:0,max_age:99,deductible:ded,yearly_price:0,biyearly_price:0,newRecord:true})
        this.setState({
            ...this.state,
            plan:plan
        })
    }

    // Cambios a endoso configs
    handleEndosoConfigChange=(e)=>{
       let plan = this.state.plan
       let id = parseInt(e.target.getAttribute('data-id'));
       let endoso =parseInt(e.target.getAttribute('data-endoso'));
       console.log(plan,id,endoso)
       plan.endosos.find(x=>x.id === endoso).endoso_configs.find(x=>x.id===id)[e.target.name]=e.target.checked?1:0
       this.setState({
           ...this.state,
           plan:plan
       })
    }

  
}

export default PlansLogic