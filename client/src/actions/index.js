import axios from 'axios'

import {FETCH_RENTALS,FETCH_RENTAL_BY_ID_SUCCESS} from './types'

const rentals = [{
    id: 1,
    title: "Central Apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
  },
  {
    id: 2,
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: 3,
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 334,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: 4,
    title: "Central Apartment 4",
    city: "Berlin",
    street: "Haupt strasse",
    category: "house",
    image: "http://via.placeholder.com/350x250", 
    bedrooms: 9,
    description: "Very nice apartment",
    dailyRate: 33,
    shared: true,
    createdAt: "24/12/2017"
}]


export const fetchRentals = () => {
     return {
         type:'FETCH_RENTALS',
         rentals
      }
 }

 
 const fetchRentalByIdSuccess = (rental) => { 
     console.log('the data', rental);
       return {
            type:FETCH_RENTAL_BY_ID_SUCCESS,
            rental
       }
}
 


 export const fetchRentalById = (rentalId) => {
//   console.log(rentalId)
 return function(dispatch) {
    setTimeout(() => { 
        const rental = rentals.find((rental) => rental.id == rentalId )
        // console.log('rental action', rental);
        dispatch(fetchRentalByIdSuccess(rental))
      },5000)    
 }
  
//   console.log('selected data',rental)
    
  }

  // Auth action 

  export const register = (userData) => {
    // return axios.post('/api/v1/users/register', userData).then(
    //   res => res.data,
    //   err => Promise.reject(err.response.data.errors)
    // )

    return axios.post('/api/v1/users/register',{...userData}).then(
      (res) => {
        return res.data
       },

       (err) => {
       return Promise.reject(err.response.data.errors)
       }
    )


  }
