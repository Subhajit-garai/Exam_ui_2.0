import { Button } from "@repo/ui/button";
import  { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useApi } from '@/ApiProvider'

const PaymentSuccess = () => {
  let [serchParums] = useSearchParams()
  let reference =serchParums.get("reference")
  const dispatch = useDispatch()  
  const navigate = useNavigate()  
  const _ = useApi()  

  useEffect(()=>{
    _.api.user.fetchuser(dispatch);
  },[])
return (
  <div className=' flex flex-col gap-8 items-center justify-center'>
    <h2>-- : PaymentSuccess : -- </h2>
    <h3 className=' font-sans font-bold'>Payment Completed Successfully</h3>
    <p>{reference}</p>
    <Button onClick={() =>   _.api.user.fetchuser(dispatch)}> Refreash Balance</Button>
    <Button  color= 'blue'onClick={() => navigate('/')}> Go to Home Page</Button>
    <Button color='success' onClick={() => navigate("/exam/join")}> Go to Exam Page</Button>
  </div>
)
}
export default PaymentSuccess
