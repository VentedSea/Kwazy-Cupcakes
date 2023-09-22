const express = require('express')
const app = express()

const port = process.env.PORT || 8080

const database = require("./database");

app.set( 'port', ( port ));
const cors = require("cors");
app.use(cors());

app.use(express.json());


// Non-authenticated, public requests
// GET
async function getContacts(res){
    let text =await database.Query('select * from new_contacts',null);
    res.send(text);
}
app.get('/contacts', function (req, res) {
    //console.log(req.headers.id);
    getContacts(res);
});
async function addContact(req,res){
    let statement='insert into new_contacts("id","name","is_customer","is_supplier") VALUES($1, $2,$3,$4)'
    const values = [req.headers.id, req.headers.name,req.headers.is_customer,req.headers.is_supplier];
    //console.log('values:',values);
    let text =await database.Query(statement,values);
    res.send(text);
}
app.get('/add_contact', function (req, res) {
    //console.log(req.headers.id);
    addContact(req,res);
});

async function addItem(req,res){
    let statement='insert into new_items("id","name","purchase_unit_price","quantity_on_hand","sale_unit_price") VALUES($1, $2,$3,$4,$5)'
    const values = [req.headers.id, req.headers.name,req.headers.purchase_unit_price,req.headers.quantity_on_hand,req.headers.sale_unit_price];
    //console.log('values:',values);
    let text =await database.Query(statement,values);
    res.send(text);
}
app.get('/add_item', function (req, res) {
    //console.log(req.headers.id);
    addItem(req,res);
});

async function addInvoice(req,res){
    var statement=''
    var values=[]
    if(req.headers.paid_date=='null'){
        statement='insert into new_invoices("id","amount_due","contact_id","currency","due_date","exchange_rate","is_sale","issue_date","paid","total") VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10)'
        values = [req.headers.id,req.headers.amount_due,req.headers.contact_id,req.headers.currency,req.headers.due_date,req.headers.exchange_rate,req.headers.is_sale,req.headers.issue_date,req.headers.paid,req.headers.total];
        //console.log('null');
    }
    else{
        statement='insert into new_invoices("id","amount_due","contact_id","currency","due_date","exchange_rate","is_sale","issue_date","paid","paid_date","total") VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
        values = [req.headers.id,req.headers.amount_due,req.headers.contact_id,req.headers.currency,req.headers.due_date,req.headers.exchange_rate,req.headers.is_sale,req.headers.issue_date,req.headers.paid,req.headers.paid_date,req.headers.total];
    }
    //console.log('values:',values);
    let text =await database.Query(statement,values);
    res.send(text);
}
app.get('/add_invoice', function (req, res) {
    //console.log(req.headers.id);
    addInvoice(req,res);
});


async function addPayment(req,res){
    let statement='insert into new_payments("id","contact_id","date","exchange_rate","is_income","total") VALUES($1, $2,$3,$4,$5,$6)'
    let values = [req.headers.id,req.headers.contact_id,req.headers.payment_date,req.headers.exchange_rate,req.headers.is_income,req.headers.total];
   
    //console.log('req.headers:',req.headers);
    //console.log('values:',values);
    let text =await database.Query(statement,values);
    res.send(text);
}
app.get('/add_payment', function (req, res) {
    //console.log(req.headers.id);
    addPayment(req,res);
});

async function addPayAlloc(req,res){
    let statement='insert into new_payment_allocations("invoice_id","payment_id","date","amount") VALUES($1, $2,$3,$4)'
    let values = [req.headers.id,req.headers.pay_id,req.headers.payment_date,req.headers.amount];
   
    //console.log('req.headers:',req.headers);
    //console.log('values:',values);
    let text =await database.Query(statement,values);
    res.send(text);
}
app.get('/add_payment_allocation', function (req, res) {
    //console.log(req.headers.id);
    addPayAlloc(req,res);
});

async function addInvLines(req,res){
    let statement='insert into new_invoice_lines("id","description","invoice_id","item_code","quantity","total") VALUES($1, $2,$3,$4,$5,$6)'
    let values = [req.headers.id,req.headers.description,req.headers.invoice_id,req.headers.item_code,req.headers.quantity,req.headers.total];
    
    //console.log('req.headers:',req.headers);
    //console.log('values:',values);
    let text =await database.Query(statement,values);
    res.send(text);
}
app.get('/add_invoice_lines', function (req, res) {
    //console.log(req.headers.id);
    addInvLines(req,res);
});

//gets:
async function getContacts(res){//Contacts
    let text =await database.Query('select * from new_contacts',null);
    res.send(text);
}
app.get('/new_contacts', function (req, res) {
    getContacts(res);
});

async function getInvoiceLines(res){//Invoice lines
    let text =await database.Query('select * from new_invoice_lines',null);
    res.send(text);
}
app.get('/new_invoice_lines', function (req, res) {
    getInvoiceLines(res);
});

async function getInvoices(res){//invoices
    let text =await database.Query('select * from new_invoices',null);
    res.send(text);
}
app.get('/new_invoices', function (req, res) {
    getInvoices(res);
});

async function getItems(res){//items
    let text =await database.Query('select * from new_items',null);
    res.send(text);
}
app.get('/new_items', function (req, res) {
    getItems(res);
});
async function getPayments(res){//payments
    let text =await database.Query('select * from new_payments',null);
    res.send(text);
}
app.get('/new_payments', function (req, res) {
    getPayments(res);
});
async function getPaymentAllocations(res){//payment allocations
    let text =await database.Query('select * from new_payment_allocations',null);
    res.send(text);
}
app.get('/new_payment_allocations', function (req, res) {
    getPaymentAllocations(res);
});



// Start listening for requests once everything has been setup
app.listen(port, () => {
    console.log(`cupcake listening on ${port}`)
})