
import { create } from 'zustand';

//this same modal store can be used for any other modal through out the application
import { City, Country, State } from "country-state-city";
import { ICountry, IState, ICity } from 'country-state-city'





interface ModalStore {
    Countries:ICountry[],
    
    getCountryData:(index:number)=>ICountry,
    getStateData:(countryIndex:number,stateIndex:number)=>IState,
    getStates:(countryIndex:number)=>IState[],
    getCities:(countryIndex:number,stateIndex:number)=>ICity[]
  

  
 
}

const useCountry = create<ModalStore>((set) => ({
    Countries:Country.getAllCountries(),
    getCountryData:(index):ICountry=>{
        const countries=Country.getAllCountries();
        return countries[index]!;
    },
    getStateData:(countryIndex:number,stateIndex:number):IState=>{
        const countries=Country.getAllCountries();
        const states=State.getStatesOfCountry(countries[countryIndex]!.isoCode);
        return states[stateIndex]!;
    },
    getStates:(countryIndex)=>{
        try{
        const countries=Country.getAllCountries();
        return State.getStatesOfCountry(countries[countryIndex]!.isoCode);
        }catch(e){
        return []
        }
        
    },
    getCities:(countryIndex,stateIndex)=>{
        try{
            const countries=Country.getAllCountries();
            const states=State.getStatesOfCountry(countries[countryIndex]!.isoCode)
            return City.getCitiesOfState(countries[countryIndex]!.isoCode,states[stateIndex]!.isoCode);
        }catch(e){
            return [];
        }
       
    }

    }
));


export default useCountry;