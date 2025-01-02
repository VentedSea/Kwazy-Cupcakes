// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import myImage from './images/cupcake.png';
import {v4 as uuidv4} from 'uuid';

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
import React from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const OverDueList = ({ invoiceDictionary, customerIds }) => {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
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
      <h2>Overdue invoices</h2>
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

function CustomerList({ invoiceDictionary, customerIds }) {
  


  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
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
  


  const [selectedItem, setSelectedItem] = useState<string[]>([]);
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
  const options: any = {
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



function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, set_login] = useState(true);
  const [error, setError] = useState(false);
  
  const [jsonContact, setJsonContact] = useState<any>([]);
  const [jsonInvoice, setJsonInvoice] = useState([]);
  const [jsonInvoiceLines, setJsonInvoiceLines] = useState([]);
  const [refreshInvLines, setRefreshInvLines] = useState(false);
  const [refreshCon, setRefreshCon] = useState(false);
  const [refreshInv, setRefreshInv] = useState(false);
  const [jsonPayment, setJsonPayment] = useState([]);
  const [refreshPay, setRefreshPay] = useState(false);
  const [jsonItem, setJsonItem] = useState<any>([]);
  const [refreshItem, setRefreshItem] = useState(false);
  const [jsonAlloc, setJsonAlloc] = useState([]);
  const [refreshAlloc, setRefreshAlloc] = useState(false);

  const [salesData,setSalesData]= useState<any>([]);

  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [addName,setAddName]=useState('');
  const [addIsCustomer,setAddIsCustomer]=useState(false);
  const [addIsSupplier,setAddIsSupplier]=useState(false);
  const [isNameExists, setIsNameExists] = useState(false);
  const [customer_forList, setCustomer_forList] = useState([]);
  const [supplier_forList, setSupplier_forList] = useState([]);
  const [other_forList, setOther_forList] = useState([]);
  const [both_forList, setBoth_forList] = useState([]);

  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [addItemName,setAddItemName]=useState('');
  const [addPurchasePrice,setAddPurchasePrice]=useState('');
  const [addQuantity,setAddQuantity]=useState('');
  const [addSalePrice,setAddSalePrice]=useState('');

  const [isAddPayOpen, setIsAddPayOpen] = useState(false);
  const [addPayName,setAddPayName]=useState('');
  const [addPayEX,setAddPayEX]=useState('');
  const [isAddPayIncome, setIsAddPayIncome] = useState(false);
  const [addPayTotal,setAddPayTotal]=useState('');

  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    contact: '', // Selected contact
    currency: 'GBP',
    exchangeRate: '',
    dueDate: '',
    isSale: false,
    invoiceLines: [
      {
        description: '',
        quantity: '',
        total: '0',
        item: 'No item',
      },
    ],
  });
  


  const [contactNames, setContactNames] = useState<any[]>([]);
  const [itemDictionary2, setItemDictionary2]= useState<any[]>([]);
  
  const fetchContacts = async () =>{
    const url = `${apiUrl}/new_contacts`;
  
    const headers = {
    };

    await fetch(url, { mode: "cors",headers })
                    .then(response => response.json())
                    .then(data => {
                      setJsonContact(data);
                      
                    })
                    .catch(error => console.error("Error:", error));
  }
  const fetchItems = async () =>{
    const url = `${apiUrl}/new_items`;
  
    const headers = {
    };

    await fetch(url, {mode: "cors", headers })
                    .then(response => response.json())
                    .then(data => {
                      setJsonItem([]);
                      setJsonItem(data);
                      
                    })
                    .catch(error => console.error("Error:", error));
  }
  const fetchPayments = async () =>{
    const url = `${apiUrl}/new_payments`;
  
    const headers = {
    };

     await fetch(url, {mode: "cors", headers })
                    .then(response => response.json())
                    .then(data => {
                      setJsonPayment([]);
                      setJsonPayment(data);
                      
                    })
                    .catch(error => console.error("Error:", error));
  }
  const fetchInvoices = async () =>{
    const url = `${apiUrl}/new_invoices`;
  
    const headers = {
    };

    await fetch(url, {mode: "cors", headers })
                    .then(response => response.json())
                    .then(data => {
                      setJsonInvoice([]);
                      setJsonInvoice(data);
                      
                    })
                    .catch(error => console.error("Error:", error));
  }
  const fetchInvoicesLines = async () =>{
    const url = `${apiUrl}/new_invoice_lines`;
  
    const headers = {
    };

    await fetch(url, {mode: "cors", headers })
                    .then(response => response.json())
                    .then(data => {
                      setJsonInvoiceLines([]);
                      setJsonInvoiceLines(data);
                      
                    })
                    .catch(error => console.error("Error:", error));
  }

  const handleAddContact=async(uuid,name,customer,supplier)=> {
    const url = `${apiUrl}/add_contact`;

    const headers = {
      'id':uuid,
      'is_customer':customer,
      'is_supplier':supplier,
      'name':name,
    };

    const response = await fetch(url, {mode: "cors",headers })
    if (response.status===200){
      fetchContacts();
    }
  }
  const handleAddItem=async(uuid,addItemName,addPurchasePrice,addQuantity,addSalePrice)=> {
    const url = `${apiUrl}/add_item`;

    const headers = {
      'id':uuid,
      'name':addItemName,
      'purchase_unit_price':addPurchasePrice,
      'quantity_on_hand':addQuantity,
      'sale_unit_price':addSalePrice,
    };

    const response = await fetch(url, {mode: "cors",headers })
    if (response.status===200){
      fetchItems();
    }
  }
  const handleAddPayment=async(uuid,contact_id,date,addPayEX,isAddPayIncome,addPayTotal)=> {
    const url = `${apiUrl}/add_payment`;

    const headers = {
      'id':uuid,
      'contact_id':contact_id,
      'payment_date':date,
      'exchange_rate':addPayEX,
      'is_income':isAddPayIncome,
      'total':addPayTotal,
    };

    const response = await fetch(url, {mode: "cors",headers })
    if (response.status===200){
      fetchPayments();
    }
  }
  const handleAddInvoice=async(uuid,contact_id,currency,due_date,exchange_rate,is_sale,issue_date,total)=> {
    const url = `${apiUrl}/add_invoice`;

    const headers: any = {
      'id':uuid,
      'amount_due':total,
      'contact_id':contact_id,
      'currency':currency,
      'due_date':due_date,
      'exchange_rate':exchange_rate,
      'is_sale':is_sale,
      'issue_date':issue_date,
      'paid':false,
      'total':total,
    };

    const response = await fetch(url, {mode: "cors",headers })
    if (response.status===200){
      fetchInvoices();
    }
  }
  const handleAddInvoiceLineDatabase=async(uuid,description,invoice_id,item_code,quantity,total)=> {
    const url = `${apiUrl}/add_invoice_lines`;

    const headers = {
      'id':uuid,
      'description':description,
      'invoice_id':invoice_id,
      'item_code':item_code,
      'quantity':quantity,
      'total':total,
    };
    const response = await fetch(url, {mode: "cors",headers })
    if (response.status===200){
     fetchInvoicesLines();
    }
  }

  //#region unused functions

  // function handleClickItemsAll() {
  //   for (let i=0;i<jsonItem['body'].length;i++){
  //     let id=jsonItem['body'][i]['id'];
  //     let name=jsonItem['body'][i]['name'];
  //     let purchase_unit_price=jsonItem['body'][i]['purchase_unit_price'];
  //     let quantity_on_hand=jsonItem['body'][i]['quantity_on_hand'];
  //     let sale_unit_price=jsonItem['body'][i]['sale_unit_price'];
      

  //     const url = `${apiUrl}/add_item`;

  //     const headers = {
  //       'id':id,
  //       'name':name,
  //       'purchase_unit_price':purchase_unit_price,
  //       'quantity_on_hand':quantity_on_hand,
  //       'sale_unit_price':sale_unit_price,
  //     };

  //     fetch(url, {mode: "cors",headers })
  //       .then(response => response.json())
  //       .catch(error => console.error("Error:", error));

  //   }
  // }
  // function handleClickInvoiceAll() {
    
  //   for (let i=0;i<jsonInvoice['body'].length;i++){
  //     let id=jsonInvoice['body'][i]['id'];
  //     let amount_due=jsonInvoice['body'][i]['amount_due'];
  //     let contact_id=jsonInvoice['body'][i]['contact_id'];
  //     let currency=jsonInvoice['body'][i]['currency'];
  //     let due_date=jsonInvoice['body'][i]['due_date'];
  //     let exchange_rate=jsonInvoice['body'][i]['exchange_rate'];
  //     let is_sale=jsonInvoice['body'][i]['is_sale'];
  //     let issue_date=jsonInvoice['body'][i]['issue_date'];
  //     let paid=jsonInvoice['body'][i]['paid'];
  //     let paid_date=jsonInvoice['body'][i]['paid_date'];
  //     let total=jsonInvoice['body'][i]['total'];
      

  //     const url = `${apiUrl}/add_invoice`;

  //     const headers = {
  //       'id':id,
  //       'amount_due':amount_due,
  //       'contact_id':contact_id,
  //       'currency':currency,
  //       'due_date':due_date,
  //       'exchange_rate':exchange_rate,
  //       'is_sale':is_sale,
  //       'issue_date':issue_date,
  //       'paid':paid,
  //       'paid_date':paid_date,
  //       'total':total,
  //     };

  //     fetch(url, {mode: "cors",headers })
  //       .then(response => response.json())
  //       .catch(error => console.error("Error:", error));

  //   }
  // }

  // function handleClickPaymentsAll() {
  //   for (let i=0;i<jsonPayment['body'].length;i++){
  //     let id=jsonPayment['body'][i]['id'];
  //     let contact_id=jsonPayment['body'][i]['contact_id'];
  //     let date=jsonPayment['body'][i]['date'];
  //     let exchange_rate=jsonPayment['body'][i]['exchange_rate'];
  //     let is_income=jsonPayment['body'][i]['is_income'];
  //     let total=jsonPayment['body'][i]['total'];
      

  //     const url = `${apiUrl}/add_payment`;

  //     const headers = {
  //       'id':id,
  //       'contact_id':contact_id,
  //       'payment_date':date,
  //       'exchange_rate':exchange_rate,
  //       'is_income':is_income,
  //       'total':total,
  //     };

  //     fetch(url, {mode: "cors",headers })
  //       .then(response => response.json())
  //       .catch(error => console.error("Error:", error));

  //   }
  // }
  // function handleClickPaymentAllocationsAll() {
  //   for (let i=0;i<jsonAlloc['body'].length;i++){
  //     let id=jsonAlloc['body'][i]['invoice_id'];
  //     let pay_id=jsonAlloc['body'][i]['payment_id'];
  //     let date=jsonAlloc['body'][i]['date'];
  //     let amount=jsonAlloc['body'][i]['amount'];
      

  //     const url = `${apiUrl}/add_payment_allocation`;

  //     const headers = {
  //       'id':id,
  //       'pay_id':pay_id,
  //       'payment_date':date,
  //       'amount':amount,
  //     };

  //     fetch(url, {mode: "cors",headers })
  //       .then(response => response.json())
  //       .catch(error => console.error("Error:", error));

  //   }
  // }
  //#endregion unused functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleAddContactClick = () => {
    setIsAddContactOpen(true);
  };

  const handleAddContactClose = () => {
    setIsAddContactOpen(false);
    setIsNameExists(false);
  };

  const handleAddContactSubmit = (e) => {
    // Handle form submission and add the contact here
    e.preventDefault();
    let myUuid = uuidv4();

    const arrNames: string[] = [];
    for(let i =0;i<jsonContact['body'].length;i++){
      arrNames.push(jsonContact['body'][i]['name']);
    }
    if(arrNames.includes(addName)){
      setIsNameExists(true);
    }
    else{
      setIsNameExists(false);
      handleAddContact(myUuid,addName,addIsCustomer,addIsSupplier);
      
      
      setIsAddContactOpen(false);

    }

    
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleAddItemClick = () => {
  setIsAddItemOpen(true);
};

const handleAddItemClose = () => {
  setIsAddItemOpen(false);
  setIsNameExists(false);
};

const handleAddItemSubmit = (e) => {
  // Handle form submission and add the contact here
  e.preventDefault();
  let myUuid = uuidv4();

  const arrItemNames: string[] = [];
  for(let i =0;i<jsonItem['body'].length;i++){
    arrItemNames.push(jsonItem['body'][i]['name']);
  }
  if(arrItemNames.includes(addItemName)){
    setIsNameExists(true);
  }
  else{
    setIsNameExists(false);
    handleAddItem(myUuid,addItemName,addPurchasePrice,addQuantity,addSalePrice);
    
    
    setIsAddItemOpen(false);

  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleAddPaymentClick = () => {
  setIsAddPayOpen(true);
};

const closeAddPayment = () => {
  setIsAddPayOpen(false);
};

const handleAddPaySubmit = (e) => {
  // Handle form submission and add the contact here
  e.preventDefault();
  let myUuid = uuidv4();

  let contact_id='';
  let name=addPayName;
  if(name===''){
    name=jsonContact['body'][0]['name'];
  }
  for(let i=0;i<jsonContact['body'].length;i++){
    if(name===jsonContact['body'][i]['name']){
      contact_id=jsonContact['body'][i]['id'];
    }
  }

  const date=new Date()
  let currentDay= String(date.getDate()).padStart(2, '0');
  let currentMonth = String(date.getMonth()+1).padStart(2,"0");
  let currentYear = date.getFullYear();
  // we will display the date as DD-MM-YYYY 
  let curr_date = `${currentYear}-${currentMonth}-${currentDay}`;

  handleAddPayment(myUuid,contact_id,curr_date,addPayEX,isAddPayIncome,addPayTotal);
  
  
  setIsAddPayOpen(false);

  
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const openAddInvoice = () => {
  setIsAddInvoiceOpen(true);
};

const closeAddInvoice = () => {
  setIsAddInvoiceOpen(false);
};

const handleInvoiceLineChange = (index, field, value) => {
  // Create a copy of the invoiceForm object to avoid mutating the state directly
  const updatedInvoiceForm = { ...invoiceForm };
  // Access the specific invoice line by index
  const invoiceLine = updatedInvoiceForm.invoiceLines[index];
  // Update the field of the invoice line with the new value
  invoiceLine[field] = value;

  // Recalculate the total for the updated invoice line if applicable
  if (field === 'quantity' || field === 'item') {
    const quantity = parseFloat(invoiceLine.quantity || '0');

    // Check if the item exists in the dictionary by name
    const itemName = invoiceLine.item;
    const item = itemDictionary2.find((item) => item.name === itemName);
    if (item) {
      invoiceLine.total = (quantity * item.price).toFixed(2);
    } else {
      // Handle the case where the item does not exist
      invoiceLine.total = '0.00'; // Or any default value you prefer
    }
  }

  // Update the state with the modified invoice form
  setInvoiceForm(updatedInvoiceForm);
};

const handleAddInvoiceLine = () => {
  setInvoiceForm((prevState) => ({
    ...prevState,
    invoiceLines: [
      ...prevState.invoiceLines,
      {
        description: '',
        quantity: '',
        item: itemDictionary2[0]['name'], // Default item
        total: '0', // Default total
      },
    ],
  }));
};

const handleRemoveInvoiceLine = (index) => {
  setInvoiceForm((prevState) => {
    const updatedInvoiceLines = [...prevState.invoiceLines];
    updatedInvoiceLines.splice(index, 1);
    return { ...prevState, invoiceLines: updatedInvoiceLines };
  });
};

const calculateTotal = () => {
  return invoiceForm.invoiceLines.reduce((total, line) => total + parseFloat(line.total), 0).toFixed(2);
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle form submission (adjust as needed)
const handleSubmitCupcake = (e) => {
  e.preventDefault();
  // Send the invoiceForm data to your API or handle it as required
  let myUuid = uuidv4();
  let contact_id='';
  let name=invoiceForm['contact'];
  if(name===""){
    name=jsonContact['body'][0]['name'];
  }
  for(let i=0;i<jsonContact['body'].length;i++){
    if(name===jsonContact['body'][i]['name']){
      contact_id=jsonContact['body'][i]['id'];
    }
  }
  let currency=invoiceForm['currency'];
  let due_date=invoiceForm["dueDate"];
  let exchange=invoiceForm['exchangeRate'];
  let is_sale=invoiceForm['isSale'];
  let total=calculateTotal();
  const date=new Date()
  let currentDay= String(date.getDate()).padStart(2, '0');
  let currentMonth = String(date.getMonth()+1).padStart(2,"0");
  let currentYear = date.getFullYear();
  // we will display the date as DD-MM-YYYY 
  let issue_date = `${currentYear}-${currentMonth}-${currentDay}`;
  
  handleAddInvoice(myUuid,contact_id,currency,due_date,exchange,is_sale,issue_date,total);
  if(is_sale){
    for(let i=0;i<invoiceForm.invoiceLines.length;i++){
      let lineUuid = uuidv4();
      handleAddInvoiceLineDatabase(lineUuid,invoiceForm.invoiceLines[i]['description'],myUuid,invoiceForm.invoiceLines[i]['item'],invoiceForm.invoiceLines[i]['quantity'],invoiceForm.invoiceLines[i]['total']);
    }
  }
  
  closeAddInvoice();
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
    function setSales(){
      const onlySalesDict: any = [];
      jsonInvoiceLines['body'].forEach((invoiceLine) => {
        const item_code=invoiceLine.item_code;
        if (item_code==='null'){
        }
        else{
          const currSale={}
          currSale['invoice_id'] = invoiceLine.invoice_id;
          currSale['description']=invoiceLine.description;
          currSale['total']=invoiceLine.total;
          onlySalesDict.push(currSale);
        }
        
      });
      setSalesData(onlySalesDict);
    }

      //contacts
      useEffect(() => {
        try{
          const url = `${apiUrl}/new_contacts`;
  
          const headers = {
          };
    
          fetch(url, {mode: "cors", headers })
            .then(response => response.json())
            .then(data => {
              setJsonContact(data);
              //
            })
            .catch(error => console.error("Error:", error));
          }
        catch{
          const url = 'https://hackathon.syftanalytics.com/api/contacts';
  
        const headers = {
        };
  
        fetch(url, { headers })
          .then(response => response.json())
          .then(data => {
            setJsonContact(data);
          })
          .catch(error => console.error("Error:", error));
        }
      }, []); // Empty dependency array to run this effect only once
  
      useEffect(() => {//check contacts
        const arrContacts: any[] = [];
        if (!Array.isArray(jsonContact)){
          setRefreshCon(true);
          setCustomer_forList([]);
          setCustomer_forList(jsonContact['body'].filter(contact => contact.is_customer &&(!contact.is_supplier)));
          setSupplier_forList(jsonContact['body'].filter(contact => contact.is_supplier &&(!contact.is_customer)));
          setOther_forList(jsonContact['body'].filter(contact => !contact.is_customer && !contact.is_supplier));
          setBoth_forList(jsonContact['body'].filter(contact => contact.is_supplier && contact.is_customer));

          for (let i =0;i<jsonContact['body'].length;i++){
            arrContacts.push({'name':jsonContact['body'][i]['name']});
          }
          setContactNames(arrContacts);
        }
        
      }, [jsonContact]);


      useEffect(() => {//get invoices
        try{
          const url = `${apiUrl}/new_invoices`;
  
        const headers = {
        };
  
        fetch(url, {mode: "cors", headers })
          .then(response => response.json())
          .then(data => {
            setJsonInvoice(data);
            //
          })
          .catch(error => console.error("Error:", error));
        }
        catch{
          const url = 'https://hackathon.syftanalytics.com/api/invoice';
  
        const headers = {
        };
  
        fetch(url, { headers })
          .then(response => response.json())
          .then(data => {
            setJsonInvoice(data);
          })
          .catch(error => console.error("Error:", error));
        }
      }, []); // Empty dependency array to run this effect only once
  
      useEffect(() => {//check invoices
        
        if (!Array.isArray(jsonInvoice)){
          setRefreshInv(true);
        }
        
      }, [jsonInvoice]);
  
      //payments
      useEffect(() => {
        try{
          const url = `${apiUrl}/new_payments`;
  
        const headers = {
        };
  
        fetch(url, { mode: "cors",headers })
          .then(response => response.json())
          .then(data => {
            setJsonPayment(data);
            //
          })
          .catch(error => console.error("Error:", error));
        }
        catch{
          const url = 'https://hackathon.syftanalytics.com/api/payment';
  
        const headers = {
        };
  
        fetch(url, { headers })
          .then(response => response.json())
          .then(data => {
            setJsonPayment(data);
            //
          })
          .catch(error => console.error("Error:", error));
        }
      }, []); // Empty dependency array to run this effect only once
  
      useEffect(() => {//check payments
        
        if (!Array.isArray(jsonPayment)){
          setRefreshPay(true);
        }
        
      }, [jsonPayment]);
  
      useEffect(() => {//get items
        try{
          const url = `${apiUrl}/new_items`;
  
        const headers = {
        };
  
        fetch(url, {mode: "cors", headers })
          .then(response => response.json())
          .then(data => {
            setJsonItem(data);
            //
          })
          .catch(error => console.error("Error:", error));
        }
        catch{
          const url = 'https://hackathon.syftanalytics.com/api/item';
  
        const headers = {
        };
  
        fetch(url, { headers })
          .then(response => response.json())
          .then(data => {
            setJsonItem(data);
            //
          })
          .catch(error => console.error("Error:", error));
        }
      }, []); // Empty dependency array to run this effect only once
  
      useEffect(() => {//check items
        const arrItemNames: any[] = [];
        if (!Array.isArray(jsonItem)){
          setRefreshItem(true);
          
          for (let i =0;i<jsonItem['body'].length;i++){
            const itemDict = {};
            itemDict['name']=jsonItem['body'][i]['name'];
            itemDict['price']=jsonItem['body'][i]['sale_unit_price'];
            arrItemNames.push(itemDict);
          }
          
          setItemDictionary2(arrItemNames);
          setInvoiceForm({
            contact: '',
            currency: 'GBP',
            exchangeRate: '',
            dueDate: '',
            isSale: false,
            invoiceLines: [
              {
                description: '',
                quantity: '',
                total: '',
                item: arrItemNames[0]['name'],
              },
            ],
          })
        }
        
      }, [jsonItem]);

      useEffect(() => {//get invoice lines
        try{
          const url = `${apiUrl}/new_invoice_lines`;
  
        const headers = {
        };
  
        fetch(url, {mode: "cors", headers })
          .then(response => response.json())
          .then(data => {
            setJsonInvoiceLines(data);
            //
          })
          .catch(error => console.error("Error:", error));
        }
        catch{
          const url = 'https://hackathon.syftanalytics.com/api/invoice-lines';
  
        const headers = {
        };
  
        fetch(url, { headers })
          .then(response => response.json())
          .then(data => {
            setJsonInvoiceLines(data);
            //
          })
          .catch(error => console.error("Error:", error));
        }
      }, []); // Empty dependency array to run this effect only once
      
      useEffect(() => {//check invoice lines
        
        if (!Array.isArray(jsonInvoiceLines)){
          setRefreshInvLines(true);
          setSales();
        }
        
      }, [jsonInvoiceLines]);

      useEffect(() => {
        try{
          const url = `${apiUrl}/new_payment_allocations`;
  
        const headers = {
        };
  
        fetch(url, {mode: "cors", headers })
          .then(response => response.json())
          .then(data => {
            setJsonAlloc(data);
            //
          })
          .catch(error => console.error("Error:", error));
        }
        catch{
          const url = 'https://hackathon.syftanalytics.com/api/payment-allocations';
  
        const headers = {
        };
  
        fetch(url, { headers })
          .then(response => response.json())
          .then(data => {
            setJsonAlloc(data);
          })
          .catch(error => console.error("Error:", error));
        }
      }, []); // Empty dependency array to run this effect only once
  
      useEffect(() => {
        
        if (!Array.isArray(jsonAlloc)){
          setRefreshAlloc(true);
        }
        
      }, [jsonAlloc]);




  if (login === false){
    

    // Function to handle form submission
    const handleLogin = (e) => {
        e.preventDefault();
        // Implement your login logic here with username and password
        if(username==='admin' && password==='admin'){
          set_login(true);
          setError(false); // Reset the error state on successful login
        } else {
          setError(true); // Set error state on failed login
        }
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
                defaultValue="admin"
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
                defaultValue="admin"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
              <h3>username and password are admin</h3>
            </div>
          </form>
        </div>
        
      </div>
    )
  }
  else{
    
    //#region unused functions

    // function handleClickContacts() {
    //   const url = `${apiUrl}/new_contacts`;

    //   const headers: any = {
    //     'id':999192342112,
    //   };

    //   fetch(url, {mode: "cors",headers })
    //     .then(response => response.json())
    //     .catch(error => console.error("Error:", error));
    // }

    // function handleClickItems() {
    //   const url = `${apiUrl}/new_items`;

    //   const headers: any = {
    //     'id':999192342112,
    //   };

    //   fetch(url, {mode: "cors",headers })
    //     .then(response => response.json())
    //     .catch(error => console.error("Error:", error));
    // }
    // function handleClickInvoice() {
    //   const url = `${apiUrl}/new_invoices`;

    //   const headers: any = {
    //     'id':999192342112,
    //   };

    //   fetch(url, {mode: "cors",headers })
    //     .then(response => response.json())
    //     .catch(error => console.error("Error:", error));
    // }

    // function handleClickInvoiceLines() {
    //   const url = `${apiUrl}/new_invoice_lines`;

    //   const headers: any = {
    //     'id':999192342112,
    //   };

    //   fetch(url, {mode: "cors",headers })
    //     .then(response => response.json())
    //     .catch(error => console.error("Error:", error));
    // }
    // function handleClickPayments() {
    //   const url = `${apiUrl}/new_payments`;

    //   const headers: any = {
    //     'id':999192342112,
    //   };

    //   fetch(url, {mode: "cors",headers })
    //     .then(response => response.json())
    //     .catch(error => console.error("Error:", error));
    // }
    // function handleClickPaymentAllocations() {
    //   const url = `${apiUrl}/new_payment_allocations`;

    //   const headers: any = {
    //     'id':999192342112,
    //   };

    //   fetch(url, {mode: "cors",headers })
    //     .then(response => response.json())
    //     .catch(error => console.error("Error:", error));
    // }


    
    // const groupInvoicesByMonth = () => {
    //   const monthTotals = {};
    //   let totalInv=0;
    //   jsonInvoice['body'].forEach((invoice) => {
    //     const dueDate = new Date(invoice.due_date);
    //     const monthYear = `${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
    //     const exchange = parseFloat(invoice.exchange_rate);
    //     const total = parseFloat(invoice.total)/exchange;
    //     const isSale=invoice.is_sale;
    //     if(isSale){
    //       totalInv+=total;
    //       if (monthTotals[monthYear]) {
    //         monthTotals[monthYear].total += total;
    //       } else {
    //         monthTotals[monthYear] = {
    //           monthYear,
    //           total,
    //         };
    //       }
    //     }
    //     // else{
    //     // }
        
    //   });
    //   // Convert the grouped data object to an array
    //   const groupedData = Object.values(monthTotals);
    //   //setTotalInv(totalInv);
    //   return [groupedData,totalInv];
    // };

    //#endregion unused functions

    const groupPaymentsByMonth = () => {
      const monthTotals = {};
      let totalPay=0;
      const arrInv: any[] = [];
      const arrPay: any[] = []; 
      for(let i =0;i<salesData.length;i++){
        arrInv.push(salesData[i].invoice_id);
      }
      let counter=0;
      for (let i=0;i<jsonAlloc['body'].length;i++){
        if(arrInv.includes(jsonAlloc['body'][i]['invoice_id'])){
          counter+=1;
          arrPay.push(jsonAlloc['body'][i]['payment_id']);
        }
      }
      counter=0;
      jsonPayment['body'].forEach((payment) => {
        let flag=true;
      
        if(flag===true){
          const dueDate = new Date(payment.date);
          const monthYear = `${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
          const exchange = parseFloat(payment.exchange_rate);
          const total = parseFloat(payment.total)/exchange; 
          const isIncome=payment.is_income;
          if (isIncome){
          totalPay+=total;
            if (monthTotals[monthYear]) {
              monthTotals[monthYear].total += total;
            } else {
              monthTotals[monthYear] = {
                monthYear,
                total,
              };
            }
          }
        }

      });
      // Convert the grouped data object to an array
      const groupedData = Object.values(monthTotals);
      return [groupedData,totalPay];
    };

    function createInvoiceDictionary(customers, invoices) {
      const invoiceDictionary = {};
      const arrIds: any[] = [];
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
      return [invoiceDictionary,arrIds];
    }
    
    function createItemDictionary(itemData) {
      const arrItems: any[] = [];
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
      return [itemDictionary,arrItems];
    }

    //Payments
    // const groupPayAlloc = () => {
    //   const allocDict = {};
    //   const arrAlloc: any[] = [];
    //   let totalAlloc=0;
    //   jsonAlloc['body'].forEach((Alloc) => {
    //     const dueDate = new Date(Alloc.date);
    //     const monthYear = `${dueDate.getDay() + 1}-${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
    //     const invoice_id = Alloc.invoice_id;
    //     const payment_id = Alloc.payment_id;
    //     const amount = parseFloat(Alloc.amount); 
        
    //     //arrAlloc.push([invoice_id,payment_id,amount]);

        
    //       if (allocDict[payment_id]) {
              
    //       } else {
    //         allocDict[payment_id] = {
    //           invoice_id,
    //           amount,
    //         };
    //         arrAlloc.push(payment_id);
    //       }
      
    //   });

    //   // Convert the grouped data object to an array
    //   // const groupedData = Object.values(allocDict);
      
    //   // return [groupedData,totalAlloc];
    //   return [allocDict,arrAlloc];
    // };
    
    // const getOnlySales = () => {
    //   const onlySalesDict: any[] = [];
    //   let totalInv=0;
    //   jsonInvoiceLines['body'].forEach((invoiceLine) => {
    //     const item_code=invoiceLine.item_code;
    //     if (item_code==='null'){
    //     }
    //     else{
    //       const currSale={}
    //       currSale['invoice_id'] = invoiceLine.invoice_id;
    //       currSale['description']=invoiceLine.description;
    //       currSale['total']=invoiceLine.total;
    //       onlySalesDict.push(currSale);
    //     }
        
    //   });
    //   return onlySalesDict;
    // };

    // const groupSalesByMonth = () => {
    //   const monthTotals = {};
    //   let totalInv=0;
    //   let counter=0;
    //   const arrInv: any[] = [];
    //   for(let i =0;i<salesData.length;i++){
    //     arrInv.push(salesData[i].invoice_id);
    //   }
      
    //   /*
    //   0: "2c1e8fdc-5469-4451-82a0-8575c88eb5ad"
    //   1: "1d179948-3ce6-4fc1-9dd1-bb5e43de4f05"
    //   2: "1268c90c-5bc0-4c9d-a665-5e52dffcaac0"
    //   3: "dd85825d-fb11-4c61-addb-5afcf620fe94"
    //   4: "70571ab5-077c-4b0a-8091-b6850626fb5a"
    //   5: "933d4aff-ee8c-4288-a8ea-49b6dec67aa3"
    //   6: "c5ee8382-90cd-4150-ac4a-05d34337bdc4"
    //   7: "0882a2d4-e586-40b4-90d3-fb54723d44a8"
    //   8: "a863e4d2-c0ff-46f6-98ce-a5b6fc73233c"
    //   9: "e3088711-c9e5-4899-ade2-caecb3e399bd"
    //   10: "c1667e06-5710-4ceb-a5ec-2e7d57b292ed"
    //   */
      
    //   //if (arrInv.includes('2461b75e-3118-45a1-a1b1-31d2d6368fe9')){
    //   //}//jsonInvoice['body'].length
    //   for(let i =0;i<jsonInvoice['body'].length;i++){
    //     const invoice=jsonInvoice['body'][i];
    //     let flag=false;
    //     if(arrInv.includes(invoice.id)){
    //       flag=true;
    //       counter+=1;
    //     }
        
    //     if (flag===true){
    //       const dueDate = new Date(invoice.due_date);
    //       const monthYear = `${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
    //       const exchange = parseFloat(invoice.exchange_rate);
    //       const total = parseFloat(invoice.total)/exchange;
    //       //const isSale=invoice.is_sale;
    //       //if(isSale){
    //         totalInv+=total;
    //         if (monthTotals[monthYear]) {
    //           monthTotals[monthYear].total += total;
    //         } else {
    //           monthTotals[monthYear] = {
    //             monthYear,
    //             total,
    //           };
    //         }
    //     }
    //   };
    //   // Convert the grouped data object to an array
    //   const groupedData = Object.values(monthTotals);
    //   //setTotalInv(totalInv);
    //   return [groupedData,totalInv];
    // };

    const groupSalesByMonth2 = () => {//Copy of above function but used to check something else in backend
      const monthTotals = {};
      let totalInv=0;
      const monthTotalsPay = {};
      let totalCost=0;
      let counter=0;
      const arrInv: any[] = [];
      const arrInv2: any[] = [];
      for(let i =0;i<salesData.length;i++){
        arrInv.push(salesData[i].invoice_id);
      }
      arrInv2.push(arrInv[0]);
      for(let i =0;i<arrInv.length;i++){
        if (arrInv2[arrInv2.length-1]===arrInv[i]){}
        else{
        arrInv2.push(arrInv[i]);
        }
        
      }
      
      for(let i =0;i<jsonInvoice['body'].length;i++){
        const invoice=jsonInvoice['body'][i];
        let flag=false;
        if(arrInv2.includes(invoice.id)){
          flag=true;
          counter+=1;
        }
        
        if (flag===true){
          const dueDate = new Date(invoice.due_date);
          const monthYear = `${dueDate.getMonth() + 1}-${dueDate.getFullYear()}`;
          const exchange = parseFloat(invoice.exchange_rate);
          const total = parseFloat(invoice.total)/exchange;
          const isSale=invoice.is_sale;
          if(isSale){
            totalInv+=total;
            if (monthTotals[monthYear]) {
              monthTotals[monthYear].total += total;
            } else {
              monthTotals[monthYear] = {
                monthYear,
                total,
              };
            }
          }
          else{
            totalCost+=total;
            if (monthTotalsPay[monthYear]) {
              monthTotalsPay[monthYear].total += total;
            } else {
              monthTotalsPay[monthYear] = {
                monthYear,
                total,
              };
            }
          }
        }
      };
      // Convert the grouped data object to an array
      const groupedData = Object.values(monthTotals);
      const groupedDataCosts = Object.values(monthTotalsPay);
      //setTotalInv(totalInv);
      return [groupedData,totalInv,groupedDataCosts,totalCost];
    };
    const groupOutgoingMoney = () => {//Copy of above function but used to check something else in backend
      const monthTotals = {};
      let totalOut=0;
      
      for(let i =0;i<jsonPayment['body'].length;i++){
        const payment=jsonPayment['body'][i];
        
        const date = new Date(payment.date);
        const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
        //const exchange = parseFloat(payment.exchange_rate);
        const total = parseFloat(payment.total);
        const isIncome=payment.is_income;
        
        if(!isIncome){

          totalOut+=total;
          if (monthTotals[monthYear]) {
            monthTotals[monthYear].total += total;
          } else {
            monthTotals[monthYear] = {
              monthYear,
              total,
            };
          }
          
        }
      }
      // Convert the grouped data object to an array
      const groupedData = Object.values(monthTotals);
      //setTotalInv(totalInv);
      return [groupedData,totalOut];
    };
    const getOverDue= () => {
      const arrIds: any[] = [];
      const overdueDictionary = {};
      let tempDict={}
      const current_date=new Date();
      for (let i=0;i<jsonInvoice['body'].length;i++){
        const newDate=new Date(jsonInvoice['body'][i].due_date);
        
        if(newDate.getTime()<current_date.getTime() &&(!jsonInvoice['body'][i].paid) &&((parseFloat(jsonInvoice['body'][i].amount_due)>0))){
        
          tempDict={}
          let contactName=''
          let contact_id=jsonInvoice['body'][i].contact_id;
          for (let j=0;j<jsonContact['body'].length;j++){
            if(contact_id===jsonContact['body'][j]['id']){
              contactName=jsonContact['body'][j]['name'];
            }
          }
          const monthYear = `${newDate.getDay() + 1}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
          const purchase = {
            date: monthYear,
            
            amount: Math.round(jsonInvoice['body'][i].amount_due * 100) / 100,
          };
          if (!overdueDictionary[contact_id]) {
            overdueDictionary[contact_id] = { name: contactName, purchases: [] };
            arrIds.push(contact_id)
          }
          overdueDictionary[contact_id].purchases.push(purchase);
        }
      }
      return [overdueDictionary,arrIds];
    };
    if (refreshCon===false || refreshInv===false || refreshPay===false ||refreshItem===false ||refreshAlloc===false ||refreshInvLines===false){
      
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

      const getPayData=groupPaymentsByMonth();
      const groupedPayments: any = getPayData[0];
      const finalPayTotal: any=getPayData[1];
      const getSalesData=groupSalesByMonth2();
      const groupedInvoices: any = getSalesData[0];
      const finalInvTotal: any=getSalesData[1];
      const groupedCupcakeCost: any = getSalesData[2];
      const finalCupcakeCost: any=getSalesData[3];
      
      const totalOutgoing: any=groupOutgoingMoney();
      const outgoingMonths: any =totalOutgoing[0];
      const outgoingTotal: any=totalOutgoing[1];
      getOverDue();

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
      const sortedGroupedOutgoingPayments = outgoingMonths.sort((a, b) => {
        const [aMonth, aYear] = a.monthYear.split('-');
        const [bMonth, bYear] = b.monthYear.split('-');
        
        // Compare years first
        if (aYear !== bYear) {
          return aYear - bYear;
        }
        
        // If years are the same, compare months
        return aMonth - bMonth;
      });

      const sortedGroupedCupcakeCost = groupedCupcakeCost.sort((a, b) => {
        const [aMonth, aYear] = a.monthYear.split('-');
        const [bMonth, bYear] = b.monthYear.split('-');
        
        // Compare years first
        if (aYear !== bYear) {
          return aYear - bYear;
        }
        
        // If years are the same, compare months
        return aMonth - bMonth;
      });

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


      const Items = jsonItem['body'];

      const getInvoiceDict = createInvoiceDictionary(jsonContact['body'], jsonInvoice['body']);
      const invoiceDictionary=getInvoiceDict[0];
      const customerIds=getInvoiceDict[1];

      const getOverdueAccounts = getOverDue();
      const overDueAccountsList=getOverdueAccounts[0];
      const overDueAccountsIds=getOverdueAccounts[1];

      const getItemDict = createItemDictionary(Items);
      const itemDictionary=getItemDict[0];
      const itemIds=getItemDict[1];

      return (
        <div className="App" >
          <title>This App</title>
          <header className="App-header">
          {/* {<button onClick={handleClickContacts}>Contacts</button>
          <button onClick={handleClickItems}>items</button>
          <button onClick={handleClickInvoice}>invoice</button>
          <button onClick={handleClickInvoiceLines}>invoice-lines</button>
          <button onClick={handleClickPayments}>payments</button>
          <button onClick={handleClickPaymentAllocations}>payment allocations</button>} */}
            <h1>J's Cupcakes</h1>
            
            
          </header>
          <div className="App-body">
            {isAddContactOpen && (
              <div className="overlay">
                <div className="popup">
                  <h2>Add Contact</h2>
                  {isNameExists && <p className="error-message">Name already exists.</p>}
                  <form onSubmit={handleAddContactSubmit}>
                    <div className="form-group">
                      <label htmlFor="addName">Name:</label>
                      <input
                        type="text"
                        id="addName"
                        name="addName"
                        value={addName}
                        onChange={(e) => setAddName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Is Customer:
                        <input
                          type="checkbox"
                          id="addIsCustomer"
                          checked={addIsCustomer}
                          onChange={() => setAddIsCustomer(!addIsCustomer)}
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                        Is Supplier:
                        <input
                          type="checkbox"
                          id="addIsSupplier"
                          checked={addIsSupplier}
                          onChange={() => setAddIsSupplier(!addIsSupplier)}
                        />
                      </label>
                    </div>
                    <div className="form-group">
                      <button type="submit">Submit</button>
                      <button type="submit" className='close-button' onClick={handleAddContactClose}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {isAddItemOpen && (
              <div className="overlay">
                <div className="popup">
                  <h2>Add Item</h2>
                  {isNameExists && <p className="error-message">Name already exists.</p>}
                  <form onSubmit={handleAddItemSubmit}>
                    <div className="form-group">
                      <label htmlFor="addItemName">Name:</label>
                      <input
                        type="text"
                        id="addItemName"
                        name="addItemName"
                        value={addItemName}
                        onChange={(e) => setAddItemName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="addPurchasePrice">Purchase Price:</label>
                      <input
                        type="text"
                        id="addPurchasePrice"
                        name="addPurchasePrice"
                        value={addPurchasePrice}
                        onChange={(e) => setAddPurchasePrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="addQuantity">Quantity on hand:</label>
                      <input
                        type="text"
                        id="addQuantity"
                        name="addQuantity"
                        value={addQuantity}
                        onChange={(e) => setAddQuantity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="addSalePrice">Sales Price:</label>
                      <input
                        type="text"
                        id="addSalePrice"
                        name="addSalePrice"
                        value={addSalePrice}
                        onChange={(e) => setAddSalePrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit">Submit</button>
                      <button type="submit" className='close-button' onClick={handleAddItemClose}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {isAddInvoiceOpen && (
              <div className="overlay">
                <div className="popup">
                  <div>
                    <h2>Add Invoice</h2>
                    <form onSubmit={handleSubmitCupcake}>
                      <div>
                        <label htmlFor="contact">Contact:</label>
                        <select
                          id="contact"
                          name="contact"
                          value={invoiceForm.contact}
                          onChange={(e) => setInvoiceForm({ ...invoiceForm, contact: e.target.value })}
                        >
                          {contactNames.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="currency">Currency:</label>
                        <input
                          type="text"
                          id="currency"
                          name="currency"
                          value={invoiceForm.currency}
                          onChange={(e) => setInvoiceForm({ ...invoiceForm, currency: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="exchangeRate">Exchange Rate:</label>
                        <input
                          type="text"
                          id="exchangeRate"
                          name="exchangeRate"
                          value={invoiceForm.exchangeRate}
                          onChange={(e) => setInvoiceForm({ ...invoiceForm, exchangeRate: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="dueDate">Due Date:</label>
                        <input
                          type="date"
                          id="dueDate"
                          name="dueDate"
                          value={invoiceForm.dueDate}
                          onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <label>
                          Is Sale:
                          <input
                            type="checkbox"
                            name="isSale"
                            checked={invoiceForm.isSale}
                            onChange={(e) => setInvoiceForm({ ...invoiceForm, isSale: e.target.checked })}
                          />
                        </label>
                      </div>
                      <div>
                        <h3>Invoice Lines</h3>
                        {invoiceForm.invoiceLines.map((line, index) => (
                          
                          <div key={index}>
                            
                            <div>
                              <label htmlFor={`description-${index}`}>Description:</label>
                              <input
                                type="text"
                                id={`description-${index}`}
                                name={`description-${index}`}
                                value={line.description}
                                onChange={(e) => handleInvoiceLineChange(index, 'description', e.target.value)}
                              />
                            </div>
                            <div>
                              <label htmlFor={`quantity-${index}`}>Quantity:</label>
                              <input
                                type="text"
                                id={`quantity-${index}`}
                                name={`quantity-${index}`}
                                value={line.quantity}
                                onChange={(e) => handleInvoiceLineChange(index, 'quantity', e.target.value)}
                              />
                            </div>
                            <div>
                              <label htmlFor={`item-${index}`}>Item:</label>
                              <select
                                id={`item-${index}`}
                                name={`item-${index}`}
                                value={line.item}
                                onChange={(e) => handleInvoiceLineChange(index, 'item', e.target.value)}
                              >
                                {itemDictionary2.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label>Total:</label>
                              <span>{line.total}</span>
                            </div>
                            <div>
                              {index === 0 ? (
                                <button type="button" onClick={handleAddInvoiceLine}>
                                  Add Line
                                </button>
                              ) : (
                                <button type="button" onClick={() => handleRemoveInvoiceLine(index)}>
                                  Remove Line
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        <div>
                          <label>Total:</label>
                          <span>{calculateTotal()}</span>
                        </div>
                      </div>
                      <div>
                        <button type="submit">Submit</button>
                        <button type="submit" className='close-button' onClick={closeAddInvoice}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            {isAddPayOpen && (
              <div className="overlay">
                <div className="popup">
                  <div>
                    <h2>Add Payment</h2>
                    <form onSubmit={handleAddPaySubmit}>
                      <div>
                        <label htmlFor="addPayName">Contact:</label>
                        <select
                          id="addPayName"
                          name="addPayName"
                          value={addPayName}
                          onChange={(e) => setAddPayName(e.target.value)}
                        >
                          {contactNames.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="addPayEX">Exchange Rate:</label>
                        <input
                          type="text"
                          id="addPayEX"
                          name="addPayEX"
                          value={addPayEX}
                          onChange={(e) => setAddPayEX(e.target.value)}
                        />
                      </div>
                      <div>
                        <label>
                          Is Income:
                          <input
                            type="checkbox"
                            name="isAddPayIncome"
                            checked={isAddPayIncome}
                            onChange={(e) => setIsAddPayIncome(!isAddPayIncome)}
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="addPayTotal">Total:</label>
                        <input
                          type="text"
                          id="addPayTotal"
                          name="addPayTotal"
                          value={addPayTotal}
                          onChange={(e) => setAddPayTotal(e.target.value)}
                        />
                      </div>
                      <div>
                        <button type="submit">Submit</button>
                        <button type="submit" className='close-button' onClick={closeAddPayment}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            <div className="containerUpper">
              <h1>Dashboard</h1>
              <div className="container">

                <div className="box">
                  <h2>Monthly Cupcake Sales</h2>
                  <p>Total Cupcake sales: {Math.round(finalInvTotal)}</p>
                  <div className="graph-div">
                    <LineChart   data={sortedGroupedInvoices} />
                    </div>
                    <button className='add-button' onClick={openAddInvoice} disabled={true} title={'Disabled for web-use'}>Add cupcake sale</button>
                </div>
                
                <div className="box">
                  <h2>Monthly Overall income</h2>
                  <p>Total income: {Math.round(finalPayTotal)}</p>
                  <div className="graph-div">
                    <LineChart   data={sortedGroupedPayments} />
                  </div>
                  <button className='add-button' onClick={handleAddPaymentClick}disabled={true} title={'Disabled for web-use'}>Add payment</button>
                </div>
              </div>
              <hr className="horiLine"></hr>
              <div className="container">

                <div className="box">
                  <h2>Monthly Cupcake Costs</h2>
                  <p>Total cupcake costs: {Math.round(finalCupcakeCost)}</p>
                  <div className="graph-div">
                    <LineChart   data={sortedGroupedCupcakeCost} />
                    </div>
                </div>
                <div className="box">
                  <h2>Monthly Outgoing Money</h2>
                  <p>Total Outgoing Money: {Math.round(outgoingTotal)}</p>
                  <div className="graph-div">
                    <LineChart   data={sortedGroupedOutgoingPayments} />
                    </div>
                </div>
                
                
              </div>
              <hr className="horiLine"></hr>
              <div className="boxContact">
                <CustomerList invoiceDictionary={invoiceDictionary} customerIds={customerIds} />
              </div>
              <hr className="horiLine"></hr>
              <div className="boxContact">
                <OverDueList invoiceDictionary={overDueAccountsList} customerIds={overDueAccountsIds} />
              </div>
              <hr className="horiLine"></hr>  
              <div><button className='add-button' onClick={handleAddItemClick}disabled={true} title={'Disabled for web-use'}>Add Item</button></div>
              <div className="boxContact">
              <ItemList itemDictionary={itemDictionary} itemIds={itemIds} />
              </div>
              <hr className="horiLine"></hr>
              <div><button className='add-button'  onClick={handleAddContactClick}disabled={true} title={'Disabled for web-use'}>Add Contact</button></div>            
              <div className="boxContact">
                <div className="spacer">
                  <h3>Customer Contacts</h3>
                  <div className="tags">
                    <ul>
                      {customer_forList.map((contact: any) => (
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
                      {supplier_forList.map((contact: any) => (
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
                      {other_forList.map((contact: any) => (
                        <li key={contact.id}>{contact.name}</li>
                      ))}
                    </ul>
                  </div>
                </div> 
              </div>
              <div className="boxContact">           
              <div className="spacer">
                  <h3>Both Supplier and Customer</h3>
                  <div className="tags">
                    <ul>
                      {both_forList.map((contact: any) => (
                        <li key={contact.id}>{contact.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>           
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
