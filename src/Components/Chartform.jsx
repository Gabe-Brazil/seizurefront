import Form from "react-bootstrap/Form";



function Chartform({params,setParams}){

    return  <Form style={{ width: "300px" }}>
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

    <Form.Label> End Date </Form.Label>
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
      <option value='1'>Average Length of Seizure per day (mins)</option>
      <option value='2'>Number of Seizures per Day</option>
    </Form.Select>
  </Form>
}

export default Chartform