import InputForm from "../Components/InputForm"
import Panicbutton from "../Components/Panicbutton"
import Panicbuttonconfigure from "../Components/Panicbuttonconfigure"
import "../App.css" 
function InputBoard() {
    return (
    <div className='anim_gradient'>
      <div className="input-board-container">
        <div className="ib-left-side">
          <Panicbutton />
          <Panicbuttonconfigure />
        </div>
          <div className="ib-right-side">
            <InputForm />
          </div>
      </div>
    </div>
    );
  }

export default InputBoard