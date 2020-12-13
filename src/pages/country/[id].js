import { useState,useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from './Country.module.css';
import Link from 'next/link';

const getCountry = async(id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
    const country = await res.json();
    return country;
}

const CountryPage = ({country}) => {

    const [borders,SetBorders]=useState([]);

    const getBorders = async () => {
    const borders= await Promise.all(country.borders.map(border=> getCountry(border)));
    SetBorders(borders);
    }
    
    useEffect(()=>{
        getBorders();
    },[])

    
    const borderBody=(
    borders.map(({flag,name,alpha3Code})=>                
    <Link href={`/country/${alpha3Code}`} key={flag} >
    <div className={styles.overview_details_border_country} >
        <img src={flag} alt={name}/>
        <div className={styles.overview_details_border_country_name}>{name}</div>                    
    </div>
    
    </Link>
    
    
    ));

    return(
        <Layout title={country.name}>
            
            <div className={styles.container}>

            <div className={styles.container_left}>
            <div className={styles.overview}>

                <img src={country.flag} alt={country.name}/>
                <h1 className={styles.overview_name}>{country.name}</h1>
                <div className={styles.overview_region}>{country.region}</div>

                <div className={styles.overview_summary}>

                <div className={styles.overview_population}>
                    <div className={styles.overview_value}>{country.population}</div>
                    <div className={styles.overview_label}>Population</div>
                </div>

                <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
                </div>


                </div>

            </div>
            </div>

            <div className={styles.container_right}>
            <div className={styles.overview_details}>
                <h4 className={styles.overview_details_heading}>Details</h4>

                <div className={styles.overview_details_row}>                
                    <div className={styles.overview_details_label}>Capital</div>
                    <div className={styles.overview_details_value}>{country.capital}</div>
                </div>

                <div className={styles.overview_details_row}>
                <div className={styles.overview_details_label}>Subregion</div>
                    <div className={styles.overview_details_value}>{country.subregion}</div>
                </div>

                <div className={styles.overview_details_row}>
                <div className={styles.overview_details_label}>Languages</div>
                    <div className={styles.overview_details_value}>
                        {country.languages.map(({name})=> name).join(',') }
                    </div>
                </div>

                <div className={styles.overview_details_row}>
                    <div className={styles.overview_details_label}>Currencies</div>
                    <div className={styles.overview_details_value}>
                    {country.currencies.map(({name})=> name).join(',') }
                    </div>
                </div>

                <div className={styles.overview_details_row}>
                    <div className={styles.overview_details_label}>Native name</div>
                    <div className={styles.overview_details_value}>{country.nativeName}</div>
                </div>

                <div className={styles.overview_details_row}>
                    <div className={styles.overview_details_label}>Gini</div>
                    <div className={styles.overview_details_value}>{country.gini} %</div>
                </div>       

                <div className={styles.overview_details_borders}>
                <div className={styles.overview_details_borders_label}>Neighbouring countries</div>

                
            { 
                
                borders.length === 0 ?
                  <p className={styles.not_found_country}>No Neighbouring countries Found</p>
                  :
              <div className={styles.overview_details_borders_container}>
               {borderBody}
              </div>
            
            }    

                
                    
                </div>         


            </div>
            </div>

            </div>

        </Layout>
    );

}


export default CountryPage;

export const getStaticPaths = async () => {
const rest = await fetch("https://restcountries.eu/rest/v2/all");
const contries = await rest.json();

const paths = contries.map(country => ({
params:{id:country.alpha3Code}
}));


return{
    paths,
    fallback:false
}

}


export const getStaticProps = async({params}) =>{
    
    const country = await getCountry(params.id);
    
    return{
      props:{
        country
      }
    }
    
    }