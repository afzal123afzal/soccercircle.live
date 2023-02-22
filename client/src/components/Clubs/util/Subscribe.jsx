import React from 'react'
import { axiosClubsInstance } from '../../../instance/Axios'
import { useSelector } from 'react-redux';


function Subscribe() {
  
    const club = useSelector((state) => state.club.clubDetails)
    const email = club.email
    const handleCheckout = async () => {
        console.log('payment success');
        try {
            const response = await axiosClubsInstance.post("/create-checkout-session", {
                email: email, membership: 'SC Membership'
            },
                { headers: { 'Authorization': `Bearer ${club.token}` } }
            )

            if (response.data.url) {
                window.location.href = response.data.url
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <>

            <button onClick={handleCheckout} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
                Subscribe
            </button>


        </>
    )
}

export default Subscribe