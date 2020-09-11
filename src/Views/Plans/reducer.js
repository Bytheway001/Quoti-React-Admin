export const reducer = (state, { type, payload }) => {
    switch (type) {
        case "PLAN_REQUEST_SUCCEEDED":
            return {
                general: {
                    id: payload.id,
                    company_id: payload.company_id,
                    enabled: payload.enabled,
                    name: payload.name,
                    plan_type: payload.plan_type,
                    region_id: payload.region_id
                },
                rates: payload.rates,
                benefits:payload.benefits
            };
        case "RATE_WAS_CHANGED":
            console.log(state.rates)
            let r = state.rates.find(x=>x.id===payload.id)
          
            if(payload.type==='yearly'){
               r.yearly_price = payload.value
               r.ey=true;
            }
            else{
                r.biyearly_price = payload.value
                r.eby=true
            }
           
            return {
                ...state,
                


            }
        default:
            throw new Error();
    }
}