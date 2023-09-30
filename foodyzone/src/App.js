import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import SearchResults from './components/SearchResults';


// import "./App.css"
export const BASE_URL = "http://localhost:9000"
function App() {

  const [data,setData] = useState(null);
  const[filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState('all')

   useEffect(()=>{
    const fetchFoodData = async () =>{

      setLoading(true);
      try{
        const reponse = await fetch(BASE_URL);
     
        const json = await reponse.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
        
  
      }
      catch(error){
        setError("unaable to fetch data");
      }
    };
    fetchFoodData();
   },[])
  console.log(data);


   //fetchFoodData();

   const searchFood = (e) =>{
    const searchValue = e.target.value;

    console.log(searchValue);

    if(searchValue === ""){
      setFilteredData(null);
    }

    const filter = data.filter((food) =>
    // food.name.toLowerCase().include(searchValue.toLowerCase()));
    food.name.toLowerCase().includes(searchValue.toLowerCase()));

    console.log(filter);
   
    setFilteredData(filter);
  } 

  const filterFood= (type) =>{
    if(type === "all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data.filter((food) =>
    food.type.toLowerCase().includes(type.toLowerCase()));

    setFilteredData(filter);
    setSelectedBtn(type);
  };

const filterBtns=[
  {
    name:"ALL",
    type:"all",
  },
  {
    name:"Breakfast",
    type:"breakfast",
  },
  {
    name:"Lunch",
    type:"lunch",
  },
  {
    name:"Dinner",
    type:"dinner",
  },
];

   if(error) return <div>{error}</div>;
   if(loading) return <div>Loading</div>
  
  return (<>
   <Container>
     <TopContainer>
         <div className='logo'>
           <img src='/logo.svg' alt='' />
         </div>

        <div className='search'>
           {/* <input onChange={()=>searchFood()} placeholder='search food' /> */}
           <input onChange={searchFood} placeholder='search food' />

        </div>  
     </TopContainer>
  
     <FilterContainer>

       {
        filterBtns.map((value) =>(
          <Button isSelected={selectedBtn === value.type} key= {value.name} onClick={()=>filterFood(value.type)}>
            {value.name}
            </Button>
        ))
       }

     </FilterContainer>
   </Container>
   <SearchResults data={filteredData} />
  </>
  
  );
}

export default App;

const Container = styled.div`
max-width: 1200px;
margin: 0 auto;
` ;
const TopContainer = styled.section`
height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;

.search {
  input {
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    &::placeholder {
      color: white;
    }
  }

  @media(0 < width < 600px){
    flex-direction:column;
    height: 120px;
    // background-color:red;
  }
}

`;

 const FilterContainer =styled.section `
  display:flex;
  justify-content:center;
  align-items:center;
  gap:12px;
  padding-bottom:40px;
`;


export const Button = styled.button `
   background:${({isSelected})=>(isSelected)? "#f22f2f": "#ff4343"};
   outline:1px solid ${({isSelected})=>(isSelected)? "#fff": "#ff4343"};
   border-radius:5px;
   padding:6px 12px;
   border:none;
   color:#fff;
   cursor:pointer;
   &:hover{
    background-color:#f22f2f;
   }
   
   `;

 



