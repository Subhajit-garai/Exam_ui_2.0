import { Button } from "@repo/ui/button";
import {  Card } from "@repo/design-system/card";
import { BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import {useIsMobile} from "@repo/hooks/isMobile"

const ExamSubmitSuccess = () => {

let ismobile = useIsMobile()

  return (
    <div className='flex  h-fit justify-center p-4  '>

        <Card className=' md:min-w-[25rem] gap-4 p-4  '>
                <div className="submit-logo flex items-center justify-center">
                    <BadgeCheck size={40} colorProfile={12} color='green'/>
                    {/* <CheckCircleIcon size={40} colorProfile={12} color='green'/> */}
                </div>

                <div className="examInfo">
                    <h4 className='text-center font-bold text-blue-300'>Exam Submitted Successfully</h4>
                    <div className="info">
                        {/* <List>
                            <p>ajkdakj</p>
                            <p>ajkdakj</p>
                            <p>ajkdakj</p>
                        </List> */}
                        
                    </div>

                </div>

                <div className="actinbtn flex gap-1 md:gap-2 justify-center">
                    <Link to={"/home"} ><Button size={ismobile?"sm" : "default" }>Home</Button></Link>
                    <Link to={"/exam "}><Button size={ismobile?"sm" : "default" }>Exam</Button></Link>
                    <Link to={"/quiz"}><Button size={ismobile?"sm" : "default" }>Quiz</Button></Link>
                    <Link to={"/performance/overview"}><Button size={ismobile?"sm" : "default" }>Performance</Button></Link>
                </div>
        </Card>
    </div>
  )
}

export default ExamSubmitSuccess
