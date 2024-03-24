import { useState ,useEffect} from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Calendar.css';
import { getMixturesWithComponents } from '../API/Mixture'
import { loadCalendarStyles } from '../utils/functions';
import AddMixtureForm from './AddMixtureForm';

function CalendarComponent() {
  const [value, setValue] = useState(new Date());
  const [move,setMove]=useState(true)
  const [showForm, setShowForm] = useState(false);
  const handleDateChange = (newValue) => {
    setValue(newValue); // Update the state with the new value
    handlePlusButton();
  };
  const [Mixture, setMixture] = useState([]);
  const handlePlusButton = () => {
  //  if view = months
  
  setTimeout(()=>{
    
    let elements = document.querySelectorAll('.react-calendar__tile--active')
    //console.log(elements[0]);
    let element1 = elements[elements.length-1]
    let element2 = (elements[0])
    let y1= element1.getBoundingClientRect().top
    let y2= element2.getBoundingClientRect().top
    let y= ((y2+y1)/2)
  

    
    let box = document.getElementById("plus")
    box.style.left = "72%"
  box.style.top = y+"px"
  },20)
   
   

  };

  const onPlusClick = () => {
    setShowForm(true);

  };
  
  const setClass = (date) => {
    const match = Mixture.find((obj) => {
      const startDate = moment(obj.start_date);
      const endDate = moment(obj.end_date);
      return moment(date).isBetween(startDate, endDate, null, '[]'); // '[]' includes start and end dates
    });
    return match ? match.id : "";
  };

  const tileClassName = ({ date }) => {
    const id = setClass(date);
    return id ? `highlight${id}` : "";
  };
  
  const handleRefresh = () => {
    loadMixtures();
  };

  async function loadMixtures() {
    try {
      let result = await getMixturesWithComponents();
      setMixture((prevMixture) => {
        //console.log(result.mixturesWithComponents); // Check the updated data
        loadCalendarStyles(result.mixturesWithComponents);
        return result.mixturesWithComponents; // Update the state with the new data
      });
    } catch (error) {
      console.error('Error loading mixtures:', error);
    }
  };
    


  useEffect(() => {
      console.log(value)
      loadMixtures();
  },[move, showForm])



  return (
    <div>
      {showForm && <AddMixtureForm onClose={() => setShowForm(false)} selectedStartDate={moment(value[0]).format('YYYY-MM-DD')} selectedEndDate={moment(value[1]).format('YYYY-MM-DD') || moment(value[0]).format('YYYY-MM-DD')} />}
      <div id="tile" className="tile" style={{textAlign:"center"}}>Error Displaying Tile</div>

      <button onClick={onPlusClick} id="plus" style={{left: "72%",top: "5%",width: 40,height: 40,background: "black",position: "absolute",borderRadius: "50%",display: "flex",alignItems: "center",justifyContent: "center"}}> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 18.3333C5.54567 18.3333 1.66667 14.4543 1.66667 10C1.66667 5.54567 5.54567 1.66667 10 1.66667C14.4543 1.66667 18.3333 5.54567 18.3333 10C18.3333 14.4543 14.4543 18.3333 10 18.3333Z" fill="white"/>
<path d="M10 5.83333H9.16667V10.8333H5.83333V11.6667H9.16667V15H10.8333V11.6667H14.1667V10.8333H10.8333V5.83333H10Z" fill="white"/>
</svg>
 </button>

      <Calendar
        onChange={handleDateChange}
        value={value}
        selectRange={true}
        calendarType={"iso8601"}
        tileClassName={tileClassName}
        minDetail={'year'}

        onActiveStartDateChange={()=>{setMove(!move)}}
      />
      <button onClick={handleRefresh} style={{ marginTop: '10px' }}>
        Refresh Mixtures
      </button> 
      {/*<div>Selected Value: {value.toString()}</div>*/}
    </div>
  );
}

export default CalendarComponent;