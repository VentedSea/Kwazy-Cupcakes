import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import myImage from './images/cupcake.png';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.monthYear),
    datasets: [
      {
        label: 'Total',
        data: data.map(item => item.total),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Month-Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total',
        },
      },
    },
  };
  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};


//<! --className="App-logo"!>
function App() {
  const [jsonContact, setJsonContact] = useState([]);
  const [jsonInvoice, setJsonInvoice] = useState([]);
  const [refreshCon, setRefreshCon] = useState(false);
  const [refreshInv, setRefreshInv] = useState(false);
  const [jsonPayment, setJsonPayment] = useState([]);
  const [refreshPay, setRefreshPay] = useState(false);
  const [jsonItem, setJsonItem] = useState([]);
  const [refreshItem, setRefreshItem] = useState(false);

  const [totalInv, setTotalInv] = useState([0]);
  const [totalPay, setTotalPay] = useState([0]);

  function handleClickContacts() {
    const url = 'https://hackathon.syftanalytics.com/api/contacts';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => console.log(data))
      //.then(data => setJsonData(data))
      .catch(error => console.error("Error:", error));
  }

  function handleClickItems() {
    const url = 'https://hackathon.syftanalytics.com/api/item';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error:", error));
  }
  function handleClickInvoice() {
    const url = 'https://hackathon.syftanalytics.com/api/invoice';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error:", error));
  }

  function handleClickInvoiceLines() {
    const url = 'https://hackathon.syftanalytics.com/api/invoice-lines';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error:", error));
  }
  function handleClickPayments() {
    const url = 'https://hackathon.syftanalytics.com/api/payment';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error:", error));
  }
  function handleClickPaymentAllocations() {
    const url = 'https://hackathon.syftanalytics.com/api/payment-allocations';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error:", error));
  }
  //contacts
  useEffect(() => {
    const url = 'https://hackathon.syftanalytics.com/api/contacts';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setJsonContact(data);
        //
      })
      .catch(error => console.error("Error:", error));
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    //console.log('json',jsonContact); // This will log the updated state
    
    //console.log('!isArray',!Array.isArray(jsonContact))
    if (!Array.isArray(jsonContact)){
      //console.log("set to true");
      setRefreshCon(true);
      
      //console.log('jsonContact[data]',jsonContact['data']);;
    }
     
  }, [jsonContact]);


  useEffect(() => {
    const url = 'https://hackathon.syftanalytics.com/api/invoice';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setJsonInvoice(data);
        //
      })
      .catch(error => console.error("Error:", error));
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    //console.log('json',jsonContact); // This will log the updated state
    
    //console.log('!isArray',!Array.isArray(jsonContact))
    if (!Array.isArray(jsonInvoice)){
      //console.log("set to true");
      setRefreshInv(true);
      //console.log('json[data]',jsonInvoice['data']);;
    }
     
  }, [jsonInvoice]);

  //payments
  useEffect(() => {
    const url = 'https://hackathon.syftanalytics.com/api/payment';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setJsonPayment(data);
        //
      })
      .catch(error => console.error("Error:", error));
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    //console.log('json',jsonContact); // This will log the updated state
    
    //console.log('!isArray',!Array.isArray(jsonContact))
    if (!Array.isArray(jsonPayment)){
      //console.log("set to true");
      setRefreshPay(true);
      //console.log('jsonpayment[data]',jsonPayment['data']);;
    }
     
  }, [jsonPayment]);

  useEffect(() => {
    const url = 'https://hackathon.syftanalytics.com/api/item';
    const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";

    const headers = {
      'x-api-key': apiKey
    };

    fetch(url, { headers })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setJsonItem(data);
        //
      })
      .catch(error => console.error("Error:", error));
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    //console.log('json',jsonContact); // This will log the updated state
    
    //console.log('!isArray',!Array.isArray(jsonContact))
    if (!Array.isArray(jsonItem)){
      console.log("set to true");
      setRefreshItem(true);
      //console.log('jsonpayment[data]',jsonPayment['data']);;
    }
     
  }, [jsonItem]);

  
  const groupInvoicesByMonth = () => {
    const monthTotals = {};
    var totalinv=0;
    jsonInvoice['data'].forEach((invoice) => {
      const dueDate = new Date(invoice.due_date);
      const monthYear = `${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
      const exchange = parseFloat(invoice.exchange_rate);
      const total = parseFloat(invoice.total)/exchange;
      //console.log('invoice.total:',invoice.total);
      //console.log('invoice.exchange_rate:',invoice.exchange_rate);
      //console.log('total:',total);
      totalinv+=total;
      if (monthTotals[monthYear]) {
        monthTotals[monthYear].total += total;
      } else {
        monthTotals[monthYear] = {
          monthYear,
          total,
        };
      }
    });
    // Convert the grouped data object to an array
    const groupedData = Object.values(monthTotals);
    //setTotalInv(totalinv);
    return [groupedData,totalinv];
  };

  //Payments
  const groupPaymentsByMonth = () => {
    const monthTotals = {};
    var totalpay=0;
    //console.log(jsonPayment['data'])
    jsonPayment['data'].forEach((payment) => {
      const dueDate = new Date(payment.date);
      const monthYear = `${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
      const exchange = parseFloat(payment.exchange_rate);
      const total = parseFloat(payment.total)/exchange; 
      totalpay+=total;
      if (monthTotals[monthYear]) {
        monthTotals[monthYear].total += total;
      } else {
        monthTotals[monthYear] = {
          monthYear,
          total,
        };
      }
    });

    // Convert the grouped data object to an array
    const groupedData = Object.values(monthTotals);
    //setTotalPay(totalpay);
    return [groupedData,totalpay];
  };

  

  if (refreshCon==false || refreshInv==false || refreshPay==false ||refreshItem==false){
    
    return(
      <div className="App" >
         <header className="App-load">
         <p>J's Cupcakes<br></br>Loading</p>
         <img src={myImage} className="App-logo" alt="logo" />
         </header>
      </div>
    )
  }

  else{
    const getInvData=groupInvoicesByMonth();
    const groupedInvoices = getInvData[0];
    const finalInvTotal=getInvData[1];
    const getPayData=groupPaymentsByMonth();
    const groupedPayments = getPayData[0];
    const finalPayTotal=getPayData[1];
    //console.log(groupedInvoices);

    const sortedGroupedInvoices = groupedInvoices.sort((a, b) => {
      const [aMonth, aYear] = a.monthYear.split('-');
      const [bMonth, bYear] = b.monthYear.split('-');
      
      // Compare years first
      if (aYear !== bYear) {
        return aYear - bYear;
      }
      
      // If years are the same, compare months
      return aMonth - bMonth;
    });
    //console.log(sortedGroupedInvoices)

    const sortedGroupedPayments = groupedPayments.sort((a, b) => {
      const [aMonth, aYear] = a.monthYear.split('-');
      const [bMonth, bYear] = b.monthYear.split('-');
      
      // Compare years first
      if (aYear !== bYear) {
        return aYear - bYear;
      }
      
      // If years are the same, compare months
      return aMonth - bMonth;
    });
    //console.log('sortedGroupedPayments',sortedGroupedPayments)

    const customers = jsonContact['data'].filter(contact => contact.is_customer);
    const suppliers = jsonContact['data'].filter(contact => contact.is_supplier);
    const others = jsonContact['data'].filter(contact => !contact.is_customer && !contact.is_supplier);

    const Items = jsonItem['data'];
    const listInvoices=jsonInvoice['data'];

    return (
      <div className="App" >
        <title>This App</title>
        <header className="App-header">
        <button onClick={handleClickContacts}>Contacts</button>
        <button onClick={handleClickItems}>items</button>
        <button onClick={handleClickInvoice}>invoice</button>
        <button onClick={handleClickInvoiceLines}>invoice-lines</button>
        <button onClick={handleClickPayments}>payments</button>
        <button onClick={handleClickPaymentAllocations}>payment allocations</button>
          <h1>J's Cupcakes</h1>
        </header>
        <body className="App-body">
          <div className="containerUpper">
            <h1>Dashboard</h1>
            <div className="container">

              <div className="box">
                <h2>Monthly Invoice Totals</h2>
                <p>Total Invoices: {Math.round(finalInvTotal)}</p>
                <div className="graph-div">
                  <LineChart   data={sortedGroupedInvoices} />
                  </div>
              </div>
              
              <div className="box">
                {//<button onClick={handleClickContacts}>Contacts</button>
                //<button onClick={handleClickItems}>items</button>
                //<button onClick={handleClickInvoice}>invoice</button>
                //<button onClick={handleClickInvoiceLines}>invoice-lines</button>
                //<button onClick={handleClickPayments}>payments</button>
                //<button onClick={handleClickPaymentAllocations}>payment allocations</button>
                }
                <h2>Monthly Payments Totals</h2>
                <p>Total Payments: {Math.round(finalPayTotal)}</p>
                <div className="graph-div">
                  <LineChart   data={sortedGroupedPayments} />
                </div>
              </div>
            </div>
            <hr className="horiLine"></hr>
            <div className="boxContact">
              <div className="spacer">
                <h3>Invoices</h3>
                <div className="invtags">
                  <ul>
                    {listInvoices.map((list) => (
                      <li >{list.contact_id}     {Math.round(list.total)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <hr className="horiLine"></hr> 
            <div className="boxContact">
              <div className="spacer">
                <h3>Products</h3>
                <div className="tags">
                  <ul>
                    {Items.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <hr className="horiLine"></hr>            
            <div className="boxContact">
              <div className="spacer">
                <h3>Customer Contacts</h3>
                <div className="tags">
                  <ul>
                    {customers.map((contact) => (
                      <li key={contact.id}>{contact.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <hr className="vertLine"></hr>
              <div className="spacer">
                <h3>Supplier Contacts</h3>
                <div className="tags">
                  <ul>
                    {suppliers.map((contact) => (
                      <li key={contact.id}>{contact.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <hr className="vertLine"></hr>
              <div className="spacer">
                <h3>Other Contacts</h3>
                <div className="tags">
                  <ul>
                    {others.map((contact) => (
                      <li key={contact.id}>{contact.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
