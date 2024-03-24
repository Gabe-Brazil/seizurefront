import React, { useState } from "react";
import "./AddMixtureForm.css"; // Import CSS for styling the form
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import { addMixturesWithComponents } from "../API/Mixture";

function AddMixtureForm({ onClose, selectedStartDate, selectedEndDate }) {
  const [formData, setFormData] = useState({
    start_date: selectedStartDate || "",
    end_date: selectedEndDate || "",
    color: "#000000",
    components: [{ id: 1, medication: "A", dosage: 10 }],
  });

  const handleInputChange = (id, key, value) => {
    const updatedMedications = formData.components.map((medication) => {
      if (medication.id === id) {
        return { ...medication, [key]: value };
      }
      return medication;
    });
    console.log(formData);
    setFormData({
      ...formData,
      components: updatedMedications,
    });
  };

  const handleAddMedication = () => {
    const newId =
      formData.components.length > 0
        ? formData.components[formData.components.length - 1].id + 1
        : 1;
    setFormData({
      ...formData,
      components: [
        ...formData.components,
        { id: newId, medication: "", dosage: 10 },
      ],
    });
  };

  const handleDeleteMedication = (id) => {
    const updatedMedications = formData.components.filter(
      (medication) => medication.id !== id
    );
    setFormData({
      ...formData,
      components: updatedMedications,
    });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    toast.promise(addMixturesWithComponents(formData), {
      loading: "Loading",
      success: "Submitted!",
      error: "Error when submitting",
    }); 
    onClose();
  };

  return (
    <Form className="add-event-form" onSubmit={handleSubmit}>
      <div className="form-container">
        <h3 className="Auth-form-title">Add Medications over Selection</h3>
        
          <Form.Group controlId="start_date">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="end_date">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="color">
            <Form.Label>Color</Form.Label>
            <Form.Control
              style={{ marginLeft: "auto", marginRight: "auto" }}
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="components">
            <Form.Label>Medications</Form.Label>
            <div className="medication-list">
              <Button variant="secondary" onClick={handleAddMedication}>
                Add Medication
              </Button>
              <div className="medication-scroll">
                {formData.components.map((medication) => (
                  <div key={medication.id} className="medication-item">
                    <Form.Control
                      as="select"
                      value={medication.medication}
                      onChange={(e) =>
                        handleInputChange(
                          medication.id,
                          "medication",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Medication</option>
                      <option value="Medication A">Medication A</option>
                      <option value="Medication B">Medication B</option>
                      <option value="Medication C">Medication C</option>
                      {/* Add more options as needed */}
                    </Form.Control>
                    <Form.Control
                      type="number"
                      value={medication.dosage}
                      onChange={(e) =>
                        handleInputChange(
                          medication.id,
                          "dosage",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteMedication(medication.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>
          <Button type="submit" variant="primary" style={{ marginRight: "2%" }}>
            Add
          </Button>
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
        
      </div>
    </Form>
  );
}

export default AddMixtureForm;
