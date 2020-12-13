import styles from '../styles/Home.module.css';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import CountryTable from '../components/CountryTable/CountryTable';
import { useState } from 'react';

export default function Home({countries}) {

  const [keyword,SetKeyword]=useState('');


  const inputValueHandler = (e) => {
    e.preventDefault();
    SetKeyword(e.target.value.toLowerCase());

  }

  const filterCountry=countries.filter(country=>
    country.name.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
    )



  return (
      <Layout title="World App">
        <div className={styles.counts}>
          Found {filterCountry.length} Countries
          <SearchInput placeholder="Search by Country Name , Region or Subregion" onChange={inputValueHandler}/>
          <CountryTable countries={filterCountry}/>
        </div>
      </Layout>
  )
}


export const getStaticProps = async() =>{
const res = await fetch("https://restcountries.eu/rest/v2/all");
const countries = await res.json();


return{
  props:{
    countries
  }
}

}