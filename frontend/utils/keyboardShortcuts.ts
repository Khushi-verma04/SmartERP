export function handleKeyboardShortcuts(
  event: KeyboardEvent,
  actions: {
    refresh: () => void;
    downloadPDF: () => void;
    focusSearch: () => void;
  }
) {
  // Ctrl + Shift + P → PDF Download
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "p") {
    event.preventDefault();
    actions.downloadPDF();
  }

  // F5 → Refresh
  if (event.key === "F5") {
    event.preventDefault();
    actions.refresh();
  }

  // Ctrl + F → Search
  if (event.ctrlKey && event.key.toLowerCase() === "f") {
    event.preventDefault();
    actions.focusSearch();
  }

  // F1 → Company Selection
if (event.key === "F1") {
  event.preventDefault();
  alert("Company Selection");
}

// F2 → Change Financial Year
if (event.key === "F2") {
  event.preventDefault();
  alert("Change Financial Year");
}

// F3 → Company Information
if (event.key === "F3") {
  event.preventDefault();
  alert("Company Information");
}

// F4 → Calculator
if (event.key === "F4") {
  event.preventDefault();
  alert("Calculator");
}

// Ctrl + K → Command Search
if (event.ctrlKey && event.key.toLowerCase() === "k") {
    event.preventDefault();
    alert("Command Search");
}

// Ctrl + Q → Logout
if (event.ctrlKey && event.key.toLowerCase() === "q") {
    event.preventDefault();
    alert("Logout");
}

// Alt + L → Create Ledger
if (event.altKey && event.key.toLowerCase() === "l") {
    event.preventDefault();
    alert("Create Ledger");
}

// Alt + A → Alter Ledger
if (event.altKey && event.key.toLowerCase() === "a") {
    event.preventDefault();
    alert("Alter Ledger");
}

// Alt + G → Create Group
if (event.altKey && event.key.toLowerCase() === "g") {
    event.preventDefault();
    alert("Create Group");
}

// Alt + S → Create Stock Item
if (event.altKey && event.key.toLowerCase() === "s") {
    event.preventDefault();
    alert("Create Stock Item");
}

// Alt + U → Unit Creation
if (event.altKey && event.key.toLowerCase() === "u") {
    event.preventDefault();
    alert("Unit Creation");
}

// ==========================
// VOUCHER SHORTCUTS
// ==========================

// F6 → Receipt Voucher
if (event.key === "F6") {
  event.preventDefault();
  alert("Receipt Voucher");
}

// F7 → Journal Voucher
if (event.key === "F7") {
  event.preventDefault();
  alert("Journal Voucher");
}

// F8 → Sales Voucher
if (event.key === "F8" && !event.altKey) {
  event.preventDefault();
  alert("Sales Voucher");
}

// F9 → Purchase Voucher
if (event.key === "F9" && !event.altKey) {
  event.preventDefault();
  alert("Purchase Voucher");
}

// F10 → Reversing Journal
if (event.key === "F10") {
  event.preventDefault();
  alert("Reversing Journal");
}

// ==========================
// MORE SHORTCUTS
// ==========================

// Alt + F8 → Credit Note
if (event.altKey && event.key === "F8") {
  event.preventDefault();
  alert("Credit Note");
}

// Alt + F9 → Debit Note
if (event.altKey && event.key === "F9") {
  event.preventDefault();
  alert("Debit Note");
}

// Ctrl + I → Inventory Dashboard
if (event.ctrlKey && event.key.toLowerCase() === "i") {
  event.preventDefault();
  alert("Inventory Dashboard");
}

// Ctrl + N → New Item
if (event.ctrlKey && event.key.toLowerCase() === "n") {
  event.preventDefault();
  alert("New Item");
}

// Ctrl + E → Edit Item
if (event.ctrlKey && event.key.toLowerCase() === "e") {
  event.preventDefault();
  alert("Edit Item");
}

// Ctrl + D → Delete Item
if (event.ctrlKey && event.key.toLowerCase() === "d") {
  event.preventDefault();
  alert("Delete Item");
}

// Ctrl + T → Stock Transfer
if (event.ctrlKey && event.key.toLowerCase() === "t") {
  event.preventDefault();
  alert("Stock Transfer");
}

// Ctrl + R → Stock Report
if (event.ctrlKey && event.key.toLowerCase() === "r") {
  event.preventDefault();
  alert("Stock Report");
}

// Ctrl + B → New Invoice
if (event.ctrlKey && event.key.toLowerCase() === "b") {
  event.preventDefault();
  alert("New Invoice");
}

// Ctrl + P → Print Invoice
if (event.ctrlKey && event.key.toLowerCase() === "p" && !event.shiftKey) {
  event.preventDefault();
  alert("Print Invoice");
}

// Ctrl + M → Email Invoice
if (event.ctrlKey && event.key.toLowerCase() === "m") {
  event.preventDefault();
  alert("Email Invoice");
}

// Ctrl + C → New Customer
if (event.ctrlKey && event.key.toLowerCase() === "c" && !event.shiftKey) {
  event.preventDefault();
  alert("New Customer");
}

// Ctrl + Shift + C → Customer Ledger
if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c") {
  event.preventDefault();
  alert("Customer Ledger");
}

// Ctrl + S → New Supplier
if (event.ctrlKey && event.key.toLowerCase() === "s" && !event.shiftKey) {
  event.preventDefault();
  alert("New Supplier");
}

// Ctrl + Shift + S → Supplier Ledger
if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "s") {
  event.preventDefault();
  alert("Supplier Ledger");
}

// ==========================
// REPORT SHORTCUTS
// ==========================

// Alt + B → Balance Sheet
if (event.altKey && event.key.toLowerCase() === "b") {
  event.preventDefault();
  alert("Balance Sheet");
}

// Alt + P → Profit & Loss
if (event.altKey && event.key.toLowerCase() === "p") {
  event.preventDefault();
  alert("Profit & Loss");
}

// Alt + T → Trial Balance
if (event.altKey && event.key.toLowerCase() === "t") {
  event.preventDefault();
  alert("Trial Balance");
}

// Alt + C → Cash Flow
if (event.altKey && event.key.toLowerCase() === "c") {
  event.preventDefault();
  alert("Cash Flow");
}

// Alt + R → Stock Summary
if (event.altKey && event.key.toLowerCase() === "r") {
  event.preventDefault();
  alert("Stock Summary");
}

// Alt + X → GST Report
if (event.altKey && event.key.toLowerCase() === "x") {
  event.preventDefault();
  alert("GST Report");
}

// ESC → Previous Screen
if (event.key === "Escape") {
  event.preventDefault();
  alert("Previous Screen");
}

// Ctrl + H → Home
if (event.ctrlKey && event.key.toLowerCase() === "h") {
  event.preventDefault();
  alert("Home");
}
}