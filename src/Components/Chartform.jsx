import Form from "react-bootstrap/Form";



function Chartform({params,setParams}){

    return  <Form style={{ width: "300px" }}>
    <Form.Label> Start Date </Form.Label>
    <Form.Control
      name="date"
      value={params.startdate}
      type="date"
      onChange={(e) => {
        setParams({
          ...params,
          startdate: e.target.value,
        });
      }}
    />

    <Form.Label> Domain </Form.Label>
    <Form.Select
      onChange={(e) => {
        setParams({
          ...params,
          domain: e.target.value,
        });
      }}
      aria-label="Default select example"
      name="domain"
    >
      <option value="YEAR">Year</option>
      <option value="MONTH">Month</option>
    </Form.Select>

    <Form.Label> What are you looking for? </Form.Label>
    <Form.Select
      onChange={(e) => {
        console.log(e.target.value);
        setParams({
          ...params,
          mode: e.target.value,
        });
      }}
      aria-label="Default select example"
      name="mode"
    >
      <option value="1">Average Length of Seizure per day (mins)</option>
      <option value="2">Number of Seizures per Day</option>
    </Form.Select>
  </Form>
}

export default Chartform