import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

function FetchData() {
  const [trips, setTrips] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [followId, setFollowID] = useState('')

  useEffect(() => {
    async function fetchTrips() {
      try {
        setIsLoading(true)
        const res = await axios.get('http://localhost:4000')
        setIsLoading(false)
        setErrors('')
        setTrips(res.data)
      } catch (error) {
        setIsLoading(false)
        setErrors(error.message)
        setTrips([])
      }
    }
    fetchTrips()
  }, [])

  const handleFollow = async (event) => {
    event.preventDefault();
      try {
        const webToken = Cookies.get('webToken')
        let TripId = followId
        let dataToSend = `${webToken} follow ${TripId}`
        const userID = Cookies.get('userID');
        const res = await axios.patch(`http://localhost:4000/${userID}`, dataToSend);
        let data = res.data
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
  }

  const handleDeleteFromFollow = async (event) => {
    event.preventDefault();
      try {
        const webToken = Cookies.get('webToken')
        let TripId = followId
        let dataToSend = `${webToken} delete ${TripId}`
        const userID = Cookies.get('userID');
        const res = await axios.patch(`http://localhost:4000/${userID}`, dataToSend);
        let data = res.data
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
  }

  return (
    <div className='table1'>
      <div>{isLoading && 'Loading...'}</div>
      <div>{errors}</div>
      
        {trips.map((trip) => (
          <div className="padding-20 card" style={{ width: '300px', height: '450px' }} key={trip.id}>
            <button className="btn-close" aria-label="Close" onClick={handleDeleteFromFollow}></button> 
            <div>Trip Name: {trip.trip_name}</div>
            <div>Trip Info: {trip.trip_info}</div>
            <div>Destination: {trip.destination}</div>
            <img src={trip.pic} alt="trip" style={{ width: '300px', height: '220px' }}/>
            <div>start date: {trip.start_date}</div>
            <div>end date: {trip.end_date}</div>
            <div>Price: {trip.price}</div>
            <div>Number of Followers: {trip.followers}</div>
             <button className='btn btn-primary' onClick={handleFollow}>Follow</button>
          </div>
        ))}
      
    </div>
  )
}

export default FetchData
