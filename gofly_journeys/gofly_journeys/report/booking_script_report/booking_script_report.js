frappe.query_reports["Booking Script Report"] = {
    "filters": [
        {
            fieldname: "booking_status",
            label: __("Booking Status"),
            fieldtype: "Select",
            options: "\nDraft\nBooked\nConfirmed\nCompleted\nCancelled"
        },
        {
            fieldname: "customer",
            label: __("Customer"),
            fieldtype: "Link",
            options: "Customer"
        },
        {
            fieldname: "from_date",
            label: __("From Date"),
            fieldtype: "Date"
        },
        {
            fieldname: "to_date",
            label: __("To Date"),
            fieldtype: "Date"
        }
    ]
};