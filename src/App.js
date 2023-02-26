
import './App.css';
// import { useRef } from 'react';
// import jsPDF from 'jspdf';
import Dashboard from './Dashboard';

function App() {
  // const reportTemplateRef = useRef(null);

  // const handleGeneratePdf = () => {
  //   const doc = new jsPDF({
  //     format: 'a4',
  //     unit: 'px',
  //   });

  //   doc.setFont('Inter-Regular', 'normal');
  //   doc.html(reportTemplateRef.current, {
  //       async callback(doc) {
  //       await doc.save('mortgage.pdf');
  //     },
  //   });
  // }
  return (
    <div className="App">
      {/* <button className='button' onClick={handleGeneratePdf}>
        Generate PDF
      </button> */}
      {/* <div ref={reportTemplateRef}> */}
        <Dashboard />
      {/* </div> */}
    </div>
  );
}

export default App;
