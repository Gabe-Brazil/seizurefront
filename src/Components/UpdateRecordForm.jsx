import React, { useState } from "react";
import "./AddMixtureForm.css"; // Import CSS for styling the form
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import { updateRecord, deleteRecord } from "../API/Record";
import { compileRecord} from "../utils/functions";

function UpdateRecordForm({data,onClose,loadRecords}) {
  

 
    const [state, setState] = useState(data);
      

const handleSubmit = async(event) => {
    event.preventDefault();
    
    toast.promise(updateRecord(state.Id,compileRecord(state)), {
      loading: "Loading...",
      success: "Record Updated!",
      error: "Error updating record",
    }).then(()=>{
      loadRecords();
    })
    onClose();
  };

  const handleDelete = async (id) => {
      toast.promise(deleteRecord(id), {
        loading: "Deleting...",
        success: "Record deleted!",
        error: "Error deleting record",
      }).then(()=>{
        loadRecords();
      })
      onClose();
  };

  return (
    <Form className="add-event-form" onSubmit={handleSubmit}>
      <div className="form-container">
        <h3 className="Auth-form-title">Update or Delete Record</h3>
        
          <Form.Group controlId="date">
            <Form.Label>Date of Seizure</Form.Label>
            <Form.Control
              type="date"
              value={state.date}
              onChange={(e) =>
                setState({ ...state, date: e.target.value })
              }
            />
          </Form.Group>
          
          <Form.Label> Time of Seizure </Form.Label>
            <div className="time-input">
            <Form.Control
                name="hours"
                value={state.hours}
                type="text"
                className="time-input__hour"
                onChange={(e) =>
                    setState({ ...state, hours: e.target.value })
                  }
            />

            <span className="time-input__separator">:</span>

            <Form.Control
                name="mins"
                type="text"
                value={state.mins}
                onChange={(e) =>
                    setState({ ...state, mins: e.target.value })
                  }
                className="time-input__minute"
            />
            <span style={{ width: "150%" }} />
            <Form.Select
                name="dayTime"
                value={state.dayTime}
                onChange={(e) =>
                    setState({ ...state, dayTime: e.target.value })
                  }                
                className="time-input__ampm"
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </Form.Select>
            </div>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Length of Seizure </Form.Label>
            <div className="time-input">
            <Form.Control
                as="input"
                name="duration"
                value={state.duration}
                placeholder="minutes"
                onChange={(e) =>
                setState({ ...state, duration: e.target.value })
              }
            />
            <span style={{ width: "150%" }} />
            <Form.Control
                as="input"
                name="durationseconds"
                value={state.durationseconds}
                placeholder="seconds"
                onChange={(e) =>
                    setState({ ...state, durationseconds: e.target.value })
                  }
            />
        </div>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label> Features </Form.Label>
          <Form.Control
            as="input"
            name="features"
            value={state.features}
            onChange={(e) =>
                setState({ ...state, features: e.target.value })
              }
            placeholder="Anything notable about seizure"
            className="features"
          />
        </Form.Group>

        <Form.Label> Type of Seizure </Form.Label>
        <div className="type-input">
          <Form.Select
            name="type"
            value={state.type}
            onChange={(e) =>
                setState({ ...state, type: e.target.value })
              }
            className="type-input__ampm"
          >
            <option value="Absence">Absence (staring)</option>
            <option value="Tonic">Tonic (stiffening)</option>
            <option value="Tonic_Clonic">Tonic Clonic (shaking and stiffening)</option>
            <option value="Shaking">Shaking</option>
            <option value="Staring/Jerking/Blinking">Staring with Jerking and or/blinking</option>
            <option value="Focal">Focal</option>
            <option value="Other">Other</option>
          </Form.Select>
          
         <br/>
         <br/>
          
          <Button type="submit" variant="primary" style={{ marginRight: "2%" }}>
            Update Record
          </Button>
          <Button type="delete" onClick={() => handleDelete(state.Id)} variant="danger" style={{ marginRight: "2%" }}>
            Delete Record
          </Button>
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
        
         </div>
      </div>
    </Form>
    
  );
}

export default UpdateRecordForm;
