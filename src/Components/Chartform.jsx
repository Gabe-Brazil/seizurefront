import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStamp } from '@fortawesome/free-solid-svg-icons'; // Import the fa-stamp icon
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { updateSettings } from "../API/Settings";
import { toast } from 'react-hot-toast'


function Chartform({params,setParams}){

const handleDateUpdate=async()=>{
  toast.promise(updateSettings({defaultStartDate:params.start_date,defaultEndDate:params.end_date}), {
    loading: "Loading",
    success: "Dates Saved!",
    error: "Error when saving dates", 
  })
}
    return  <Form style={{ width: "300px" }}>

      <div style={{display:"flex",alignItems:"center",justifyContent:"stretch",gap:"15px"}}>
        <div>
    <Form.Label> Start Date </Form.Label>
    <Form.Control
      name="date"
      value={params.start_date}
      type="date"
      onChange={(e) => {
        setParams({
          ...params,
          start_date: e.target.value,
        });
      }}
    />

    <Form.Label > End Date </Form.Label>
    <Form.Control
      name="date"
      value={params.end_date}
      type="date"
      onChange={(e) => {
        setParams({
          ...params,
          end_date: e.target.value,
        });
      }}
    />
</div>
<OverlayTrigger
         
          key={"right"}
          placement={"right"}
          overlay={
            <Popover id={`popover-positioned-${"right"}`}>
              <Popover.Body>
                Save dates as default
              </Popover.Body>
            </Popover>
          }
        >
            <FontAwesomeIcon onClick={handleDateUpdate} style={{ cursor:"pointer", color:"rgb(20,20,20)"}} className="save-default-date"  fontSize={30} icon={faStamp} />
        </OverlayTrigger>

</div>

    <Form.Label> What are you looking for? </Form.Label>
    <Form.Select
      onChange={(e) => {
        setParams({
          ...params,
          mode: e.target.value,
        });
      }}
      aria-label="Default select example"
      name="mode"
    >
      <option value='1'>Average Length of Seizure per day</option>
      <option value='2'>Number of Seizures per Day</option>
    </Form.Select>
  </Form>
}

export default Chartform