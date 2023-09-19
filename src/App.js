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


function CustomerList({ invoiceDictionary, customerIds }) {
  


  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [isListExpanded, setListExpanded] = useState(false);

  const handleCustomerSelect = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      // If the customer is already selected, remove them
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      // Otherwise, add the customer to the selected list
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };
  const toggleList = () => {
    setListExpanded(!isListExpanded);
  };

  const formatCurrency = (amount) => {
    return parseFloat(amount).toFixed(2);
  };

  const calculateTotal = (customerId) => {
    return invoiceDictionary[customerId].purchases.reduce(
      (total, purchase) => total + parseFloat(purchase.amount),
      0
    );
  };

  return (
    <div className="customerList">
      <h2>Customer Sales List</h2>
        <button onClick={toggleList}>
          {isListExpanded ? '-' : '+'}
        </button>
      
      {isListExpanded && (
        <ul className="customerList">
          {customerIds.map((customerId) => (
            <div key={customerId} className="customer-list">
              <h3 onClick={() => handleCustomerSelect(customerId)}>
                {invoiceDictionary[customerId].name}
              </h3>
              {selectedCustomers.includes(customerId) && (
                <ul className="purchase-list">
                  <li className="purchase-header">
                    <span>Date</span>
                    <span>Amount</span>
                  </li>
                  {invoiceDictionary[customerId].purchases.map((purchase, index) => (
                    <li key={index} className="purchase-item">
                      <span className="purchase-date">{purchase.date}</span>
                      <span className="purchase-amount">
                        R{formatCurrency(purchase.amount)}
                      </span>
                    </li>
                  ))}
                  <li className="purchase-item">
                    <span className="purchase-total-text">Total</span>
                    <span className="purchase-total-num">R{formatCurrency(calculateTotal(customerId))}</span>
                  </li>
                </ul>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

function ItemList({ itemDictionary, itemIds }) {
  


  const [selectedItem, setSelectedItem] = useState([]);
  const [isListExpanded, setListExpanded] = useState(false);

  const handleCustomerSelect = (itemId) => {
    if (selectedItem.includes(itemId)) {
      // If the customer is already selected, remove them
      setSelectedItem(selectedItem.filter((id) => id !== itemId));
    } else {
      // Otherwise, add the customer to the selected list
      setSelectedItem([...selectedItem, itemId]);
    }
  };
  const toggleList = () => {
    setListExpanded(!isListExpanded);
  };

  const formatCurrency = (amount) => {
    return parseFloat(amount).toFixed(2);
  };

  return (
    <div className="customerList">
      <h2>Item List</h2>
        <button onClick={toggleList}>
          {isListExpanded ? '-' : '+'}
        </button>
      
      {isListExpanded && (
        <ul className="customerList">
          {itemIds.map((itemId) => (
            <div key={itemId} className="customer-list">
              <h3 onClick={() => handleCustomerSelect(itemId)}>
                {itemDictionary[itemId].name}
              </h3>
              {selectedItem.includes(itemId) && (
                <ul className="purchase-list">
                  <li className="purchase-header">
                    <span>Quantity</span>
                    <span>Sale Price</span>
                  </li>
                  {itemDictionary[itemId].info.map((purchase, index) => (
                    <li key={index} className="purchase-item">
                      <span className="purchase-date">{purchase.quant}</span>
                      <span className="purchase-amount">
                        R{formatCurrency(purchase.cost)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, set_login] = useState(false);
  const [error, setError] = useState(false);
  
  const [jsonContact, setJsonContact] = useState([]);
  const [jsonInvoice, setJsonInvoice] = useState([]);
  const [refreshCon, setRefreshCon] = useState(false);
  const [refreshInv, setRefreshInv] = useState(false);
  const [jsonPayment, setJsonPayment] = useState([]);
  const [refreshPay, setRefreshPay] = useState(false);
  const [jsonItem, setJsonItem] = useState([]);
  const [refreshItem, setRefreshItem] = useState(false);
  const [jsonAlloc, setJsonAlloc] = useState([]);
  const [refreshAlloc, setRefreshAlloc] = useState(false);

  const [totalInv, setTotalInv] = useState([0]);
  const [totalPay, setTotalPay] = useState([0]);

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
  
      useEffect(() => {
        const url = 'https://hackathon.syftanalytics.com/api/payment-allocations';
        const apiKey = "e6506999-8738-4866-a13f-2a2cfb14ba99";
  
        const headers = {
          'x-api-key': apiKey
        };
  
        fetch(url, { headers })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setJsonAlloc(data);
            //
          })
          .catch(error => console.error("Error:", error));
      }, []); // Empty dependency array to run this effect only once
  
      useEffect(() => {
        //console.log('json',jsonContact); // This will log the updated state
        
        //console.log('!isArray',!Array.isArray(jsonContact))
        if (!Array.isArray(jsonAlloc)){
          //console.log("set to true");
          setRefreshAlloc(true);
          //console.log('jsonpayment[data]',jsonPayment['data']);;
        }
        
      }, [jsonAlloc]);


  if (login == false){
    

    // Function to handle form submission
    const handleLogin = (e) => {
        e.preventDefault();
        // Implement your login logic here with username and password
        console.log('Username:', username);
        console.log('Password:', password);
        if(username=='admin' && password=='admin'){
          set_login(true);
          setError(false); // Reset the error state on successful login
        } else {
          setError(true); // Set error state on failed login
        }
        // Replace the above console.log with your authentication code
    };
    return(
      <div className="AppLogin">
        
        <div className="login-container">
        
          <h2>J's Cupcakes<br></br>Login</h2>
          {error && <p className="error-message">Username or password is incorrect.</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        
      </div>
    )
  }
  else{
    

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

    function getNewContacts() {
      const url = 'http://localhost:8080/contacts';

      const headers = {
        'id':999192342112,
      };

      fetch(url, {headers })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
    }
    
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
        const isSale=invoice.is_sale;
        if(isSale){
          totalinv+=total;
          if (monthTotals[monthYear]) {
            monthTotals[monthYear].total += total;
          } else {
            monthTotals[monthYear] = {
              monthYear,
              total,
            };
          }
          //console.log('is sale:',invoice);
        }
        // else{
        // }
        // console.log('is not sale:',invoice);
        
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
        const isIncome=payment.is_income;
        if (isIncome){
        totalpay+=total;
          if (monthTotals[monthYear]) {
            monthTotals[monthYear].total += total;
          } else {
            monthTotals[monthYear] = {
              monthYear,
              total,
            };
          }
          //console.log('is income:',payment);
        }
        // else{
        //   console.log('is not income:',payment);
        // }
      });

      // Convert the grouped data object to an array
      const groupedData = Object.values(monthTotals);
      //setTotalPay(totalpay);
      return [groupedData,totalpay];
    };

    function createInvoiceDictionary(customers, invoices) {
      const invoiceDictionary = {};
      var arrIds=[]
      // Create a mapping of customer IDs to their names
      const customerNameMap = {};
      customers.forEach((customer) => {
        customerNameMap[customer.id] = customer.name;
      });
    
      // Group invoices by customer ID
      invoices.forEach((invoice) => {
        const customerId = invoice.contact_id;
        const customerName = customerNameMap[customerId];
        const dueDate = new Date(invoice.due_date);
        const monthYear = `${dueDate.getDay() + 1}-${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
        const purchase = {
          date: monthYear,
          
          amount: Math.round(invoice.total * 100) / 100,
        };
    
        if (!invoiceDictionary[customerId]) {
          invoiceDictionary[customerId] = { name: customerName, purchases: [] };
          arrIds.push(customerId)
        }
    
        invoiceDictionary[customerId].purchases.push(purchase);
      });
      //console.log('arrIds',arrIds)
      return [invoiceDictionary,arrIds];
    }
    
    function createItemDictionary(itemData) {
      var arrItems=[]
      const itemDictionary = {};
    
      // Group invoices by customer ID
      itemData.forEach((item) => {
        const itemId = item.id;
        const itemName = item.name;
        const itemQuant = item.quantity_on_hand;
        const itemCost = item.sale_unit_price;
        const itemInfo = {
          quant: itemQuant,
          
          cost: itemCost,
        };
        
        if (!itemDictionary[itemId]) {
          itemDictionary[itemId] = { name: itemName, info: [] };
          arrItems.push(itemId)
        }
    
        itemDictionary[itemId].info.push(itemInfo);
      });
      //console.log('arrIds',arrItems);
      //console.log(itemDictionary);
      return [itemDictionary,arrItems];
    }

    //Payments
    const groupPayAlloc = () => {
      const allocDict = {};
      var arrAlloc=[];
      var totalAlloc=0;
      //console.log(jsonPayment['data'])
      jsonAlloc['data'].forEach((Alloc) => {
        const dueDate = new Date(Alloc.date);
        const monthYear = `${dueDate.getDay() + 1}-${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
        const invoice_id = Alloc.invoice_id;
        const payment_id = Alloc.payment_id;
        const amount = parseFloat(Alloc.amount); 
        
        //arrAlloc.push([invoice_id,payment_id,amount]);

        
          if (allocDict[payment_id]) {
            //console.log('doubled allocated payment',payment_id);
              
          } else {
            allocDict[payment_id] = {
              invoice_id,
              amount,
            };
            arrAlloc.push(payment_id);
          }
      
      });

      // Convert the grouped data object to an array
      // const groupedData = Object.values(allocDict);
      
      // return [groupedData,totalAlloc];
      return [allocDict,arrAlloc];
    };
    

    if (refreshCon==false || refreshInv==false || refreshPay==false ||refreshItem==false ||refreshAlloc==false){
      
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
      const allocDictList=groupPayAlloc();
      const allocDict = allocDictList[0];
      const alloclist=allocDictList[1];
      //console.log('allocDict',allocDict);
      //console.log('pay len',jsonPayment['data'].length)
      //console.log('inv len',jsonInvoice['data'].length)

      getNewContacts();
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

      const getInvoiceDict = createInvoiceDictionary(jsonContact['data'], jsonInvoice['data']);
      const invoiceDictionary=getInvoiceDict[0];
      const customerIds=getInvoiceDict[1];

      const getItemDict = createItemDictionary(Items);
      const itemDictionary=getItemDict[0];
      const itemIds=getItemDict[1];
      //console.log('invoiceDictionary',invoiceDictionary); 

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
                <CustomerList invoiceDictionary={invoiceDictionary} customerIds={customerIds} />
              </div>
              <hr className="horiLine"></hr> 
              <div className="boxContact">
              <ItemList itemDictionary={itemDictionary} itemIds={itemIds} />
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
}

export default App;
