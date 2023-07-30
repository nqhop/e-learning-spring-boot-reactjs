import { PayPalButtons} from '@paypal/react-paypal-js'
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {  clearCart,getTotals } from 'features/cartSlice'
import { selectCurrentUser } from "features/auth/authSlice";
import { BASE_URL } from "url/url";




const PaypalCheckoutButton = (props) => {
    const user = useSelector(selectCurrentUser)
    const liveCart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/admin/courses`)
      .then((res) => res.json())
      .then((result) => {
        setCourses(result);
      });
  }, []);

    useEffect(() => {
        dispatch(getTotals());
    }, [liveCart, dispatch]);

    let courseAddToDb = ""
    let listCourseToAddEmail = []
    liveCart.cartItem?.map(item => {
        listCourseToAddEmail.push(item.courseId)
        courseAddToDb += item.courseId
        courseAddToDb += ","

    })

    const { cart } = props;

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    
    // const addEmailToCourse = async (email) => {
    //     for(let i=0 ; i<listCourseToAddEmail.length;i++){
    //     try {
    //       const response = await axios.post(`/courses/${listCourseToAddEmail[i]}/add-email`, email);
    //       return response.data;
    //     } catch (error) {
    //       console.error('Error adding email to course:', error);
    //       throw error;
    //     }
    //   }};
      

    const handleApprove = (orderID, time, amount, status,user) =>{
        const orderSendToDb = {
             orderId : orderID,
             orderDate: time,
             amount:  amount,
             status: status,
             courses: courseAddToDb,
             userMail: user

          };
          console.log(orderSendToDb)

        

        axios({
            method: 'POST',
            url: `${BASE_URL}/admin/add-order`,
            headers: {
                'Content-Type': 'application/json',
                    },
            data: orderSendToDb,
        })
            .then(result => {
                console.log(orderSendToDb)
            })
            .catch(error => console.log(error))

            
          
        
        //if response is success
        setPaidFor(true);
        //refresh user's account or subscription status

        //if response is error
        //alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us for assistance")
            
        const url = "/home";

        // Navigate to the new page
        navigate(url);
    }

    

    if(paidFor){
        alert("Your payment was processed successfully")
    }



    if(error){
        alert("Error")
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    return <PayPalButtons 
            style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill"
            }}

            onClick={(data,actions) => {
                //Validate on button click, client or server side
                const hasAlreadyBoughtCourse = false;
                if(hasAlreadyBoughtCourse) {
                    setError("You already bought")

                    return actions.reject()
                } else {
                    return actions.resolve()
                }
            }}

            createOrder={(data,actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: "admin",
                            amount: {
                                value: liveCart.cartTotalAmount
                            }
                        }
                    ]
                })
            }}

            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log("order" , order);
                handleApprove(order.id, order.create_time, cart.price, order.status, user)
                handleClearCart()
                // addEmailToCourse(user)
            }}

            onCancel={() => {

            }}

            onError={(err) => {
                setError(err);
                console.error("Paypal checkout onError", err);
            }}
        />
};

export default PaypalCheckoutButton;