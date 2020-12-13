import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import { useState } from 'react';
import Link from 'next/link';
import styles from './CountryTable.module.css';

const orderBy = (countries,value,direction) => {
    if(direction==='asc'){
    return [...countries].sort((a,b)=> a[value] > b[value] ? 1 : -1 );
    }
    if(direction === 'desc'){
    return [...countries].sort((a,b)=> a[value] > b[value] ? -1 : 1 );    
    }

    return countries;
}




const SortArrow = ({direction}) => {



if(!direction){
    return <></>;
}


if(direction==='desc'){

    return(
    <div className={styles.heading_arrow}>
    <KeyboardArrowDownRounded/>
    </div>
    );

}else{

    return(
        <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded/>
        </div>
        );

}



}


const CountryTable = ({countries}) =>{

    const [direction,SetDirection]=useState();
    const [value,SetValue]=useState();

    const orderedCountry = orderBy(countries,value,direction);

    const switchDirection = () => {
        if(!direction){
            SetDirection('desc');
        }else if (direction==='desc'){
            SetDirection('asc');
        }else{
            SetDirection(null);
        }
    }

    const handleValueAndDirection = (value) => {
        switchDirection();
        SetValue(value)
    }

    return(

    <div>
    <div className={styles.heading}>

    <div className={styles.heading_flag}></div>

    <button className={styles.heading_name} onClick={()=>handleValueAndDirection('name')}>
        <div>Name</div>        
    {value==='name' && <SortArrow direction={direction} /> }
    </button>

    <button className={styles.heading_population} onClick={()=>handleValueAndDirection('population')}>
        <div>Population</div>
        {value==='population' && <SortArrow direction={direction} /> }
    </button>   

    <button className={styles.heading_area} onClick={()=>handleValueAndDirection('area')}>
        <div>Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)</div>
        {value==='area' && <SortArrow direction={direction} /> }
    </button> 

    <button className={styles.heading_gini} onClick={()=>handleValueAndDirection('gini')}>
        <div>Gini</div>
        {value==='gini' && <SortArrow direction={direction} /> }
    </button>      
    
    </div>

    {
        orderedCountry.map((country,index)=>(
            <Link href={`country/${country.alpha3Code}`} key={index}> 
            <div className={styles.row} >
            <div className={styles.flag}><img src={country.flag} alt={country.name}/></div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
            <div className={styles.gini}>{country.gini || 0} %</div>
            </div>
            </Link>
        ))
    }
        
    </div>

   

    );
}

export default CountryTable;