import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import { connect} from 'react-redux'
import * as actions from '../../../actions/index'
import RentalManageCard from './rentalManageCard.jsx'
import RentalBookingList from './rentalBookingList.jsx'
import { ToastContainer, toast } from 'react-toastify';

 class RentalManager  extends Component {

  state = {
    userRentals: [],
    errors: [],
    isFetching: false
  }
    componentDidMount() {
      this.setState({isFetching: true});

      actions.getUserRentalsPromise().then(
        userRentals => this.setState({userRentals, isFetching: false}),
        errors => this.setState({errors, isFetching: false}))
    }
    renderUserRentalCard =(userRentals) => {
        // return null;
        return userRentals.map((rental, index)=> 
      <RentalManageCard 
       modal={<RentalBookingList bookings={rental.bookings} />}
       key={index}
        rental={rental}
        rentalIndex={index}
        deleteRentalCb={this.deleteRental}
        />
        )

}

deleteRental = (rentalId, rentalIndex) => {
    actions.deleteRental(rentalId).then(
      () => this.deleteRentalFromList(rentalIndex),         
      errors => toast.error(errors[0].detail))
    
}

deleteRentalFromList = (rentalIndex) => {
  const userRentals = this.state.userRentals.slice();
  userRentals.splice(rentalIndex, 1);

  this.setState({
    userRentals
  });

  toast.success('successfully deleted rental')
 
}



    render() {
         const {userRentals, isFetching, isDeleted} = this.state;

        
        
         
         if(!isFetching)
         {
        return (
            <section id="userRentals">
            <ToastContainer />
        <h1 className="page-title">My Rentals</h1>
        <div className="row">
          {userRentals && this.renderUserRentalCard(userRentals)}
          {userRentals.length === 0 && <div className="alert alert-warning">
            You dont have any rentals currenty created. If you want advertised your property
            please follow this link.
            <Link style={{'marginLeft': '10px'}} className="btn btn-bwm" to="/rentals/create">Register Rental</Link>
          </div>}
        </div>
      </section>
        )
    }
         else {
             return <p>Loading...</p>
         }
    }
}

// const mapStateToProps = (state) =>
// {
//     return {
//         userRental:state.userRental
         
//     }

// }


export default RentalManager;