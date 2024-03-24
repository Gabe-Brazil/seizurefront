import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { addRecord } from "../API/Record";
import { toast } from "react-hot-toast";
import { compileRecord } from "../utils/functions";

const initialState = { // make it the current time if current time setting is enabled
  duration: "",
  hours: "",
  mins: "",
  dayTime: "AM",
  type: "Tonic",
  date: "",
  features: "",
  fromPanic: 'false'
};

function InputForm() {
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    let val = event.target.value;
    let len = val.length;
    if (event.target.name === "duration") {
      if (len > 2) {
        return;
      }
      let charCode = val.charCodeAt(len - 1);
      if (charCode < "0".charCodeAt(0) || charCode > "9".charCodeAt(0)) {
        return;
      }
    }
    if (event.target.name === "hours") {
      if (len > 2) {
        return;
      }
      let charCode = val.charCodeAt(len - 1);
      if (charCode < "0".charCodeAt(0) || charCode > "9".charCodeAt(0)) {
        return;
      }
      if (val > 12) {
        return;
      }
    }
    if (event.target.name === "mins") {
      if (len > 2) {
        return;
      }
      let charCode = val.charCodeAt(len - 1);
      if (charCode < "0".charCodeAt(0) || charCode > "9".charCodeAt(0)) {
        return;
      }
      if (val > 59) {
        return;
      }
    }

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (state["duration"] === "") {
      toast.error("Duration Empty.");
      return;
    } else if (state["hours"] === "") {
      toast.error("Hours Field Empty.");
      return;
    } else if (state["mins"] === "") {
      toast.error("Minutes Field Empty.");
      return;
    }

    //add more validations
    // FIX DATE PROCESSING
    
    toast.promise(addRecord(compileRecord(state)), {
      loading: "Loading",
      success: "Submitted!",
      error: "Error when submitting",
    });
  };

  /*do validation before submission*/

  return (
    <div>
      <h1>Record a Seizure</h1>
      <Form style={{ width: "300px" }} onSubmit={handleSubmit}>
        <Form.Label> Date of Seizure </Form.Label>
        <Form.Control
          name="date"
          onInput={handleChange}
          value={state.date}
          type="date"
        />

        <Form.Label> Time of Seizure </Form.Label>
        <div className="time-input">
          <Form.Control
            name="hours"
            onInput={handleChange}
            value={state.hours}
            type="text"
            className="time-input__hour"
          />

          <span className="time-input__separator">:</span>

          <Form.Control
            name="mins"
            type="text"
            value={state.mins}
            onInput={handleChange}
            className="time-input__minute"
          />
          <span style={{ width: "150%" }} />
          <Form.Select
            name="dayTime"
            value={state.dayTime}
            onChange={handleChange}
            className="time-input__ampm"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </Form.Select>
        </div>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label> Length of Seizure </Form.Label>
          <Form.Control
            as="input"
            name="duration"
            value={state.duration}
            onInput={handleChange}
            placeholder="Duration (in minutes)"
            className="duration"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label> Features </Form.Label>
          <Form.Control
            as="input"
            name="features"
            value={state.features}
            onInput={handleChange}
            placeholder="Anything notable about seizure"
            className="features"
          />
        </Form.Group>

        <Form.Label> Type of Seizure </Form.Label>
        <div className="type-input">
          <Form.Select
            name="type"
            value={state.seizureType}
            onChange={handleChange}
            className="type-input__ampm"
          >
            <option value="Tonic">Tonic Seizure</option>
            <option value="Tonic_Clonic">Tonic Clonic Seizure</option>
            <option value="Focal">Focal Seizure</option>
            <option value="Other">Other</option>
          </Form.Select>
        </div>

        <br />

        <div style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default InputForm;
